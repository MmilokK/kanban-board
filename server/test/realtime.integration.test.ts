import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import type { OutgoingHttpHeaders } from 'node:http';
import type { WebSocket } from 'ws';

import { buildApp } from '../src/app.js';
import { db } from '../src/db/client.js';
import { testEnv } from './test-env.js';
import { BoardMemberRole } from '../src/generated/prisma/index.js';

const TEST_EMAIL = 'realtime-test@example.com';
const OTHER_TEST_EMAIL = 'realtime-test-other@example.com';
const TEST_PASSWORD = 'password123';

async function createApp(): Promise<FastifyInstance> {
  return buildApp({ env: testEnv });
}

async function cleanupRealtimeTestData(): Promise<void> {
  const users = await db.user.findMany({
    where: {
      email: {
        startsWith: 'realtime-test',
      },
    },
    select: {
      id: true,
    },
  });

  const userIds = users.map((user) => user.id);

  if (userIds.length === 0) {
    return;
  }

  await db.session.deleteMany({
    where: {
      userId: {
        in: userIds,
      },
    },
  });

  await db.passwordCredential.deleteMany({
    where: {
      userId: {
        in: userIds,
      },
    },
  });

  await db.user.deleteMany({
    where: {
      id: {
        in: userIds,
      },
    },
  });
}

function getSessionCookie(response: { headers: OutgoingHttpHeaders }): string {
  const setCookie = response.headers['set-cookie'];

  if (!setCookie) {
    throw new Error('Session cookie не найден');
  }

  const cookieHeader = Array.isArray(setCookie) ? setCookie[0] : String(setCookie);

  if (!cookieHeader) {
    throw new Error('Session cookie пуст');
  }

  return cookieHeader.split(';')[0]!;
}

async function registerUser(app: FastifyInstance, email: string = TEST_EMAIL): Promise<string> {
  const response = await app.inject({
    method: 'POST',
    url: '/api/auth/register',
    payload: {
      email,
      password: TEST_PASSWORD,
      name: 'Realtime Test User',
    },
  });

  expect(response.statusCode).toBe(201);

  return getSessionCookie(response);
}

async function createBoard(app: FastifyInstance, cookie: string, title: string): Promise<string> {
  const response = await app.inject({
    method: 'POST',
    url: '/api/boards',
    headers: {
      cookie,
    },
    payload: {
      title,
    },
  });

  expect(response.statusCode).toBe(201);

  const body = response.json() as {
    board: {
      id: string;
    };
  };

  return body.board.id;
}

async function addBoardMember(
  boardId: string,
  email: string,
  role: BoardMemberRole,
): Promise<void> {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new Error(`Пользователь ${email} не найден`);
  }

  await db.boardMember.create({
    data: {
      boardId,
      userId: user.id,
      role,
    },
  });
}

function waitForMessage(socket: WebSocket, expectedType: string): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    const handleMessage = (data: WebSocket.RawData) => {
      const message = JSON.parse(data.toString()) as Record<string, unknown>;

      if (message.type !== expectedType) {
        return;
      }

      socket.off('message', handleMessage);

      resolve(message);
    };

    socket.on('message', handleMessage);
  });
}

function expectNoMessage(socket: WebSocket, expectedType: string, timeoutMs = 100): Promise<void> {
  return new Promise((resolve, reject) => {
    const handleMessage = (data: WebSocket.RawData) => {
      const message = JSON.parse(data.toString()) as Record<string, unknown>;

      if (message.type !== expectedType) {
        return;
      }

      cleanup();

      reject(new Error(`Получено неожиданное realtime-сообщение ${expectedType}`));
    };

    const timeout = setTimeout(() => {
      cleanup();
      resolve();
    }, timeoutMs);

    function cleanup() {
      clearTimeout(timeout);
      socket.off('message', handleMessage);
    }

    socket.on('message', handleMessage);
  });
}

beforeEach(async () => {
  await cleanupRealtimeTestData();
});

afterAll(async () => {
  await cleanupRealtimeTestData();

  await db.$disconnect();
});

