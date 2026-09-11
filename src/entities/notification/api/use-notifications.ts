import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from './notification-api';
import { notificationQueryKeys } from './notification-query-keys';

export function useNotifications() {
  return useQuery({
    queryKey: notificationQueryKeys.lists(),
    queryFn: async () => {
      return getNotifications().then(({ notifications }) => notifications);
    },
  });
}

export function useUnreadNotificationCount() {
  return useQuery({
    queryKey: notificationQueryKeys.unreadCount(),
    queryFn: async () => {
      return getUnreadNotificationCount().then(({ count }) => count);
    },
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: notificationQueryKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: notificationQueryKeys.unreadCount(),
        }),
      ]);
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: notificationQueryKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: notificationQueryKeys.unreadCount(),
        }),
      ]);
    },
  });
}
