import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import type { BoardId } from '../../../shared/model/entity-ids';
import { boardQueryKeys } from './board-query-keys';

type BoardChangedMessage = {
  type: 'BOARD_CHANGED';
  boardId: BoardId;
};

type RealtimeMessage =
  | BoardChangedMessage
  | {
      type: 'SUBSCRIBED_BOARD';
      boardId: BoardId;
    }
  | {
      type: 'UNSUBSCRIBED_BOARD';
      boardId: BoardId;
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

function isRealtimeMessage(value: unknown): value is RealtimeMessage {
  return (
    typeof value === 'object' && value !== null && 'type' in value && typeof value.type === 'string'
  );
}

function getRealtimeUrl(): string {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

  return `${protocol}//${window.location.host}/api/realtime`;
}

export function useBoardRealtime(boardId: BoardId): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    let socket: WebSocket | null = null;
    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
    let invalidationTimeout: ReturnType<typeof setTimeout> | null = null;

    let isDisposed = false;
    let hasConnected = false;

    function invalidateBoardImmediately(): void {
      void queryClient.invalidateQueries({
        queryKey: boardQueryKeys.detail(boardId),
      });

      void queryClient.invalidateQueries({
        queryKey: boardQueryKeys.lists(),
      });
    }

    function scheduleBoardInvalidation(): void {
      if (invalidationTimeout) {
        clearTimeout(invalidationTimeout);
      }

      invalidationTimeout = setTimeout(() => {
        invalidationTimeout = null;

        if (isDisposed) {
          return;
        }

        invalidateBoardImmediately();
      }, INVALIDATION_DELAY_MS);
    }

    function connect(): void {
      if (isDisposed) {
        return;
      }

      socket = new WebSocket(getRealtimeUrl());

      socket.addEventListener('open', () => {
        socket?.send(
          JSON.stringify({
            type: 'SUBSCRIBE_BOARD',
            boardId,
          }),
        );

        if (hasConnected) {
          invalidateBoardImmediately();
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

        if (value.type !== 'BOARD_CHANGED') {
          return;
        }

        if (value.boardId !== boardId) {
          return;
        }

        scheduleBoardInvalidation();
      });

      socket.addEventListener('close', () => {
        if (isDisposed) {
          return;
        }

        reconnectTimeout = setTimeout(() => {
          connect();
        }, 1000);
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

      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: 'UNSUBSCRIBE_BOARD',
            boardId,
          }),
        );
      }

      socket?.close();
    };
  }, [boardId, queryClient]);
}
