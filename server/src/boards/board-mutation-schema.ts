import { z } from 'zod';

export const boardContentParamsSchema = z.object({
  boardId: z.string().uuid(),
});

export const columnParamsSchema = z.object({
  boardId: z.string().uuid(),
  columnId: z.string().uuid(),
});

export const taskParamsSchema = z.object({
  boardId: z.string().uuid(),
  taskId: z.string().uuid(),
});

export const columnTaskParamsSchema = z.object({
  boardId: z.string().uuid(),
  columnId: z.string().uuid(),
});

export const subtaskParamsSchema = z.object({
  boardId: z.string().uuid(),
  taskId: z.string().uuid(),
  subtaskId: z.string().uuid(),
});

export const commentParamsSchema = z.object({
  boardId: z.string().uuid(),
  taskId: z.string().uuid(),
  commentId: z.string().uuid(),
});

export const createColumnSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Название колонки обязательно')
    .max(100, 'Название колонки слишком длинное'),
});

export const updateColumnSchema = createColumnSchema;

export const reorderColumnsSchema = z.object({
  columnIds: z.array(z.string().uuid()).min(1),
});

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, 'Название задачи обязательно').max(200),
  description: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
  tags: z.array(z.string()),
  dueDate: z.iso.date().nullable(),
});

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    description: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    tags: z.array(z.string()).optional(),
    dueDate: z.iso.date().nullable().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'Необходимо передать хотя бы одно изменение',
  });

export const reorderTasksSchema = z.object({
  columns: z
    .array(
      z.object({
        columnId: z.string().uuid(),
        taskIds: z.array(z.string().uuid()),
      }),
    )
    .min(1),
});

export const restoreTaskSchema = z.object({
  columnId: z.string().uuid(),
});

export const createSubtaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string(),
});

export const updateSubtaskSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    description: z.string().optional(),
    isCompleted: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'Необходимо передать хотя бы одно изменение',
  });

export const createCommentSchema = z.object({
  text: z.string().trim().min(1).max(5000),
});

export const updateCommentSchema = createCommentSchema;
