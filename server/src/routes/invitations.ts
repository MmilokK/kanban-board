import type { FastifyInstance } from 'fastify';

import { requireAuth } from '../auth/require-auth.js';
import { invitationTokenParamsSchema } from '../boards/board-invitation.schemas.js';
import {
  acceptBoardInvitation,
  getPublicBoardInvitationByToken,
} from '../boards/board-invitation.service.js';
import { publicBoardInvitationResponseSchema } from '../boards/board-invitation.schemas.js';
import type { ZodTypeProvider } from '@fastify/type-provider-zod';

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

      return {
        member,
      };
    },
  );
}
