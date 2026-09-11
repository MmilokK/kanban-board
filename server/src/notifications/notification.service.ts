import { NotificationType } from '../generated/prisma/client.js';
import { db } from '../db/client.js';
import { AppError } from '../errors/app-error.js';

type CreateNotificationInput = {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  boardId?: string | null;
};

export async function createNotification(input: CreateNotificationInput) {
  return db.notification.create({
    data: {
      userId: input.userId,
      type: input.type,
      title: input.title,
      message: input.message,
      boardId: input.boardId ?? null,
    },
  });
}

export async function listUserNotifications(userId: string) {
  return db.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getUnreadNotificationCount(userId: string): Promise<number> {
  return db.notification.count({
    where: {
      userId,
      readAt: null,
    },
  });
}

export async function markNotificationAsRead(userId: string, notificationId: string) {
  const notification = await db.notification.findFirst({
    where: {
      id: notificationId,
      userId,
    },
  });

  if (!notification) {
    throw new AppError('Уведомление не найдено', {
      statusCode: 404,
      code: 'NOTIFICATION_NOT_FOUND',
    });
  }

  if (notification.readAt) {
    return notification;
  }

  return db.notification.update({
    where: {
      id: notification.id,
    },
    data: {
      readAt: new Date(),
    },
  });
}

export async function markAllNotificationsAsRead(userId: string) {
  await db.notification.updateMany({
    where: {
      userId,
      readAt: null,
    },
    data: {
      readAt: new Date(),
    },
  });
}
