import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { db } from '../src/db/client.js';

const OWNER_EMAIL = 'board-members-owner@test.local';
const EDITOR_EMAIL = 'board-members-editor@test.local';
const VIEWER_EMAIL = 'board-members-viewer@test.local';
const PASSWORD = 'Password123!';

let app: FastifyInstance;

function getSessionCookie(response: {
  headers: Record<string, string | string[] | number | undefined>;
}): string {
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

async function cleanup(): Promise<void> {
  const users = await db.user.findMany({
    where: {
      email: {
        in: [OWNER_EMAIL, EDITOR_EMAIL, VIEWER_EMAIL],
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

  const memberships = await db.boardMember.findMany({
    where: {
      userId: {
        in: userIds,
      },
    },
    select: {
      boardId: true,
    },
  });

  const boardIds = [...new Set(memberships.map((membership) => membership.boardId))];

  if (boardIds.length > 0) {
    await db.board.deleteMany({
      where: {
        id: {
          in: boardIds,
        },
      },
    });
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

async function registerUser(email: string): Promise<{
  userId: string;
  cookie: string;
}> {
  const response = await app.inject({
    method: 'POST',
    url: '/api/auth/register',
    payload: {
      email,
      password: PASSWORD,
      name: email.split('@')[0],
    },
  });
  expect(response.statusCode).toBe(201);
  const body = response.json<{
    user: {
      id: string;
    };
  }>();
  return {
    userId: body.user.id,
    cookie: getSessionCookie(response),
  };
}

async function createBoard(cookie: string): Promise<string> {
  const response = await app.inject({
    method: 'POST',
    url: '/api/boards',
    headers: { cookie },
    payload: { title: 'Доска участников' },
  });
  expect(response.statusCode).toBe(201);
  return response.json<{
    board: {
      id: string;
    };
  }>().board.id;
}

describe('Участники cloud-доски', () => {
  beforeAll(async () => {
    await cleanup();
    app = await buildApp();
    await app.ready();
  });
  afterAll(async () => {
    await cleanup();
    await app.close();
  });

  it('возвращает участников доски', async () => {
    const owner = await registerUser(OWNER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const response = await app.inject({
      method: 'GET',
      url: `/api/boards/${boardId}/members`,
      headers: { cookie: owner.cookie },
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      members: [
        {
          user: {
            id: owner.userId,
            email: OWNER_EMAIL,
          },
          role: 'OWNER',
        },
      ],
    });
  });

  it('не позволяет постороннему пользователю получить участников доски', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const viewer = await registerUser(VIEWER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const response = await app.inject({
      method: 'GET',
      url: `/api/boards/${boardId}/members`,
      headers: { cookie: viewer.cookie },
    });
    expect(response.statusCode).toBe(404);
  });

  it('позволяет владельцу изменить роль участника', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const editor = await registerUser(EDITOR_EMAIL);
    const boardId = await createBoard(owner.cookie);
    await db.boardMember.create({
      data: {
        boardId,
        userId: editor.userId,
        role: 'VIEWER',
      },
    });
    const response = await app.inject({
      method: 'PATCH',
      url: `/api/boards/${boardId}/members/${editor.userId}`,
      headers: { cookie: owner.cookie },
      payload: { role: 'EDITOR' },
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      member: {
        user: { id: editor.userId },
        role: 'EDITOR',
      },
    });
    const membership = await db.boardMember.findUnique({
      where: {
        boardId_userId: {
          boardId,
          userId: editor.userId,
        },
      },
    });
    expect(membership?.role).toBe('EDITOR');
  });

  it('не позволяет редактору менять роли участников', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const editor = await registerUser(EDITOR_EMAIL);
    const viewer = await registerUser(VIEWER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    await db.boardMember.createMany({
      data: [
        {
          boardId,
          userId: editor.userId,
          role: 'EDITOR',
        },
        {
          boardId,
          userId: viewer.userId,
          role: 'VIEWER',
        },
      ],
    });
    const response = await app.inject({
      method: 'PATCH',
      url: `/api/boards/${boardId}/members/${viewer.userId}`,
      headers: { cookie: editor.cookie },
      payload: { role: 'EDITOR' },
    });
    expect(response.statusCode).toBe(403);
    expect(response.json()).toMatchObject({
      code: 'BOARD_OWNER_REQUIRED',
    });
  });

  it('не позволяет изменить роль владельца доски', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const response = await app.inject({
      method: 'PATCH',
      url: `/api/boards/${boardId}/members/${owner.userId}`,
      headers: { cookie: owner.cookie },
      payload: { role: 'VIEWER' },
    });
    expect(response.statusCode).toBe(400);
    expect(response.json()).toMatchObject({
      code: 'BOARD_OWNER_ROLE_CHANGE_FORBIDDEN',
    });
  });

  it('позволяет владельцу удалить участника', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const viewer = await registerUser(VIEWER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    await db.boardMember.create({
      data: {
        boardId,
        userId: viewer.userId,
        role: 'VIEWER',
      },
    });
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/boards/${boardId}/members/${viewer.userId}`,
      headers: { cookie: owner.cookie },
    });
    expect(response.statusCode).toBe(204);
    const membership = await db.boardMember.findUnique({
      where: {
        boardId_userId: {
          boardId,
          userId: viewer.userId,
        },
      },
    });
    expect(membership).toBeNull();
  });

  it('не позволяет удалить владельца доски', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/boards/${boardId}/members/${owner.userId}`,
      headers: { cookie: owner.cookie },
    });
    expect(response.statusCode).toBe(400);
    expect(response.json()).toMatchObject({
      code: 'BOARD_OWNER_REMOVE_FORBIDDEN',
    });
  });

  it('не позволяет редактору удалить участника', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const editor = await registerUser(EDITOR_EMAIL);
    const viewer = await registerUser(VIEWER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    await db.boardMember.createMany({
      data: [
        {
          boardId,
          userId: editor.userId,
          role: 'EDITOR',
        },
        {
          boardId,
          userId: viewer.userId,
          role: 'VIEWER',
        },
      ],
    });
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/boards/${boardId}/members/${viewer.userId}`,
      headers: { cookie: editor.cookie },
    });
    expect(response.statusCode).toBe(403);
  });
});
