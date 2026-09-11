import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { notificationQueryKeys } from './notification-query-keys';
import { useNotificationsRealtime } from './use-notifications-realtime';

class MockWebSocket {
  static readonly OPEN = 1;

  readonly url: string;

  readyState = MockWebSocket.OPEN;

  private readonly listeners = new Map<string, Set<(event: Event) => void>>();

  constructor(url: string | URL) {
    this.url = String(url);

    sockets.push(this);
  }

  addEventListener(type: string, listener: (event: Event) => void): void {
    let typeListeners = this.listeners.get(type);

    if (!typeListeners) {
      typeListeners = new Set();
      this.listeners.set(type, typeListeners);
    }

    typeListeners.add(listener);
  }

  removeEventListener(type: string, listener: (event: Event) => void): void {
    this.listeners.get(type)?.delete(listener);
  }

  send(): void {}

  close(): void {
    this.readyState = 3;
  }

  emitOpen(): void {
    this.emit('open', new Event('open'));
  }

  emitMessage(message: unknown): void {
    this.emit(
      'message',
      new MessageEvent('message', {
        data: JSON.stringify(message),
      }),
    );
  }

  emitClose(): void {
    this.readyState = 3;

    this.emit('close', new Event('close'));
  }

  private emit(type: string, event: Event): void {
    const typeListeners = this.listeners.get(type);

    if (!typeListeners) {
      return;
    }

    for (const listener of typeListeners) {
      listener(event);
    }
  }
}

const sockets: MockWebSocket[] = [];

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },

      mutations: {
        retry: false,
      },
    },
  });
}

beforeEach(() => {
  sockets.length = 0;

  vi.useFakeTimers();

  vi.stubGlobal('WebSocket', MockWebSocket);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('Realtime уведомлений', () => {
  it('не создаёт WebSocket без авторизованного пользователя', () => {
    const queryClient = createQueryClient();

    renderHook(
      () => {
        useNotificationsRealtime(false);
      },
      {
        wrapper: createWrapper(queryClient),
      },
    );

    expect(sockets).toHaveLength(0);
  });

  it('подключается к realtime при авторизованном пользователе', () => {
    const queryClient = createQueryClient();

    renderHook(
      () => {
        useNotificationsRealtime(true);
      },
      {
        wrapper: createWrapper(queryClient),
      },
    );

    expect(sockets).toHaveLength(1);

    expect(sockets[0]?.url).toBe(`ws://${window.location.host}/api/realtime`);
  });

  it('обновляет список и счётчик после NOTIFICATIONS_CHANGED', async () => {
    const queryClient = createQueryClient();

    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

    renderHook(
      () => {
        useNotificationsRealtime(true);
      },
      {
        wrapper: createWrapper(queryClient),
      },
    );

    const socket = sockets[0];

    if (!socket) {
      throw new Error('Realtime WebSocket не создан');
    }

    act(() => {
      socket.emitOpen();

      socket.emitMessage({
        type: 'NOTIFICATIONS_CHANGED',
      });
    });

    expect(invalidateQueriesSpy).not.toHaveBeenCalled();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(50);
    });

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: notificationQueryKeys.lists(),
    });

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: notificationQueryKeys.unreadCount(),
    });
  });

  it('игнорирует BOARD_CHANGED', async () => {
    const queryClient = createQueryClient();

    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

    renderHook(
      () => {
        useNotificationsRealtime(true);
      },
      {
        wrapper: createWrapper(queryClient),
      },
    );

    const socket = sockets[0];

    if (!socket) {
      throw new Error('Realtime WebSocket не создан');
    }

    act(() => {
      socket.emitOpen();

      socket.emitMessage({
        type: 'BOARD_CHANGED',
        boardId: 'board-1',
      });
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(50);
    });

    expect(invalidateQueriesSpy).not.toHaveBeenCalled();
  });

  it('объединяет несколько быстрых NOTIFICATIONS_CHANGED в одно обновление', async () => {
    const queryClient = createQueryClient();

    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

    renderHook(
      () => {
        useNotificationsRealtime(true);
      },
      {
        wrapper: createWrapper(queryClient),
      },
    );

    const socket = sockets[0];

    if (!socket) {
      throw new Error('Realtime WebSocket не создан');
    }

    act(() => {
      socket.emitOpen();

      socket.emitMessage({
        type: 'NOTIFICATIONS_CHANGED',
      });

      socket.emitMessage({
        type: 'NOTIFICATIONS_CHANGED',
      });

      socket.emitMessage({
        type: 'NOTIFICATIONS_CHANGED',
      });
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(50);
    });

    expect(invalidateQueriesSpy).toHaveBeenCalledTimes(2);

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: notificationQueryKeys.lists(),
    });

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: notificationQueryKeys.unreadCount(),
    });
  });

  it('переподключается после разрыва соединения', async () => {
    const queryClient = createQueryClient();

    renderHook(
      () => {
        useNotificationsRealtime(true);
      },
      {
        wrapper: createWrapper(queryClient),
      },
    );

    expect(sockets).toHaveLength(1);

    const firstSocket = sockets[0];

    if (!firstSocket) {
      throw new Error('Realtime WebSocket не создан');
    }

    act(() => {
      firstSocket.emitOpen();
      firstSocket.emitClose();
    });

    expect(sockets).toHaveLength(1);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(sockets).toHaveLength(2);
  });

  it('обновляет уведомления после успешного переподключения', async () => {
    const queryClient = createQueryClient();

    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

    renderHook(
      () => {
        useNotificationsRealtime(true);
      },
      {
        wrapper: createWrapper(queryClient),
      },
    );

    const firstSocket = sockets[0];

    if (!firstSocket) {
      throw new Error('Первый realtime WebSocket не создан');
    }

    act(() => {
      firstSocket.emitOpen();
      firstSocket.emitClose();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    const secondSocket = sockets[1];

    if (!secondSocket) {
      throw new Error('Повторный realtime WebSocket не создан');
    }

    act(() => {
      secondSocket.emitOpen();
    });

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: notificationQueryKeys.lists(),
    });

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: notificationQueryKeys.unreadCount(),
    });
  });

  it('закрывает WebSocket при размонтировании', () => {
    const queryClient = createQueryClient();

    const { unmount } = renderHook(
      () => {
        useNotificationsRealtime(true);
      },
      {
        wrapper: createWrapper(queryClient),
      },
    );

    const socket = sockets[0];

    if (!socket) {
      throw new Error('Realtime WebSocket не создан');
    }

    expect(socket.readyState).toBe(MockWebSocket.OPEN);

    unmount();

    expect(socket.readyState).toBe(3);
  });
});
