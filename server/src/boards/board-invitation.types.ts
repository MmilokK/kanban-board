import type { z } from 'zod';
import type {
  boardInvitationRoleSchema,
  createEmailBoardInvitationBodySchema,
  createLinkBoardInvitationBodySchema,
} from './board-invitation.schemas.js';

export type BoardInvitationRole = z.infer<typeof boardInvitationRoleSchema>;

export type CreateEmailBoardInvitationInput = z.infer<typeof createEmailBoardInvitationBodySchema>;

export type CreateLinkBoardInvitationInput = z.infer<typeof createLinkBoardInvitationBodySchema>;
