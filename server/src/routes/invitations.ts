import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from '@fastify/type-provider-zod';
import { requireAuth } from '../auth/require-auth.js';
import {
  invitationTokenParamsSchema,
  publicBoardInvitationResponseSchema,
} from '../boards/board-invitation.schemas.js';
import {
  acceptBoardInvitation,
  getPublicBoardInvitationByToken,
} from '../boards/board-invitation.service.js';
import { publishBoardChanged, publishNotificationsChanged } from '../realtime/realtime-hub.js';

export async function registerInvitationRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  typedApp.get(
    '/:token',
    {
      schema: {
        params: invitationTokenParamsSchema,
        response: {
          200: publicBoardInvitationResponseSchema,
        },
      },
    },
    async (request) => {
      const { token } = request.params;
      const invitation = await getPublicBoardInvitationByToken(token);

      return {
        invitation,
      };
    },
  );

  typedApp.post(
    '/:token/accept',
    {
      schema: {
        params: invitationTokenParamsSchema,
      },
    },
    async (request) => {
      const { token } = request.params;
      const user = await requireAuth(request);
      const member = await acceptBoardInvitation(user.id, token);

      publishBoardChanged(member.boardId);
      publishNotificationsChanged(user.id);

      return {
        member,
      };
    },
  );
}
