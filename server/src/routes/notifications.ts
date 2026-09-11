import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from '@fastify/type-provider-zod';
import { requireAuth } from '../auth/require-auth.js';
import { apiErrorSchema } from '../schemas/api-response-schema.js';
import {
  getUnreadNotificationCount,
  listUserNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from '../notifications/notification.service.js';
import {
  notificationParamsSchema,
  notificationResponseSchema,
  notificationsResponseSchema,
  unreadNotificationCountResponseSchema,
} from '../notifications/notification.schemas.js';

export async function registerNotificationRoutes(app: FastifyInstance): Promise<void> {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  typedApp.get(
    '/',
    {
      schema: {
        tags: ['Notifications'],
        summary: 'Получить уведомления текущего пользователя',
        security: [{ sessionCookie: [] }],
        response: {
          200: notificationsResponseSchema,
          401: apiErrorSchema,
        },
      },
    },
    async (request) => {
      const user = await requireAuth(request);

      const notifications = await listUserNotifications(user.id);

      return {
        notifications,
      };
    },
  );

  typedApp.get(
    '/unread-count',
    {
      schema: {
        tags: ['Notifications'],
        summary: 'Получить количество непрочитанных уведомлений',
        security: [{ sessionCookie: [] }],
        response: {
          200: unreadNotificationCountResponseSchema,
          401: apiErrorSchema,
        },
      },
    },
    async (request) => {
      const user = await requireAuth(request);

      const count = await getUnreadNotificationCount(user.id);

      return {
        count,
      };
    },
  );

  typedApp.patch(
    '/:notificationId/read',
    {
      schema: {
        tags: ['Notifications'],
        summary: 'Отметить уведомление прочитанным',
        security: [{ sessionCookie: [] }],
        params: notificationParamsSchema,
        response: {
          200: notificationResponseSchema,
          401: apiErrorSchema,
          404: apiErrorSchema,
        },
      },
    },
    async (request) => {
      const user = await requireAuth(request);

      const notification = await markNotificationAsRead(user.id, request.params.notificationId);

      return {
        notification,
      };
    },
  );

  typedApp.patch(
    '/read-all',
    {
      schema: {
        tags: ['Notifications'],
        summary: 'Отметить все уведомления прочитанными',
        security: [{ sessionCookie: [] }],
        response: {
          200: unreadNotificationCountResponseSchema,
          401: apiErrorSchema,
        },
      },
    },
    async (request) => {
      const user = await requireAuth(request);

      await markAllNotificationsAsRead(user.id);

      return {
        count: 0,
      };
    },
  );
}
