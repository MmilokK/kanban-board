import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from '@fastify/type-provider-zod';
import { z } from 'zod';
import { requireAuth } from '../auth/require-auth.js';
import { apiErrorSchema } from '../schemas/api-response-schema.js';
import {
  boardParamsSchema,
  boardResponseSchema,
  boardsResponseSchema,
  createBoardSchema,
  updateBoardSchema,
} from '../boards/board-schema.js';
import { importBoardSchema } from '../boards/import-board-schema.js';
import {
  createBoard,
  deleteBoard,
  getBoard,
  getBoards,
  importBoard,
  renameBoard,
} from '../boards/board-service.js';
import {
  requireBoardEditor,
  requireBoardMember,
  requireBoardOwner,
} from '../boards/board-access.js';
import { publishBoardChanged, unsubscribeAllFromBoard } from '../realtime/realtime-hub.js';

export async function registerBoardRoutes(app: FastifyInstance): Promise<void> {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  typedApp.get(
    '/',
    {
      schema: {
        tags: ['Boards'],
        summary: 'Получить доски пользователя',
        description: 'Возвращает cloud-доски, участником которых является текущий пользователь.',
        security: [{ sessionCookie: [] }],
        response: {
          200: boardsResponseSchema,
          401: apiErrorSchema,
        },
      },
    },
    async (request) => {
      const user = await requireAuth(request);
      const boards = await getBoards(user.id);

      return { boards };
    },
  );

  typedApp.post(
    '/',
    {
      schema: {
        tags: ['Boards'],
        summary: 'Создать cloud-доску',
        description:
          'Создаёт новую доску и автоматически назначает текущего пользователя владельцем.',
        security: [{ sessionCookie: [] }],
        body: createBoardSchema,
        response: {
          201: boardResponseSchema,
          400: apiErrorSchema,
          401: apiErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const user = await requireAuth(request);
      const board = await createBoard(user.id, request.body.title);

      return reply.status(201).send({ board });
    },
  );

  typedApp.post(
    '/import',
    {
      schema: {
        tags: ['Boards'],
        summary: 'Импортировать локальную доску',
        description:
          'Создаёт cloud-доску на основе локальной доски пользователя. Сервер создаёт новые идентификаторы сущностей и назначает текущего пользователя владельцем.',
        security: [{ sessionCookie: [] }],
        body: importBoardSchema,
        response: {
          201: boardResponseSchema,
          400: apiErrorSchema,
          401: apiErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const user = await requireAuth(request);
      const board = await importBoard(user.id, request.body);

      return reply.status(201).send({ board });
    },
  );

  typedApp.get(
    '/:boardId',
    {
      schema: {
        tags: ['Boards'],
        summary: 'Получить cloud-доску',
        description:
          'Возвращает доску вместе с колонками, задачами, подзадачами и комментариями, если текущий пользователь является её участником.',
        security: [{ sessionCookie: [] }],
        params: boardParamsSchema,
        response: {
          200: boardResponseSchema,
          401: apiErrorSchema,
          404: apiErrorSchema,
        },
      },
    },
    async (request) => {
      const user = await requireAuth(request);
      await requireBoardMember(user.id, request.params.boardId);
      const board = await getBoard(user.id, request.params.boardId);

      return { board };
    },
  );

  typedApp.patch(
    '/:boardId',
    {
      schema: {
        tags: ['Boards'],
        summary: 'Переименовать cloud-доску',
        description: 'Изменяет название доски. На текущем этапе действие доступно владельцу доски.',
        security: [{ sessionCookie: [] }],
        params: boardParamsSchema,
        body: updateBoardSchema,
        response: {
          200: boardResponseSchema,
          400: apiErrorSchema,
          401: apiErrorSchema,
          403: apiErrorSchema,
          404: apiErrorSchema,
        },
      },
    },
    async (request) => {
      const user = await requireAuth(request);
      await requireBoardEditor(user.id, request.params.boardId);
      const board = await renameBoard(user.id, request.params.boardId, request.body.title);

      publishBoardChanged(request.params.boardId);

      return { board };
    },
  );

  typedApp.delete(
    '/:boardId',
    {
      schema: {
        tags: ['Boards'],
        summary: 'Удалить cloud-доску',
        description:
          'Удаляет доску и связанные с ней данные. На текущем этапе действие доступно владельцу доски.',
        security: [{ sessionCookie: [] }],
        params: boardParamsSchema,
        response: {
          204: z.undefined(),
          401: apiErrorSchema,
          403: apiErrorSchema,
          404: apiErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const user = await requireAuth(request);
      await requireBoardOwner(user.id, request.params.boardId);
      await deleteBoard(user.id, request.params.boardId);

      publishBoardChanged(request.params.boardId);
      unsubscribeAllFromBoard(request.params.boardId);

      return reply.status(204).send();
    },
  );
}
