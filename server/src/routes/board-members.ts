import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from '@fastify/type-provider-zod';
import { requireAuth } from '../auth/require-auth.js';
import {
  getBoardMembers,
  removeBoardMember,
  updateBoardMemberRole,
} from '../boards/board-member-service.js';
import {
  boardMemberParamsSchema,
  boardMemberResponseSchema,
  boardMembersResponseSchema,
  boardMemberUserParamsSchema,
  updateBoardMemberSchema,
} from '../boards/board-member-schema.js';
import { apiErrorSchema } from '../schemas/api-response-schema.js';
import z from 'zod';

export async function registerBoardMemberRoutes(app: FastifyInstance): Promise<void> {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  typedApp.get(
    '/:boardId/members',
    {
      schema: {
        tags: ['Board members'],
        summary: 'Получить участников доски',
        security: [{ sessionCookie: [] }],
        params: boardMemberParamsSchema,
        response: {
          200: boardMembersResponseSchema,
          401: apiErrorSchema,
          404: apiErrorSchema,
        },
      },
    },

    async (request) => {
      const user = await requireAuth(request);
      const members = await getBoardMembers(user.id, request.params.boardId);

      return { members };
    },
  );

  typedApp.patch(
    '/:boardId/members/:userId',
    {
      schema: {
        tags: ['Board members'],
        summary: 'Изменить роль участника доски',
        security: [{ sessionCookie: [] }],
        params: boardMemberUserParamsSchema,
        body: updateBoardMemberSchema,
        response: {
          200: boardMemberResponseSchema,
          400: apiErrorSchema,
          401: apiErrorSchema,
          403: apiErrorSchema,
          404: apiErrorSchema,
        },
      },
    },

    async (request) => {
      const user = await requireAuth(request);
      const member = await updateBoardMemberRole(
        user.id,
        request.params.boardId,
        request.params.userId,
        request.body.role,
      );

      return { member };
    },
  );

  typedApp.delete(
    '/:boardId/members/:userId',
    {
      schema: {
        tags: ['Board members'],
        summary: 'Удалить участника доски',
        security: [{ sessionCookie: [] }],
        params: boardMemberUserParamsSchema,
        response: {
          204: z.undefined(),
          400: apiErrorSchema,
          401: apiErrorSchema,
          403: apiErrorSchema,
          404: apiErrorSchema,
        },
      },
    },

    async (request, reply) => {
      const user = await requireAuth(request);

      await removeBoardMember(user.id, request.params.boardId, request.params.userId);

      return reply.status(204).send();
    },
  );
}
