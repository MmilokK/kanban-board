import z from 'zod';

export const notificationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum([
    'BOARD_INVITATION_RECEIVED',
    'BOARD_ACCESS_GRANTED',
    'BOARD_ROLE_CHANGED',
    'BOARD_ACCESS_REVOKED',
    'BOARD_DELETED',
  ]),
  title: z.string(),
  message: z.string(),
  boardId: z.string().nullable(),
  readAt: z.date().nullable(),
  createdAt: z.date(),
});

export const notificationsResponseSchema = z.object({
  notifications: z.array(notificationSchema),
});

export const unreadNotificationCountResponseSchema = z.object({
  count: z.number().int().nonnegative(),
});

export const notificationParamsSchema = z.object({
  notificationId: z.string(),
});

export const notificationResponseSchema = z.object({
  notification: notificationSchema,
});
