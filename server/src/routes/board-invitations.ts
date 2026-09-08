import type { FastifyInstance } from 'fastify';
import {
  boardInvitationIdParamsSchema,
  boardInvitationParamsSchema,
  boardInvitationResponseSchema,
  boardInvitationsResponseSchema,
  createEmailBoardInvitationBodySchema,
  createLinkBoardInvitationBodySchema,
} from '../boards/board-invitation.schemas.js';
import {
  createEmailBoardInvitation,
  createLinkBoardInvitation,
  listBoardInvitations,
  revokeBoardInvitation,
} from '../boards/board-invitation.service.js';
import { requireAuth } from '../auth/require-auth.js';
import type { ZodTypeProvider } from '@fastify/type-provider-zod';

function serializeBoardInvitation(invitation: {
  id: string;
  boardId: string;
  invitedByUserId: string;
  type: 'EMAIL' | 'LINK';
  email: string | null;
  role: 'OWNER' | 'EDITOR' | 'VIEWER';
  token: string;
  expiresAt: Date;
  maxUses: number | null;
  usedCount: number;
  revokedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  if (invitation.role === 'OWNER') {
    throw new Error('Приглашение не может иметь роль OWNER');
  }

  return {
    id: invitation.id,
    boardId: invitation.boardId,
    invitedByUserId: invitation.invitedByUserId,
    type: invitation.type,
    email: invitation.email,
    role: invitation.role,
    token: invitation.token,
    expiresAt: invitation.expiresAt.toISOString(),
    maxUses: invitation.maxUses,
    usedCount: invitation.usedCount,
    revokedAt: invitation.revokedAt?.toISOString() ?? null,
    createdAt: invitation.createdAt.toISOString(),
    updatedAt: invitation.updatedAt.toISOString(),
  };
}

export async function boardInvitationRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();
  typedApp.post(
    '/:boardId/invitations/email',
    {
      preHandler: requireAuth,
      schema: {
        params: boardInvitationParamsSchema,
        body: createEmailBoardInvitationBodySchema,
        response: {
          200: boardInvitationResponseSchema,
        },
      },
    },
    async (request) => {
      const { boardId } = request.params;
      const user = await requireAuth(request);
      const invitation = await createEmailBoardInvitation(user.id, boardId, request.body);

      return {
        invitation: {
          ...invitation,
          expiresAt: invitation.expiresAt.toISOString(),
          revokedAt: invitation.revokedAt?.toISOString() ?? null,
          createdAt: invitation.createdAt.toISOString(),
          updatedAt: invitation.updatedAt.toISOString(),
        },
      };
    },
  );

  typedApp.post(
    '/:boardId/invitations/link',
    {
      preHandler: requireAuth,
      schema: {
        params: boardInvitationParamsSchema,
        body: createLinkBoardInvitationBodySchema,
        response: {
          200: boardInvitationResponseSchema,
        },
      },
    },
    async (request) => {
      const { boardId } = request.params;
      const user = await requireAuth(request);
      const invitation = await createLinkBoardInvitation(user.id, boardId, request.body);

      return { invitation: serializeBoardInvitation(invitation) };
    },
  );

  typedApp.get(
    '/:boardId/invitations',
    {
      preHandler: requireAuth,
      schema: {
        params: boardInvitationParamsSchema,
        response: {
          200: boardInvitationsResponseSchema,
        },
      },
    },
    async (request) => {
      const { boardId } = request.params;
      const user = await requireAuth(request);
      const invitations = await listBoardInvitations(user.id, boardId);

      return { invitations: invitations.map(serializeBoardInvitation) };
    },
  );

  typedApp.delete(
    '/:boardId/invitations/:invitationId',
    {
      preHandler: requireAuth,
      schema: {
        params: boardInvitationIdParamsSchema,
      },
    },
    async (request, reply) => {
      const { boardId, invitationId } = request.params;
      const user = await requireAuth(request);

      await revokeBoardInvitation(user.id, boardId, invitationId);

      reply.status(204);
      return;
    },
  );
}