describe('Realtime WebSocket', () => {
  it('отклоняет подключение без session cookie', async () => {
    const app = await createApp();

    try {
      await app.ready();

      await expect(app.injectWS('/api/realtime')).rejects.toThrow();
    } finally {
      await app.close();
    }
  });

  it('подключается с валидной session cookie', async () => {
    const app = await createApp();

    try {
      const cookie = await registerUser(app);

      await app.ready();

      const socket = await app.injectWS('/api/realtime', {
        headers: {
          cookie,
        },
      });

      expect(socket.readyState).toBe(socket.OPEN);

      socket.terminate();
    } finally {
      await app.close();
    }
  });

  it('отвечает на ping сообщением PONG для авторизованного пользователя', async () => {
    const app = await createApp();

    try {
      const cookie = await registerUser(app);

      await app.ready();

      const socket = await app.injectWS('/api/realtime', {
        headers: {
          cookie,
        },
      });

      const messagePromise = waitForMessage(socket, 'PONG');

      socket.send('ping');

      await expect(messagePromise).resolves.toEqual({
        type: 'PONG',
      });

      socket.terminate();
    } finally {
      await app.close();
    }
  });

  it('подписывается на доску, участником которой является пользователь', async () => {
    const app = await createApp();

    try {
      const cookie = await registerUser(app);

      const boardId = await createBoard(app, cookie, 'Realtime Test Board');

      await app.ready();

      const socket = await app.injectWS('/api/realtime', {
        headers: {
          cookie,
        },
      });

      const messagePromise = waitForMessage(socket, 'SUBSCRIBED_BOARD');

      socket.send(
        JSON.stringify({
          type: 'SUBSCRIBE_BOARD',
          boardId,
        }),
      );

      await expect(messagePromise).resolves.toEqual({
        type: 'SUBSCRIBED_BOARD',
        boardId,
      });

      socket.terminate();
    } finally {
      await app.close();
    }
  });

  it('не позволяет подписаться на чужую доску', async () => {
    const app = await createApp();

    try {
      const userCookie = await registerUser(app, TEST_EMAIL);

      const otherUserCookie = await registerUser(app, OTHER_TEST_EMAIL);

      const otherBoardId = await createBoard(app, otherUserCookie, 'Чужая realtime-доска');

      await app.ready();

      const socket = await app.injectWS('/api/realtime', {
        headers: {
          cookie: userCookie,
        },
      });

      const messagePromise = waitForMessage(socket, 'ERROR');

      socket.send(
        JSON.stringify({
          type: 'SUBSCRIBE_BOARD',
          boardId: otherBoardId,
        }),
      );

      await expect(messagePromise).resolves.toEqual({
        type: 'ERROR',
        code: 'BOARD_NOT_FOUND',
        message: 'Доска не найдена',
      });

      socket.terminate();
    } finally {
      await app.close();
    }
  });

  it('отписывается от доски', async () => {
    const app = await createApp();

    try {
      const cookie = await registerUser(app);

      const boardId = await createBoard(app, cookie, 'Realtime Test Board');

      await app.ready();

      const socket = await app.injectWS('/api/realtime', {
        headers: {
          cookie,
        },
      });

      const subscribedPromise = waitForMessage(socket, 'SUBSCRIBED_BOARD');

      socket.send(
        JSON.stringify({
          type: 'SUBSCRIBE_BOARD',
          boardId,
        }),
      );

      await subscribedPromise;

      const unsubscribedPromise = waitForMessage(socket, 'UNSUBSCRIBED_BOARD');

      socket.send(
        JSON.stringify({
          type: 'UNSUBSCRIBE_BOARD',
          boardId,
        }),
      );

      await expect(unsubscribedPromise).resolves.toEqual({
        type: 'UNSUBSCRIBED_BOARD',
        boardId,
      });

      socket.terminate();
    } finally {
      await app.close();
    }
  });

  it('возвращает ошибку для некорректного realtime-сообщения', async () => {
    const app = await createApp();

    try {
      const cookie = await registerUser(app);

      await app.ready();

      const socket = await app.injectWS('/api/realtime', {
        headers: {
          cookie,
        },
      });

      const messagePromise = waitForMessage(socket, 'ERROR');

      socket.send(
        JSON.stringify({
          type: 'UNKNOWN_MESSAGE',
        }),
      );

      await expect(messagePromise).resolves.toEqual({
        type: 'ERROR',
        code: 'INVALID_MESSAGE',
        message: 'Некорректное realtime-сообщение',
      });

      socket.terminate();
    } finally {
      await app.close();
    }
  });

  it('отправляет BOARD_CHANGED подписанным участникам после изменения доски', async () => {
    const app = await createApp();

    try {
      const ownerCookie = await registerUser(app, TEST_EMAIL);
      const memberCookie = await registerUser(app, OTHER_TEST_EMAIL);

      const boardId = await createBoard(app, ownerCookie, 'Realtime Shared Board');

      await addBoardMember(boardId, OTHER_TEST_EMAIL, BoardMemberRole.VIEWER);

      await app.ready();

      const ownerSocket = await app.injectWS('/api/realtime', {
        headers: {
          cookie: ownerCookie,
        },
      });

      const memberSocket = await app.injectWS('/api/realtime', {
        headers: {
          cookie: memberCookie,
        },
      });

      const ownerSubscribedPromise = waitForMessage(ownerSocket, 'SUBSCRIBED_BOARD');

      ownerSocket.send(
        JSON.stringify({
          type: 'SUBSCRIBE_BOARD',
          boardId,
        }),
      );

      await expect(ownerSubscribedPromise).resolves.toEqual({
        type: 'SUBSCRIBED_BOARD',
        boardId,
      });

      const memberSubscribedPromise = waitForMessage(memberSocket, 'SUBSCRIBED_BOARD');

      memberSocket.send(
        JSON.stringify({
          type: 'SUBSCRIBE_BOARD',
          boardId,
        }),
      );

      await expect(memberSubscribedPromise).resolves.toEqual({
        type: 'SUBSCRIBED_BOARD',
        boardId,
      });

      const ownerChangedPromise = waitForMessage(ownerSocket, 'BOARD_CHANGED');

      const memberChangedPromise = waitForMessage(memberSocket, 'BOARD_CHANGED');

      const response = await app.inject({
        method: 'POST',
        url: `/api/boards/${boardId}/columns`,
        headers: {
          cookie: ownerCookie,
        },
        payload: {
          title: 'Realtime Column',
        },
      });

      expect(response.statusCode).toBe(201);

      await expect(ownerChangedPromise).resolves.toEqual({
        type: 'BOARD_CHANGED',
        boardId,
      });

      await expect(memberChangedPromise).resolves.toEqual({
        type: 'BOARD_CHANGED',
        boardId,
      });

      ownerSocket.terminate();
      memberSocket.terminate();
    } finally {
      await app.close();
    }
  });

  it('отправляет BOARD_CHANGED участнику после изменения его роли', async () => {
    const app = await createApp();

    try {
      const ownerCookie = await registerUser(app, TEST_EMAIL);
      const memberCookie = await registerUser(app, OTHER_TEST_EMAIL);

      const boardId = await createBoard(app, ownerCookie, 'Realtime Role Board');

      await addBoardMember(boardId, OTHER_TEST_EMAIL, BoardMemberRole.VIEWER);

      const member = await db.user.findUnique({
        where: {
          email: OTHER_TEST_EMAIL,
        },
        select: {
          id: true,
        },
      });

      if (!member) {
        throw new Error('Участник realtime-теста не найден');
      }

      await app.ready();

      const memberSocket = await app.injectWS('/api/realtime', {
        headers: {
          cookie: memberCookie,
        },
      });

      const subscribedPromise = waitForMessage(memberSocket, 'SUBSCRIBED_BOARD');

      memberSocket.send(
        JSON.stringify({
          type: 'SUBSCRIBE_BOARD',
          boardId,
        }),
      );

      await subscribedPromise;

      const changedPromise = waitForMessage(memberSocket, 'BOARD_CHANGED');

      const response = await app.inject({
        method: 'PATCH',
        url: `/api/boards/${boardId}/members/${member.id}`,
        headers: {
          cookie: ownerCookie,
        },
        payload: {
          role: BoardMemberRole.EDITOR,
        },
      });

      expect(response.statusCode).toBe(200);

      await expect(changedPromise).resolves.toEqual({
        type: 'BOARD_CHANGED',
        boardId,
      });

      memberSocket.terminate();
    } finally {
      await app.close();
    }
  });

  it('уведомляет удалённого участника и отзывает его подписку на доску', async () => {
    const app = await createApp();

    try {
      const ownerCookie = await registerUser(app, TEST_EMAIL);
      const memberCookie = await registerUser(app, OTHER_TEST_EMAIL);

      const boardId = await createBoard(app, ownerCookie, 'Realtime Remove Member Board');

      await addBoardMember(boardId, OTHER_TEST_EMAIL, BoardMemberRole.VIEWER);

      const member = await db.user.findUnique({
        where: {
          email: OTHER_TEST_EMAIL,
        },
        select: {
          id: true,
        },
      });

      if (!member) {
        throw new Error('Участник realtime-теста не найден');
      }

      await app.ready();

      const memberSocket = await app.injectWS('/api/realtime', {
        headers: {
          cookie: memberCookie,
        },
      });

      const subscribedPromise = waitForMessage(memberSocket, 'SUBSCRIBED_BOARD');

      memberSocket.send(
        JSON.stringify({
          type: 'SUBSCRIBE_BOARD',
          boardId,
        }),
      );

      await subscribedPromise;

      const removalChangedPromise = waitForMessage(memberSocket, 'BOARD_CHANGED');

      const deleteResponse = await app.inject({
        method: 'DELETE',
        url: `/api/boards/${boardId}/members/${member.id}`,
        headers: {
          cookie: ownerCookie,
        },
      });

      expect(deleteResponse.statusCode).toBe(204);

      await expect(removalChangedPromise).resolves.toEqual({
        type: 'BOARD_CHANGED',
        boardId,
      });

      const noFurtherChangesPromise = expectNoMessage(memberSocket, 'BOARD_CHANGED');

      const mutationResponse = await app.inject({
        method: 'POST',
        url: `/api/boards/${boardId}/columns`,
        headers: {
          cookie: ownerCookie,
        },
        payload: {
          title: 'Колонка после удаления участника',
        },
      });

      expect(mutationResponse.statusCode).toBe(201);

      await expect(noFurtherChangesPromise).resolves.toBeUndefined();

      memberSocket.terminate();
    } finally {
      await app.close();
    }
  });

  it('уведомляет участников об удалении доски и отзывает все подписки на неё', async () => {
    const app = await createApp();

    try {
      const ownerCookie = await registerUser(app, TEST_EMAIL);
      const memberCookie = await registerUser(app, OTHER_TEST_EMAIL);

      const boardId = await createBoard(app, ownerCookie, 'Realtime Delete Board');

      await addBoardMember(boardId, OTHER_TEST_EMAIL, BoardMemberRole.VIEWER);

      await app.ready();

      const ownerSocket = await app.injectWS('/api/realtime', {
        headers: {
          cookie: ownerCookie,
        },
      });

      const memberSocket = await app.injectWS('/api/realtime', {
        headers: {
          cookie: memberCookie,
        },
      });

      const ownerSubscribedPromise = waitForMessage(ownerSocket, 'SUBSCRIBED_BOARD');

      ownerSocket.send(
        JSON.stringify({
          type: 'SUBSCRIBE_BOARD',
          boardId,
        }),
      );

      await ownerSubscribedPromise;

      const memberSubscribedPromise = waitForMessage(memberSocket, 'SUBSCRIBED_BOARD');

      memberSocket.send(
        JSON.stringify({
          type: 'SUBSCRIBE_BOARD',
          boardId,
        }),
      );

      await memberSubscribedPromise;

      const ownerChangedPromise = waitForMessage(ownerSocket, 'BOARD_CHANGED');

      const memberChangedPromise = waitForMessage(memberSocket, 'BOARD_CHANGED');

      const deleteResponse = await app.inject({
        method: 'DELETE',
        url: `/api/boards/${boardId}`,
        headers: {
          cookie: ownerCookie,
        },
      });

      expect(deleteResponse.statusCode).toBe(204);

      await expect(ownerChangedPromise).resolves.toEqual({
        type: 'BOARD_CHANGED',
        boardId,
      });

      await expect(memberChangedPromise).resolves.toEqual({
        type: 'BOARD_CHANGED',
        boardId,
      });

      const noOwnerChangesPromise = expectNoMessage(ownerSocket, 'BOARD_CHANGED');

      const noMemberChangesPromise = expectNoMessage(memberSocket, 'BOARD_CHANGED');

      await expect(noOwnerChangesPromise).resolves.toBeUndefined();
      await expect(noMemberChangesPromise).resolves.toBeUndefined();

      ownerSocket.terminate();
      memberSocket.terminate();
    } finally {
      await app.close();
    }
  });

  it('отправляет BOARD_CHANGED после принятия приглашения на доску', async () => {
    const app = await createApp();

    try {
      const ownerCookie = await registerUser(app, TEST_EMAIL);
      const inviteeCookie = await registerUser(app, OTHER_TEST_EMAIL);

      const boardId = await createBoard(app, ownerCookie, 'Realtime Invitation Board');

      const invitationResponse = await app.inject({
        method: 'POST',
        url: `/api/boards/${boardId}/invitations/link`,
        headers: {
          cookie: ownerCookie,
        },
        payload: {
          role: 'VIEWER',
          expiresInDays: 7,
          maxUses: 1,
        },
      });

      expect(invitationResponse.statusCode).toBe(200);

      const invitationBody = invitationResponse.json() as {
        invitation: {
          token: string;
        };
      };

      await app.ready();

      const ownerSocket = await app.injectWS('/api/realtime', {
        headers: {
          cookie: ownerCookie,
        },
      });

      const subscribedPromise = waitForMessage(ownerSocket, 'SUBSCRIBED_BOARD');

      ownerSocket.send(
        JSON.stringify({
          type: 'SUBSCRIBE_BOARD',
          boardId,
        }),
      );

      await expect(subscribedPromise).resolves.toEqual({
        type: 'SUBSCRIBED_BOARD',
        boardId,
      });

      const changedPromise = waitForMessage(ownerSocket, 'BOARD_CHANGED');

      const acceptResponse = await app.inject({
        method: 'POST',
        url: `/api/invitations/${invitationBody.invitation.token}/accept`,
        headers: {
          cookie: inviteeCookie,
        },
      });

      expect(acceptResponse.statusCode).toBe(200);

      await expect(changedPromise).resolves.toEqual({
        type: 'BOARD_CHANGED',
        boardId,
      });

      ownerSocket.terminate();
    } finally {
      await app.close();
    }
  });
});
