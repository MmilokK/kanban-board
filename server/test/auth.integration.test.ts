import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { db } from '../src/db/client.js';
import { testEnv } from './test-env.js';
import type { OutgoingHttpHeaders } from 'node:http';

const TEST_EMAIL = 'auth-test@example.com';

const TEST_PASSWORD = 'password123';

async function createApp(): Promise<FastifyInstance> {
  return buildApp({ env: testEnv });
}

async function cleanupAuthTestData(): Promise<void> {
  const users = await db.user.findMany({
    where: {
      email: {
        startsWith: 'auth-test',
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

beforeEach(async () => {
  await cleanupAuthTestData();
});

afterAll(async () => {
  await cleanupAuthTestData();

  await db.$disconnect();
});

describe('Аутентификация', () => {
  it('регистрирует пользователя и создаёт session', async () => {
    const app = await createApp();

    try {
      const response = await app.inject({
        method: 'POST',
        url: '/api/auth/register',
        payload: {
          email: TEST_EMAIL,
          password: TEST_PASSWORD,
          name: 'Test User',
        },
      });

      expect(response.statusCode).toBe(201);

      expect(response.json()).toMatchObject({
        user: {
          email: TEST_EMAIL,
          name: 'Test User',
        },
      });

      expect(response.headers['set-cookie']).toBeDefined();

      expect(String(response.headers['set-cookie'])).toContain('kanban_session=');

      expect(String(response.headers['set-cookie'])).toContain('HttpOnly');

      const user = await db.user.findUnique({
        where: {
          email: TEST_EMAIL,
        },

        include: {
          passwordCredential: true,
          sessions: true,
        },
      });

      expect(user).not.toBeNull();

      expect(user?.passwordCredential?.passwordHash).toBeTruthy();

      expect(user?.passwordCredential?.passwordHash).not.toBe(TEST_PASSWORD);

      expect(user?.sessions).toHaveLength(1);

      expect(user?.sessions[0]?.tokenHash).not.toContain('kanban_session');
    } finally {
      await app.close();
    }
  });

  it('не позволяет зарегистрировать одинаковый email дважды', async () => {
    const app = await createApp();

    try {
      const payload = {
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      };

      const firstResponse = await app.inject({
        method: 'POST',
        url: '/api/auth/register',
        payload,
      });

      expect(firstResponse.statusCode).toBe(201);

      const secondResponse = await app.inject({
        method: 'POST',
        url: '/api/auth/register',
        payload,
      });

      expect(secondResponse.statusCode).toBe(409);

      expect(secondResponse.json()).toEqual({
        message: 'Пользователь с таким email уже существует',
        code: 'EMAIL_ALREADY_EXISTS',
      });
    } finally {
      await app.close();
    }
  });

  it('выполняет вход с правильным паролем', async () => {
    const app = await createApp();

    try {
      await app.inject({
        method: 'POST',
        url: '/api/auth/register',
        payload: {
          email: TEST_EMAIL,
          password: TEST_PASSWORD,
        },
      });

      const response = await app.inject({
        method: 'POST',
        url: '/api/auth/login',
        payload: {
          email: TEST_EMAIL,
          password: TEST_PASSWORD,
        },
      });

      expect(response.statusCode).toBe(200);

      expect(response.json()).toMatchObject({
        user: {
          email: TEST_EMAIL,
        },
      });

      expect(response.headers['set-cookie']).toBeDefined();
    } finally {
      await app.close();
    }
  });

  it('отклоняет неправильный пароль', async () => {
    const app = await createApp();

    try {
      await app.inject({
        method: 'POST',
        url: '/api/auth/register',
        payload: {
          email: TEST_EMAIL,
          password: TEST_PASSWORD,
        },
      });

      const response = await app.inject({
        method: 'POST',
        url: '/api/auth/login',
        payload: {
          email: TEST_EMAIL,
          password: 'wrong-password',
        },
      });

      expect(response.statusCode).toBe(401);

      expect(response.json()).toEqual({
        message: 'Неверный email или пароль',
        code: 'INVALID_CREDENTIALS',
      });
    } finally {
      await app.close();
    }
  });

  it('не раскрывает существование email при входе', async () => {
    const app = await createApp();

    try {
      const response = await app.inject({
        method: 'POST',
        url: '/api/auth/login',
        payload: {
          email: 'auth-test-missing@example.com',
          password: TEST_PASSWORD,
        },
      });

      expect(response.statusCode).toBe(401);

      expect(response.json()).toEqual({
        message: 'Неверный email или пароль',
        code: 'INVALID_CREDENTIALS',
      });
    } finally {
      await app.close();
    }
  });

  it('возвращает текущего пользователя по session cookie', async () => {
    const app = await createApp();

    try {
      const registerResponse = await app.inject({
        method: 'POST',
        url: '/api/auth/register',
        payload: {
          email: TEST_EMAIL,
          password: TEST_PASSWORD,
          name: 'Test User',
        },
      });

      const cookie = getSessionCookie(registerResponse);

      const response = await app.inject({
        method: 'GET',
        url: '/api/auth/me',
        headers: {
          cookie,
        },
      });

      expect(response.statusCode).toBe(200);

      expect(response.json()).toMatchObject({
        user: {
          email: TEST_EMAIL,
          name: 'Test User',
        },
      });
    } finally {
      await app.close();
    }
  });

  it('возвращает 401 без session', async () => {
    const app = await createApp();

    try {
      const response = await app.inject({
        method: 'GET',
        url: '/api/auth/me',
      });

      expect(response.statusCode).toBe(401);

      expect(response.json()).toEqual({
        message: 'Требуется вход в аккаунт',
        code: 'UNAUTHENTICATED',
      });
    } finally {
      await app.close();
    }
  });

  it('завершает текущую session при выходе', async () => {
    const app = await createApp();

    try {
      const registerResponse = await app.inject({
        method: 'POST',
        url: '/api/auth/register',
        payload: {
          email: TEST_EMAIL,
          password: TEST_PASSWORD,
        },
      });

      const cookie = getSessionCookie(registerResponse);

      const logoutResponse = await app.inject({
        method: 'POST',
        url: '/api/auth/logout',
        headers: {
          cookie,
        },
      });

      expect(logoutResponse.statusCode).toBe(204);

      const meResponse = await app.inject({
        method: 'GET',
        url: '/api/auth/me',
        headers: {
          cookie,
        },
      });

      expect(meResponse.statusCode).toBe(401);

      expect(meResponse.json()).toMatchObject({
        code: 'UNAUTHENTICATED',
      });

      const sessions = await db.session.findMany({
        where: {
          user: {
            email: TEST_EMAIL,
          },
        },
      });

      expect(sessions).toHaveLength(0);
    } finally {
      await app.close();
    }
  });
});
