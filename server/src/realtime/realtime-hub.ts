import type { WebSocket } from 'ws';

type BoardChangedMessage = {
  type: 'BOARD_CHANGED';
  boardId: string;
};

type NotificationsChangedMessage = {
  type: 'NOTIFICATIONS_CHANGED';
};

type RealtimeServerMessage = BoardChangedMessage | NotificationsChangedMessage;

const boardSubscribers = new Map<string, Set<WebSocket>>();
const socketSubscriptions = new Map<WebSocket, Set<string>>();
const socketUsers = new Map<WebSocket, string>();

function sendMessage(socket: WebSocket, message: RealtimeServerMessage): void {
  socket.send(JSON.stringify(message));
}

export function registerRealtimeSocket(socket: WebSocket, userId: string): void {
  socketUsers.set(socket, userId);
}

export function subscribeToBoard(socket: WebSocket, boardId: string): void {
  let subscribers = boardSubscribers.get(boardId);

  if (!subscribers) {
    subscribers = new Set<WebSocket>();
    boardSubscribers.set(boardId, subscribers);
  }

  subscribers.add(socket);

  let subscriptions = socketSubscriptions.get(socket);

  if (!subscriptions) {
    subscriptions = new Set<string>();
    socketSubscriptions.set(socket, subscriptions);
  }

  subscriptions.add(boardId);
}

export function unsubscribeFromBoard(socket: WebSocket, boardId: string): void {
  const subscribers = boardSubscribers.get(boardId);

  if (subscribers) {
    subscribers.delete(socket);

    if (subscribers.size === 0) {
      boardSubscribers.delete(boardId);
    }
  }

  const subscriptions = socketSubscriptions.get(socket);

  if (!subscriptions) {
    return;
  }

  subscriptions.delete(boardId);

  if (subscriptions.size === 0) {
    socketSubscriptions.delete(socket);
  }
}

export function unsubscribeUserFromBoard(userId: string, boardId: string): void {
  const subscribers = boardSubscribers.get(boardId);

  if (!subscribers) {
    return;
  }

  for (const socket of [...subscribers]) {
    if (socketUsers.get(socket) !== userId) {
      continue;
    }

    unsubscribeFromBoard(socket, boardId);
  }
}

export function unsubscribeAllFromBoard(boardId: string): void {
  const subscribers = boardSubscribers.get(boardId);

  if (!subscribers) {
    return;
  }

  for (const socket of [...subscribers]) {
    unsubscribeFromBoard(socket, boardId);
  }
}

export function removeRealtimeSocket(socket: WebSocket): void {
  const subscriptions = socketSubscriptions.get(socket);

  if (subscriptions) {
    for (const boardId of subscriptions) {
      const subscribers = boardSubscribers.get(boardId);

      if (!subscribers) {
        continue;
      }

      subscribers.delete(socket);

      if (subscribers.size === 0) {
        boardSubscribers.delete(boardId);
      }
    }

    socketSubscriptions.delete(socket);
  }

  socketUsers.delete(socket);
}

export function publishBoardChanged(boardId: string): void {
  const subscribers = boardSubscribers.get(boardId);

  if (!subscribers) {
    return;
  }

  const message: BoardChangedMessage = {
    type: 'BOARD_CHANGED',
    boardId,
  };

  for (const socket of subscribers) {
    if (socket.readyState !== socket.OPEN) {
      continue;
    }

    sendMessage(socket, message);
  }
}

export function publishNotificationsChanged(userId: string): void {
  const message: NotificationsChangedMessage = {
    type: 'NOTIFICATIONS_CHANGED',
  };

  for (const [socket, socketUserId] of socketUsers) {
    if (socketUserId !== userId) {
      continue;
    }

    if (socket.readyState !== socket.OPEN) {
      continue;
    }

    sendMessage(socket, message);
  }
}
