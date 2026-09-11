import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { notificationQueryKeys } from './notification-query-keys';

type NotificationsChangedMessage = {
  type: 'NOTIFICATIONS_CHANGED';
};

type RealtimeMessage =
  | NotificationsChangedMessage
  | {
      type: 'BOARD_CHANGED';
      boardId: string;
    }
  | {
      type: 'SUBSCRIBED_BOARD';
      boardId: string;
    }
  | {
      type: 'UNSUBSCRIBED_BOARD';
      boardId: string;
    }
  | {
      type: 'PONG';
    }
  | {
      type: 'ERROR';
      code: string;
      message: string;
    };

const INVALIDATION_DELAY_MS = 50;
const RECONNECT_DELAY_MS = 1000;

function isRealtimeMessage(value: unknown): value is RealtimeMessage {
  return (
    typeof value === 'object' && value !== null && 'type' in value && typeof value.type === 'string'
  );
}

function getRealtimeUrl(): string {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

  return `${protocol}//${window.location.host}/api/realtime`;
}

export function useNotificationsRealtime(enabled: boolean): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let socket: WebSocket | null = null;

    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

    let invalidationTimeout: ReturnType<typeof setTimeout> | null = null;

    let isDisposed = false;
    let hasConnected = false;

    function invalidateNotificationsImmediately(): void {
      void queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.lists(),
      });

      void queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.unreadCount(),
      });
    }

    function scheduleNotificationsInvalidation(): void {
      if (invalidationTimeout) {
        clearTimeout(invalidationTimeout);
      }

      invalidationTimeout = setTimeout(() => {
        invalidationTimeout = null;

        if (isDisposed) {
          return;
        }

        invalidateNotificationsImmediately();
      }, INVALIDATION_DELAY_MS);
    }

    function connect(): void {
      if (isDisposed) {
        return;
      }

      socket = new WebSocket(getRealtimeUrl());

      socket.addEventListener('open', () => {
        if (hasConnected) {
          invalidateNotificationsImmediately();
        }

        hasConnected = true;
      });

      socket.addEventListener('message', (event) => {
        let value: unknown;

        try {
          value = JSON.parse(String(event.data));
        } catch {
          return;
        }

        if (!isRealtimeMessage(value)) {
          return;
        }

        if (value.type !== 'NOTIFICATIONS_CHANGED') {
          return;
        }

        scheduleNotificationsInvalidation();
      });

      socket.addEventListener('close', () => {
        if (isDisposed) {
          return;
        }

        reconnectTimeout = setTimeout(() => {
          connect();
        }, RECONNECT_DELAY_MS);
      });
    }

    connect();

    return () => {
      isDisposed = true;

      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }

      if (invalidationTimeout) {
        clearTimeout(invalidationTimeout);
      }

      socket?.close();
    };
  }, [enabled, queryClient]);
}
