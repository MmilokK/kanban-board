import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { db } from '../src/db/client.js';
import { testEnv } from './test-env.js';

const USER_A_EMAIL = 'boards-test-a@example.com';
const USER_B_EMAIL = 'boards-test-b@example.com';
const PASSWORD = 'password123';

async function createApp(): Promise<FastifyInstance> {
  return buildApp({
    env: testEnv,
  });
}

async function cleanupTestData(): Promise<void> {
  const users = await db.user.findMany({
    where: {
      email: {
        in: [USER_A_EMAIL, USER_B_EMAIL],
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

  const boardIds = memberships.map((membership) => membership.boardId);

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

async function registerAndGetCookie(app: FastifyInstance, email: string): Promise<string> {
  const response = await app.inject({
    method: 'POST',
    url: '/api/auth/register',
    payload: {
      email,
      password: PASSWORD,
    },
  });

  expect(response.statusCode).toBe(201);

  return getSessionCookie(response);
}

async function createBoardForUser(app: FastifyInstance, cookie: string, title = 'Рабочая доска') {
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

  return response.json();
}

beforeEach(async () => {
  await cleanupTestData();
});

afterAll(async () => {
  await cleanupTestData();

  await db.$disconnect();
});

describe('Cloud-доски', () => {
  it('не позволяет получить доски без входа', async () => {
    const app = await createApp();

    try {
      const response = await app.inject({
        method: 'GET',
        url: '/api/boards',
      });

      expect(response.statusCode).toBe(401);

      expect(response.json()).toMatchObject({
        code: 'UNAUTHENTICATED',
      });
    } finally {
      await app.close();
    }
  });

  it('создаёт доску и назначает пользователя владельцем', async () => {
    const app = await createApp();

    try {
      const cookie = await registerAndGetCookie(app, USER_A_EMAIL);
      const response = await app.inject({
        method: 'POST',
        url: '/api/boards',
        headers: {
          cookie,
        },
        payload: {
          title: 'Рабочая доска',
        },
      });

      expect(response.statusCode).toBe(201);

      const body = response.json();

      expect(body.board).toMatchObject({
        title: 'Рабочая доска',
        role: 'OWNER',
      });

      const membership = await db.boardMember.findFirst({
        where: {
          boardId: body.board.id,
          user: {
            email: USER_A_EMAIL,
          },
        },
      });

      expect(membership?.role).toBe('OWNER');
    } finally {
      await app.close();
    }
  });

  it('создаёт стандартные колонки для новой доски', async () => {
    const app = await createApp();

    try {
      const cookie = await registerAndGetCookie(app, USER_A_EMAIL);
      const body = await createBoardForUser(app, cookie);

      expect(body.board.columns.map((column: { title: string }) => column.title)).toEqual([
        'Backlog',
        'To do',
        'In progress',
        'Done',
        'Archive',
      ]);

      expect(
        body.board.columns.find((column: { title: string }) => column.title === 'Done'),
      ).toMatchObject({
        isCompleted: true,
      });

      expect(
        body.board.columns.find((column: { title: string }) => column.title === 'Archive'),
      ).toMatchObject({
        isArchive: true,
      });
    } finally {
      await app.close();
    }
  });

  it('возвращает только доски текущего пользователя', async () => {
    const app = await createApp();

    try {
      const cookieA = await registerAndGetCookie(app, USER_A_EMAIL);
      const cookieB = await registerAndGetCookie(app, USER_B_EMAIL);

      await createBoardForUser(app, cookieA, 'Доска A');

      await createBoardForUser(app, cookieB, 'Доска B');

      const response = await app.inject({
        method: 'GET',
        url: '/api/boards',
        headers: {
          cookie: cookieA,
        },
      });

      expect(response.statusCode).toBe(200);

      const body = response.json();

      expect(body.boards).toHaveLength(1);

      expect(body.boards[0]).toMatchObject({
        title: 'Доска A',
      });
    } finally {
      await app.close();
    }
  });

  it('возвращает подробные данные собственной доски', async () => {
    const app = await createApp();

    try {
      const cookie = await registerAndGetCookie(app, USER_A_EMAIL);
      const created = await createBoardForUser(app, cookie);
      const response = await app.inject({
        method: 'GET',
        url: `/api/boards/${created.board.id}`,
        headers: {
          cookie,
        },
      });

      expect(response.statusCode).toBe(200);

      expect(response.json()).toMatchObject({
        board: {
          id: created.board.id,
          title: 'Рабочая доска',
          role: 'OWNER',
        },
      });
    } finally {
      await app.close();
    }
  });

  it('не возвращает чужую доску по идентификатору', async () => {
    const app = await createApp();

    try {
      const cookieA = await registerAndGetCookie(app, USER_A_EMAIL);
      const cookieB = await registerAndGetCookie(app, USER_B_EMAIL);
      const created = await createBoardForUser(app, cookieA, 'Чужая доска');
      const response = await app.inject({
        method: 'GET',
        url: `/api/boards/${created.board.id}`,
        headers: {
          cookie: cookieB,
        },
      });

      expect(response.statusCode).toBe(404);

      expect(response.json()).toEqual({
        message: 'Доска не найдена',
        code: 'BOARD_NOT_FOUND',
      });
    } finally {
      await app.close();
    }
  });

  it('переименовывает собственную доску', async () => {
    const app = await createApp();

    try {
      const cookie = await registerAndGetCookie(app, USER_A_EMAIL);
      const created = await createBoardForUser(app, cookie);
      const response = await app.inject({
        method: 'PATCH',
        url: `/api/boards/${created.board.id}`,
        headers: {
          cookie,
        },
        payload: {
          title: 'Новое название',
        },
      });

      expect(response.statusCode).toBe(200);

      expect(response.json()).toMatchObject({
        board: {
          id: created.board.id,
          title: 'Новое название',
        },
      });

      const board = await db.board.findUnique({
        where: {
          id: created.board.id,
        },
      });

      expect(board?.title).toBe('Новое название');
    } finally {
      await app.close();
    }
  });

  it('удаляет собственную доску', async () => {
    const app = await createApp();

    try {
      const cookie = await registerAndGetCookie(app, USER_A_EMAIL);
      const created = await createBoardForUser(app, cookie);
      const response = await app.inject({
        method: 'DELETE',
        url: `/api/boards/${created.board.id}`,
        headers: {
          cookie,
        },
      });

      expect(response.statusCode).toBe(204);

      const board = await db.board.findUnique({
        where: {
          id: created.board.id,
        },
      });

      expect(board).toBeNull();
    } finally {
      await app.close();
    }
  });

  it('импортирует локальную доску вместе с задачами, подзадачами и комментариями', async () => {
    const app = await createApp();

    try {
      const cookie = await registerAndGetCookie(app, USER_A_EMAIL);
      const response = await app.inject({
        method: 'POST',
        url: '/api/boards/import',
        headers: {
          cookie,
        },
        payload: {
          title: 'Импортированная доска',
          columns: [
            {
              title: 'Backlog',
              isCompleted: false,
              isArchive: false,
              tasks: [
                {
                  title: 'Первая задача',
                  description: 'Описание задачи',
                  priority: 'high',
                  tags: ['Работа', 'Важно'],
                  dueDate: '2099-12-31',
                  archivedAt: null,
                  subtasks: [
                    {
                      title: 'Подзадача',
                      description: 'Описание подзадачи',
                      isCompleted: false,
                    },
                  ],
                  comments: [
                    {
                      text: 'Комментарий',
                      createdAt: '2026-08-01T10:00:00.000Z',
                      updatedAt: '2026-08-01T10:00:00.000Z',
                    },
                  ],
                },
              ],
            },
            {
              title: 'Archive',
              isCompleted: false,
              isArchive: true,
              tasks: [],
            },
          ],
        },
      });

      expect(response.statusCode).toBe(201);

      const body = response.json();

      expect(body.board).toMatchObject({
        title: 'Импортированная доска',
        role: 'OWNER',
      });

      const task = body.board.tasks.find(
        (item: { title: string }) => item.title === 'Первая задача',
      );

      expect(task).toMatchObject({
        description: 'Описание задачи',
        priority: 'high',
        tags: ['Работа', 'Важно'],
      });

      expect(task.subtasks).toEqual([
        expect.objectContaining({
          title: 'Подзадача',
          description: 'Описание подзадачи',
          isCompleted: false,
        }),
      ]);

      expect(task.comments).toEqual([
        expect.objectContaining({
          text: 'Комментарий',
        }),
      ]);

      const storedTask = await db.task.findFirst({
        where: {
          title: 'Первая задача',
          column: {
            boardId: body.board.id,
          },
        },
        include: {
          subtasks: true,
          comments: true,
        },
      });

      expect(storedTask).not.toBeNull();

      expect(storedTask?.subtasks).toHaveLength(1);

      expect(storedTask?.comments).toHaveLength(1);

      expect(storedTask?.comments[0]?.authorId).toBeNull();
    } finally {
      await app.close();
    }
  });

  it('добавляет архивную колонку если её нет в импорте', async () => {
    const app = await createApp();

    try {
      const cookie = await registerAndGetCookie(app, USER_A_EMAIL);
      const response = await app.inject({
        method: 'POST',
        url: '/api/boards/import',
        headers: {
          cookie,
        },
        payload: {
          title: 'Доска без архива',
          columns: [
            {
              title: 'Backlog',
              isCompleted: false,
              isArchive: false,
              tasks: [],
            },
            {
              title: 'Done',
              isCompleted: true,
              isArchive: false,
              tasks: [],
            },
          ],
        },
      });

      expect(response.statusCode).toBe(201);

      const body = response.json();
      const archiveColumns = body.board.columns.filter(
        (column: { isArchive: boolean }) => column.isArchive,
      );

      expect(archiveColumns).toHaveLength(1);

      expect(archiveColumns[0]).toMatchObject({
        title: 'Archive',
        isArchive: true,
      });
    } finally {
      await app.close();
    }
  });

  it('не позволяет импортировать доску с несколькими архивными колонками', async () => {
    const app = await createApp();

    try {
      const cookie = await registerAndGetCookie(app, USER_A_EMAIL);
      const response = await app.inject({
        method: 'POST',
        url: '/api/boards/import',
        headers: {
          cookie,
        },
        payload: {
          title: 'Некорректная доска',
          columns: [
            {
              title: 'Archive 1',
              isCompleted: false,
              isArchive: true,
              tasks: [],
            },
            {
              title: 'Archive 2',
              isCompleted: false,
              isArchive: true,
              tasks: [],
            },
          ],
        },
      });

      expect(response.statusCode).toBe(400);

      expect(response.json()).toMatchObject({
        code: 'VALIDATION_ERROR',
      });

      const boards = await db.board.findMany({
        where: {
          title: 'Некорректная доска',
        },
      });

      expect(boards).toHaveLength(0);
    } finally {
      await app.close();
    }
  });
});
