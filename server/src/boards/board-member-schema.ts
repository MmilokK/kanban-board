import { z } from 'zod';

export const boardMemberRoleSchema = z.enum(['OWNER', 'EDITOR', 'VIEWER']);

export const editableBoardMemberRoleSchema = z.enum(['EDITOR', 'VIEWER']);

export const boardMemberParamsSchema = z.object({
  boardId: z.string().uuid(),
});

export const boardMemberUserParamsSchema = z.object({
  boardId: z.string().uuid(),
  userId: z.string().uuid(),
});

export const updateBoardMemberSchema = z.object({
  role: editableBoardMemberRoleSchema,
});

export const boardMemberSchema = z.object({
  id: z.string().uuid(),

  user: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    name: z.string().nullable(),
  }),

  role: boardMemberRoleSchema,

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const boardMembersResponseSchema = z.object({
  members: z.array(boardMemberSchema),
});

export const boardMemberResponseSchema = z.object({
  member: boardMemberSchema,
});

export type BoardMemberResponse = z.infer<typeof boardMemberSchema>;

export type UpdateBoardMemberInput = z.infer<typeof updateBoardMemberSchema>;
