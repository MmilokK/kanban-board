import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { boardQueryKeys } from './board-query-keys';
import { useBoardRealtime } from './use-board-realtime';

class MockWebSocket {
  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSING = 2;
  static readonly CLOSED = 3;

  static instances: MockWebSocket[] = [];

  readonly url: string;

  readyState = MockWebSocket.CONNECTING;

  send = vi.fn();
  close = vi.fn(() => {
    this.readyState = MockWebSocket.CLOSED;
  });

  private readonly listeners = new Map<string, Set<(event: Event | MessageEvent) => void>>();

  constructor(url: string | URL) {
    this.url = String(url);

    MockWebSocket.instances.push(this);
  }

  addEventListener(type: string, listener: (event: Event | MessageEvent) => void): void {
    let listeners = this.listeners.get(type);

    if (!listeners) {
      listeners = new Set();
      this.listeners.set(type, listeners);
    }

    listeners.add(listener);
  }

  removeEventListener(type: string, listener: (event: Event | MessageEvent) => void): void {
    this.listeners.get(type)?.delete(listener);
  }

  open(): void {
    this.readyState = MockWebSocket.OPEN;

    this.dispatch('open', new Event('open'));
  }

  receive(message: unknown): void {
    this.dispatch(
      'message',
      new MessageEvent('message', {
        data: JSON.stringify(message),
      }),
    );
  }

  disconnect(): void {
    this.readyState = MockWebSocket.CLOSED;

    this.dispatch('close', new Event('close'));
  }

  private dispatch(type: string, event: Event | MessageEvent): void {
    for (const listener of this.listeners.get(type) ?? []) {
      listener(event);
    }
  }
}

function RealtimeTestComponent({ boardId }: { boardId: string }) {
  useBoardRealtime(boardId);

  return null;
}

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: PropsWithChildren) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('Realtime доски', () => {
  beforeEach(() => {
    MockWebSocket.instances = [];

    vi.stubGlobal('WebSocket', MockWebSocket as unknown as typeof WebSocket);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('подписывается на доску после подключения', () => {
    const queryClient = new QueryClient();

    render(<RealtimeTestComponent boardId="board-1" />, {
      wrapper: createWrapper(queryClient),
    });

    expect(MockWebSocket.instances).toHaveLength(1);

    const socket = MockWebSocket.instances[0]!;

    expect(socket.url).toBe(
      `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/api/realtime`,
    );

    act(() => {
      socket.open();
    });

    expect(socket.send).toHaveBeenCalledWith(
      JSON.stringify({
        type: 'SUBSCRIBE_BOARD',
        boardId: 'board-1',
      }),
    );
  });

  it('инвалидирует данные доски после BOARD_CHANGED', () => {
    vi.useFakeTimers();

    const queryClient = new QueryClient();

    const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries');

    render(<RealtimeTestComponent boardId="board-1" />, {
      wrapper: createWrapper(queryClient),
    });

    const socket = MockWebSocket.instances[0]!;

    act(() => {
      socket.open();
    });

    invalidateQueries.mockClear();

    act(() => {
      socket.receive({
        type: 'BOARD_CHANGED',
        boardId: 'board-1',
      });
    });

    expect(invalidateQueries).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: boardQueryKeys.detail('board-1'),
    });

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: boardQueryKeys.lists(),
    });
  });

  it('схлопывает несколько BOARD_CHANGED в одну инвалидацию', () => {
    vi.useFakeTimers();

    const queryClient = new QueryClient();

    const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries');

    render(<RealtimeTestComponent boardId="board-1" />, {
      wrapper: createWrapper(queryClient),
    });

    const socket = MockWebSocket.instances[0]!;

    act(() => {
      socket.open();
    });

    invalidateQueries.mockClear();

    act(() => {
      socket.receive({
        type: 'BOARD_CHANGED',
        boardId: 'board-1',
      });

      socket.receive({
        type: 'BOARD_CHANGED',
        boardId: 'board-1',
      });

      socket.receive({
        type: 'BOARD_CHANGED',
        boardId: 'board-1',
      });
    });

    expect(invalidateQueries).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(49);
    });

    expect(invalidateQueries).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(invalidateQueries).toHaveBeenCalledTimes(2);

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: boardQueryKeys.detail('board-1'),
    });

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: boardQueryKeys.lists(),
    });
  });

  it('игнорирует BOARD_CHANGED другой доски', () => {
    const queryClient = new QueryClient();

    const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries');

    render(<RealtimeTestComponent boardId="board-1" />, {
      wrapper: createWrapper(queryClient),
    });

    const socket = MockWebSocket.instances[0]!;

    act(() => {
      socket.open();
    });

    invalidateQueries.mockClear();

    act(() => {
      socket.receive({
        type: 'BOARD_CHANGED',
        boardId: 'board-2',
      });
    });

    expect(invalidateQueries).not.toHaveBeenCalled();
  });

  it('отписывается от старой доски при смене boardId', () => {
    const queryClient = new QueryClient();

    const { rerender } = render(<RealtimeTestComponent boardId="board-1" />, {
      wrapper: createWrapper(queryClient),
    });

    const firstSocket = MockWebSocket.instances[0]!;

    act(() => {
      firstSocket.open();
    });

    firstSocket.send.mockClear();

    rerender(<RealtimeTestComponent boardId="board-2" />);

    expect(firstSocket.send).toHaveBeenCalledWith(
      JSON.stringify({
        type: 'UNSUBSCRIBE_BOARD',
        boardId: 'board-1',
      }),
    );

    expect(firstSocket.close).toHaveBeenCalledTimes(1);

    expect(MockWebSocket.instances).toHaveLength(2);

    const secondSocket = MockWebSocket.instances[1]!;

    act(() => {
      secondSocket.open();
    });

    expect(secondSocket.send).toHaveBeenCalledWith(
      JSON.stringify({
        type: 'SUBSCRIBE_BOARD',
        boardId: 'board-2',
      }),
    );
  });

  it('переподключается после разрыва соединения и обновляет данные доски', () => {
    vi.useFakeTimers();

    const queryClient = new QueryClient();

    const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries');

    render(<RealtimeTestComponent boardId="board-1" />, {
      wrapper: createWrapper(queryClient),
    });

    const firstSocket = MockWebSocket.instances[0]!;

    act(() => {
      firstSocket.open();
    });

    invalidateQueries.mockClear();

    act(() => {
      firstSocket.disconnect();
    });

    expect(MockWebSocket.instances).toHaveLength(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(MockWebSocket.instances).toHaveLength(2);

    const secondSocket = MockWebSocket.instances[1]!;

    act(() => {
      secondSocket.open();
    });

    expect(secondSocket.send).toHaveBeenCalledWith(
      JSON.stringify({
        type: 'SUBSCRIBE_BOARD',
        boardId: 'board-1',
      }),
    );

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: boardQueryKeys.detail('board-1'),
    });

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: boardQueryKeys.lists(),
    });
  });

  it('закрывает соединение при размонтировании', () => {
    const queryClient = new QueryClient();

    const { unmount } = render(<RealtimeTestComponent boardId="board-1" />, {
      wrapper: createWrapper(queryClient),
    });

    const socket = MockWebSocket.instances[0]!;

    act(() => {
      socket.open();
    });

    socket.send.mockClear();

    unmount();

    expect(socket.send).toHaveBeenCalledWith(
      JSON.stringify({
        type: 'UNSUBSCRIBE_BOARD',
        boardId: 'board-1',
      }),
    );

    expect(socket.close).toHaveBeenCalledTimes(1);
  });
});
