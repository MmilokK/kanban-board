import { z } from 'zod';

const importedSubtaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string(),
  isCompleted: z.boolean(),
});

const importedCommentSchema = z.object({
  text: z.string().trim().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const importedTaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
  tags: z.array(z.string()),
  dueDate: z.string().nullable(),
  archivedAt: z.string().datetime().nullable(),
  subtasks: z.array(importedSubtaskSchema),
  comments: z.array(importedCommentSchema),
});

const importedColumnSchema = z.object({
  title: z.string().trim().min(1).max(100),
  isCompleted: z.boolean(),
  isArchive: z.boolean(),
  tasks: z.array(importedTaskSchema),
});

export const importBoardSchema = z
  .object({
    title: z.string().trim().min(1).max(100),
    columns: z.array(importedColumnSchema).min(1),
  })
  .superRefine((board, context) => {
    const archiveCount = board.columns.filter((column) => column.isArchive).length;

    if (archiveCount > 1) {
      context.addIssue({
        code: 'custom',
        message: 'Доска не может содержать больше одной архивной колонки',
        path: ['columns'],
      });
    }
  });
