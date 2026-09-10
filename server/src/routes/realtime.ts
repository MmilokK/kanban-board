import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { WebSocket } from 'ws';

import { requireAuth } from '../auth/require-auth.js';
import type { AuthUser } from '../auth/auth-types.js';
import { requireBoardMember } from '../boards/board-access.js';
import { AppError } from '../errors/app-error.js';
import {
  registerRealtimeSocket,
  removeRealtimeSocket,
  subscribeToBoard,
  unsubscribeFromBoard,
} from '../realtime/realtime-hub.js';

type ClientMessage =
  | {
      type: 'SUBSCRIBE_BOARD';
      boardId: string;
    }
  | {
      type: 'UNSUBSCRIBE_BOARD';
      boardId: string;
    };

type ServerMessage =
  | {
      type: 'PONG';
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
      type: 'ERROR';
      code: string;
      message: string;
    };

const authenticatedUsers = new WeakMap<FastifyRequest, AuthUser>();

function sendMessage(socket: WebSocket, message: ServerMessage): void {
  socket.send(JSON.stringify(message));
}

function sendError(socket: WebSocket, error: unknown): void {
  if (error instanceof AppError) {
    sendMessage(socket, {
      type: 'ERROR',
      code: error.code,
      message: error.message,
    });

    return;
  }

  sendMessage(socket, {
    type: 'ERROR',
    code: 'REALTIME_ERROR',
    message: 'Не удалось обработать realtime-сообщение',
  });
}

function parseClientMessage(rawMessage: string): ClientMessage | null {
  let value: unknown;

  try {
    value = JSON.parse(rawMessage);
  } catch {
    return null;
  }

  if (
    typeof value !== 'object' ||
    value === null ||
    !('type' in value) ||
    typeof value.type !== 'string'
  ) {
    return null;
  }

  if (
    (value.type === 'SUBSCRIBE_BOARD' || value.type === 'UNSUBSCRIBE_BOARD') &&
    'boardId' in value &&
    typeof value.boardId === 'string' &&
    value.boardId.length > 0
  ) {
    return {
      type: value.type,
      boardId: value.boardId,
    };
  }

  return null;
}

async function handleClientMessage(
  socket: WebSocket,
  user: AuthUser,
  rawMessage: string,
): Promise<void> {
  if (rawMessage === 'ping') {
    sendMessage(socket, {
      type: 'PONG',
    });

    return;
  }

  const message = parseClientMessage(rawMessage);

  if (!message) {
    sendMessage(socket, {
      type: 'ERROR',
      code: 'INVALID_MESSAGE',
      message: 'Некорректное realtime-сообщение',
    });

    return;
  }

  if (message.type === 'SUBSCRIBE_BOARD') {
    await requireBoardMember(user.id, message.boardId);

    subscribeToBoard(socket, message.boardId);

    sendMessage(socket, {
      type: 'SUBSCRIBED_BOARD',
      boardId: message.boardId,
    });

    return;
  }

  unsubscribeFromBoard(socket, message.boardId);

  sendMessage(socket, {
    type: 'UNSUBSCRIBED_BOARD',
    boardId: message.boardId,
  });
}

export async function registerRealtimeRoutes(app: FastifyInstance): Promise<void> {
  app.get(
    '/',
    {
      websocket: true,
      preValidation: async (request) => {
        const user = await requireAuth(request);

        authenticatedUsers.set(request, user);
      },
    },
    (socket, request) => {
      const user = authenticatedUsers.get(request);

      if (!user) {
        socket.close(1011, 'Не удалось определить пользователя');
        return;
      }

      registerRealtimeSocket(socket, user.id);

      socket.on('message', (data) => {
        void handleClientMessage(socket, user, data.toString()).catch((error: unknown) => {
          sendError(socket, error);
        });
      });

      socket.on('close', () => {
        removeRealtimeSocket(socket);
      });
    },
  );
}
