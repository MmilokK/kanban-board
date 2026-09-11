export type NotificationType =
  | 'BOARD_INVITATION_RECEIVED'
  | 'BOARD_ACCESS_GRANTED'
  | 'BOARD_ROLE_CHANGED'
  | 'BOARD_ACCESS_REVOKED'
  | 'BOARD_DELETED';

export type Notification = {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  boardId: string | null;
  readAt: string | null;
  createdAt: string;
};

export type NotificationsResponse = {
  notifications: Notification[];
};

export type UnreadNotificationCountResponse = {
  count: number;
};

export type NotificationResponse = {
  notification: Notification;
};
