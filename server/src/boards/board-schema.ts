import { z } from 'zod';

export const createBoardSchema = z.object({
  title: z.string().trim().min(1).max(100),
});

export const updateBoardSchema = z.object({
  title: z.string().trim().min(1).max(100),
});

export const boardParamsSchema = z.object({
  boardId: z.string().uuid(),
});

export const boardRoleSchema = z.enum(['OWNER', 'EDITOR', 'VIEWER']);

export const boardListItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  role: boardRoleSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const boardsResponseSchema = z.object({
  boards: z.array(boardListItemSchema),
});

export const columnResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  position: z.number().int(),
  isCompleted: z.boolean(),
  isArchive: z.boolean(),
});

export const subtaskResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  isCompleted: z.boolean(),
  position: z.number().int(),
});

export const commentResponseSchema = z.object({
  id: z.string().uuid(),
  text: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const taskHistoryActorSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
});

export const taskHistoryEventSchema = z.object({
  id: z.string().uuid(),
  type: z.string(),
  payload: z.unknown().nullable(),
  actor: taskHistoryActorSchema.nullable(),
  createdAt: z.string().datetime(),
});

export const taskResponseSchema = z.object({
  id: z.string().uuid(),
  columnId: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
  tags: z.array(z.string()),
  dueDate: z.string().nullable(),
  archivedAt: z.string().datetime().nullable(),
  position: z.number().int().nonnegative(),
  subtasks: z.array(subtaskResponseSchema),
  comments: z.array(commentResponseSchema),
  history: z.array(taskHistoryEventSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const boardSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  role: boardRoleSchema,
  columns: z.array(columnResponseSchema),
  tasks: z.array(taskResponseSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const boardResponseSchema = z.object({
  board: boardSchema,
});
