import { randomUUID } from 'node:crypto';

import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { buildApp } from '../src/app.js';
import { db } from '../src/db/client.js';

const PASSWORD = 'Password123!';

let app: Awaited<ReturnType<typeof buildApp>>;

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

  const setCookie = response.headers['set-cookie'];

  const rawCookie = Array.isArray(setCookie) ? setCookie[0] : setCookie;

  if (!rawCookie) {
    throw new Error('Session cookie не найден');
  }

  return {
    userId: body.user.id,
    cookie: rawCookie.split(';')[0]!,
  };
}

function createEmail(prefix: string): string {
  return `${prefix}-${randomUUID()}@example.com`;
}

describe('Уведомления', () => {
  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  beforeEach(async () => {
    await db.notification.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  it('возвращает уведомления текущего пользователя', async () => {
    const user = await registerUser(createEmail('notifications-list'));

    const firstCreatedAt = new Date('2026-09-01T10:00:00.000Z');
    const secondCreatedAt = new Date('2026-09-02T10:00:00.000Z');

    await db.notification.createMany({
      data: [
        {
          userId: user.userId,
          type: 'BOARD_ACCESS_GRANTED',
          title: 'Доступ получен',
          message: 'Вы получили доступ к доске',
          boardId: 'board-1',
          createdAt: firstCreatedAt,
        },
        {
          userId: user.userId,
          type: 'BOARD_ROLE_CHANGED',
          title: 'Роль изменена',
          message: 'Ваша роль была изменена',
          boardId: 'board-1',
          createdAt: secondCreatedAt,
        },
      ],
    });

    const response = await app.inject({
      method: 'GET',
      url: '/api/notifications',
      headers: {
        cookie: user.cookie,
      },
    });

    expect(response.statusCode).toBe(200);

    const body = response.json<{
      notifications: Array<{
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        boardId: string | null;
        readAt: string | null;
        createdAt: string;
      }>;
    }>();

    expect(body.notifications).toHaveLength(2);

    expect(body.notifications[0]).toMatchObject({
      userId: user.userId,
      type: 'BOARD_ROLE_CHANGED',
      title: 'Роль изменена',
      message: 'Ваша роль была изменена',
      boardId: 'board-1',
      readAt: null,
    });

    expect(body.notifications[1]).toMatchObject({
      userId: user.userId,
      type: 'BOARD_ACCESS_GRANTED',
      title: 'Доступ получен',
      message: 'Вы получили доступ к доске',
      boardId: 'board-1',
      readAt: null,
    });
  });

  it('не возвращает уведомления другого пользователя', async () => {
    const user = await registerUser(createEmail('notifications-owner'));

    const otherUser = await registerUser(createEmail('notifications-other'));

    await db.notification.create({
      data: {
        userId: otherUser.userId,
        type: 'BOARD_ACCESS_GRANTED',
        title: 'Чужое уведомление',
        message: 'Это уведомление другого пользователя',
        boardId: 'board-1',
      },
    });

    const response = await app.inject({
      method: 'GET',
      url: '/api/notifications',
      headers: {
        cookie: user.cookie,
      },
    });

    expect(response.statusCode).toBe(200);

    expect(response.json()).toEqual({
      notifications: [],
    });
  });

  it('возвращает количество непрочитанных уведомлений', async () => {
    const user = await registerUser(createEmail('notifications-count'));

    await db.notification.createMany({
      data: [
        {
          userId: user.userId,
          type: 'BOARD_ACCESS_GRANTED',
          title: 'Первое',
          message: 'Первое уведомление',
        },
        {
          userId: user.userId,
          type: 'BOARD_ROLE_CHANGED',
          title: 'Второе',
          message: 'Второе уведомление',
        },
        {
          userId: user.userId,
          type: 'BOARD_ACCESS_REVOKED',
          title: 'Третье',
          message: 'Третье уведомление',
          readAt: new Date(),
        },
      ],
    });

    const response = await app.inject({
      method: 'GET',
      url: '/api/notifications/unread-count',
      headers: {
        cookie: user.cookie,
      },
    });

    expect(response.statusCode).toBe(200);

    expect(response.json()).toEqual({
      count: 2,
    });
  });

  it('отмечает одно уведомление прочитанным', async () => {
    const user = await registerUser(createEmail('notifications-read'));

    const notification = await db.notification.create({
      data: {
        userId: user.userId,
        type: 'BOARD_ACCESS_GRANTED',
        title: 'Доступ получен',
        message: 'Вы получили доступ к доске',
      },
    });

    const response = await app.inject({
      method: 'PATCH',
      url: `/api/notifications/${notification.id}/read`,
      headers: {
        cookie: user.cookie,
      },
    });

    expect(response.statusCode).toBe(200);

    const body = response.json<{
      notification: {
        id: string;
        readAt: string | null;
      };
    }>();

    expect(body.notification.id).toBe(notification.id);
    expect(body.notification.readAt).not.toBeNull();

    const storedNotification = await db.notification.findUnique({
      where: {
        id: notification.id,
      },
    });

    expect(storedNotification?.readAt).not.toBeNull();
  });

  it('повторная отметка прочитанного уведомления не изменяет readAt', async () => {
    const user = await registerUser(createEmail('notifications-read-again'));

    const readAt = new Date('2026-09-01T10:00:00.000Z');

    const notification = await db.notification.create({
      data: {
        userId: user.userId,
        type: 'BOARD_ACCESS_GRANTED',
        title: 'Доступ получен',
        message: 'Вы получили доступ к доске',
        readAt,
      },
    });

    const response = await app.inject({
      method: 'PATCH',
      url: `/api/notifications/${notification.id}/read`,
      headers: {
        cookie: user.cookie,
      },
    });

    expect(response.statusCode).toBe(200);

    const storedNotification = await db.notification.findUnique({
      where: {
        id: notification.id,
      },
    });

    expect(storedNotification?.readAt?.toISOString()).toBe(readAt.toISOString());
  });

  it('не позволяет отметить чужое уведомление прочитанным', async () => {
    const user = await registerUser(createEmail('notifications-current'));

    const otherUser = await registerUser(createEmail('notifications-foreign'));

    const notification = await db.notification.create({
      data: {
        userId: otherUser.userId,
        type: 'BOARD_ACCESS_GRANTED',
        title: 'Чужое уведомление',
        message: 'Чужое уведомление',
      },
    });

    const response = await app.inject({
      method: 'PATCH',
      url: `/api/notifications/${notification.id}/read`,
      headers: {
        cookie: user.cookie,
      },
    });

    expect(response.statusCode).toBe(404);

    expect(response.json()).toMatchObject({
      code: 'NOTIFICATION_NOT_FOUND',
    });

    const storedNotification = await db.notification.findUnique({
      where: {
        id: notification.id,
      },
    });

    expect(storedNotification?.readAt).toBeNull();
  });

  it('отмечает все уведомления пользователя прочитанными', async () => {
    const user = await registerUser(createEmail('notifications-read-all'));

    await db.notification.createMany({
      data: [
        {
          userId: user.userId,
          type: 'BOARD_ACCESS_GRANTED',
          title: 'Первое',
          message: 'Первое уведомление',
        },
        {
          userId: user.userId,
          type: 'BOARD_ROLE_CHANGED',
          title: 'Второе',
          message: 'Второе уведомление',
        },
      ],
    });

    const response = await app.inject({
      method: 'PATCH',
      url: '/api/notifications/read-all',
      headers: {
        cookie: user.cookie,
      },
    });

    expect(response.statusCode).toBe(200);

    expect(response.json()).toEqual({
      count: 0,
    });

    const unreadCount = await db.notification.count({
      where: {
        userId: user.userId,
        readAt: null,
      },
    });

    expect(unreadCount).toBe(0);
  });

  it('не отмечает уведомления другого пользователя при массовом прочтении', async () => {
    const user = await registerUser(createEmail('notifications-read-all-owner'));

    const otherUser = await registerUser(createEmail('notifications-read-all-other'));

    await db.notification.create({
      data: {
        userId: otherUser.userId,
        type: 'BOARD_ACCESS_GRANTED',
        title: 'Чужое уведомление',
        message: 'Чужое уведомление',
      },
    });

    const response = await app.inject({
      method: 'PATCH',
      url: '/api/notifications/read-all',
      headers: {
        cookie: user.cookie,
      },
    });

    expect(response.statusCode).toBe(200);

    const unreadCount = await db.notification.count({
      where: {
        userId: otherUser.userId,
        readAt: null,
      },
    });

    expect(unreadCount).toBe(1);
  });

  it('требует авторизацию для получения уведомлений', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/notifications',
    });

    expect(response.statusCode).toBe(401);
  });

  it('требует авторизацию для получения количества непрочитанных уведомлений', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/notifications/unread-count',
    });

    expect(response.statusCode).toBe(401);
  });
});
