import { apiRequest } from '../../../shared/api/api-client';
import type {
  NotificationResponse,
  NotificationsResponse,
  UnreadNotificationCountResponse,
} from '../model/types';

export function getNotifications() {
  return apiRequest<NotificationsResponse>('/notifications');
}

export function getUnreadNotificationCount() {
  return apiRequest<UnreadNotificationCountResponse>('/notifications/unread-count');
}

export function markNotificationAsRead(notificationId: string) {
  return apiRequest<NotificationResponse>(`/notifications/${notificationId}/read`, {
    method: 'PATCH',
  });
}

export function markAllNotificationsAsRead() {
  return apiRequest<UnreadNotificationCountResponse>('/notifications/read-all', {
    method: 'PATCH',
  });
}
