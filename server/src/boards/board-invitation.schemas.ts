import { z } from 'zod';

export const boardInvitationRoleSchema = z.enum(['EDITOR', 'VIEWER']);

export const createEmailBoardInvitationBodySchema = z.object({
  email: z.string().email(),
  role: boardInvitationRoleSchema,
});

export const createLinkBoardInvitationBodySchema = z.object({
  role: boardInvitationRoleSchema,
  expiresInDays: z.number().int().min(1).max(30).default(7),
  maxUses: z.number().int().min(1).max(100).nullable().optional(),
});

export const boardInvitationParamsSchema = z.object({
  boardId: z.string().uuid(),
});

export const boardInvitationIdParamsSchema = z.object({
  boardId: z.string().uuid(),
  invitationId: z.string().uuid(),
});

export const invitationTokenParamsSchema = z.object({
  token: z.string().min(1),
});

export const boardInvitationSchema = z.object({
  id: z.string().uuid(),
  boardId: z.string().uuid(),
  invitedByUserId: z.string().uuid(),
  type: z.enum(['EMAIL', 'LINK']),
  email: z.string().email().nullable(),
  role: boardInvitationRoleSchema,
  token: z.string().min(1),
  expiresAt: z.string().datetime(),
  maxUses: z.number().int().nullable(),
  usedCount: z.number().int(),
  revokedAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const boardInvitationsResponseSchema = z.object({
  invitations: z.array(boardInvitationSchema),
});

export const boardInvitationResponseSchema = z.object({
  invitation: boardInvitationSchema,
});

export const publicBoardInvitationSchema = z.object({
  boardTitle: z.string(),
  role: boardInvitationRoleSchema,
  type: z.enum(['EMAIL', 'LINK']),
  expiresAt: z.string().datetime(),
  isExpired: z.boolean(),
  isRevoked: z.boolean(),
  isExhausted: z.boolean(),
  requiresAuthentication: z.literal(true),
});

export const publicBoardInvitationResponseSchema = z.object({
  invitation: publicBoardInvitationSchema,
});
