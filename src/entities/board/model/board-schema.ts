import { z } from 'zod';

import type { AppState } from './app-state';
import { APP_SCHEMA_VERSION } from './app-state';

const entityIdSchema = z.string().trim().min(1);

export const taskSchema = z.object({
  id: entityIdSchema,
  title: z.string(),
  description: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
  tags: z.array(z.string()),
  dueDate: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  archivedAt: z.string().datetime().nullable(),
});

export const columnSchema = z.object({
  id: entityIdSchema,
  boardId: entityIdSchema,
  title: z.string().trim().min(1),
  taskIds: z.array(entityIdSchema),
  isCompleted: z.boolean(),
  isArchive: z.boolean(),
});

export const boardSchema = z.object({
  id: entityIdSchema,
  title: z.string().trim().min(1),
  columnIds: z.array(entityIdSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const appStateSchema = z
  .object({
    boards: z.record(entityIdSchema, boardSchema),
    boardOrder: z.array(entityIdSchema),
    activeBoardId: entityIdSchema.nullable(),
    columns: z.record(entityIdSchema, columnSchema),
    tasks: z.record(entityIdSchema, taskSchema),
    schemaVersion: z.literal(APP_SCHEMA_VERSION),
  })
  .superRefine((state, context) => {
    const boardIds = Object.keys(state.boards);
    const orderedBoardIds = new Set<string>();

    for (const boardId of state.boardOrder) {
      if (orderedBoardIds.has(boardId)) {
        context.addIssue({
          code: 'custom',
          path: ['boardOrder'],
          message: `Board "${boardId}" appears more than once`,
        });
      }

      orderedBoardIds.add(boardId);

      if (!state.boards[boardId]) {
        context.addIssue({
          code: 'custom',
          path: ['boardOrder'],
          message: `Board "${boardId}" does not exist`,
        });
      }
    }

    for (const [boardKey, board] of Object.entries(state.boards)) {
      if (board.id !== boardKey) {
        context.addIssue({
          code: 'custom',
          path: ['boards', boardKey, 'id'],
          message: 'Board ID does not match its record key',
        });
      }

      if (!orderedBoardIds.has(boardKey)) {
        context.addIssue({
          code: 'custom',
          path: ['boards', boardKey],
          message: `Board "${boardKey}" is missing from boardOrder`,
        });
      }
    }

    if (boardIds.length === 0) {
      if (state.activeBoardId !== null) {
        context.addIssue({
          code: 'custom',
          path: ['activeBoardId'],
          message: 'activeBoardId must be null when there are no boards',
        });
      }
    } else if (state.activeBoardId === null || !state.boards[state.activeBoardId]) {
      context.addIssue({
        code: 'custom',
        path: ['activeBoardId'],
        message: 'activeBoardId must reference an existing board',
      });
    }

    const referencedColumnIds = new Set<string>();
    const referencedTaskIds = new Set<string>();

    for (const [boardId, board] of Object.entries(state.boards)) {
      const boardColumnIds = new Set<string>();

      for (const columnId of board.columnIds) {
        if (boardColumnIds.has(columnId)) {
          context.addIssue({
            code: 'custom',
            path: ['boards', boardId, 'columnIds'],
            message: `Column "${columnId}" appears more than once`,
          });
        }

        boardColumnIds.add(columnId);

        if (referencedColumnIds.has(columnId)) {
          context.addIssue({
            code: 'custom',
            path: ['boards', boardId, 'columnIds'],
            message: `Column "${columnId}" belongs to more than one board`,
          });
        }

        referencedColumnIds.add(columnId);

        const column = state.columns[columnId];

        if (!column) {
          context.addIssue({
            code: 'custom',
            path: ['boards', boardId, 'columnIds'],
            message: `Column "${columnId}" does not exist`,
          });

          continue;
        }

        if (column.boardId !== boardId) {
          context.addIssue({
            code: 'custom',
            path: ['columns', columnId, 'boardId'],
            message: 'Column boardId does not match its parent board',
          });
        }
      }
    }

    for (const [columnKey, column] of Object.entries(state.columns)) {
      if (column.id !== columnKey) {
        context.addIssue({
          code: 'custom',
          path: ['columns', columnKey, 'id'],
          message: 'Column ID does not match its record key',
        });
      }

      if (!referencedColumnIds.has(columnKey)) {
        context.addIssue({
          code: 'custom',
          path: ['columns', columnKey],
          message: `Column "${columnKey}" is not assigned to a board`,
        });
      }

      const columnTaskIds = new Set<string>();

      for (const taskId of column.taskIds) {
        if (columnTaskIds.has(taskId)) {
          context.addIssue({
            code: 'custom',
            path: ['columns', columnKey, 'taskIds'],
            message: `Task "${taskId}" appears more than once in the column`,
          });
        }

        columnTaskIds.add(taskId);

        if (!state.tasks[taskId]) {
          context.addIssue({
            code: 'custom',
            path: ['columns', columnKey, 'taskIds'],
            message: `Task "${taskId}" does not exist`,
          });

          continue;
        }

        if (referencedTaskIds.has(taskId)) {
          context.addIssue({
            code: 'custom',
            path: ['columns', columnKey, 'taskIds'],
            message: `Task "${taskId}" belongs to more than one column`,
          });
        }

        referencedTaskIds.add(taskId);
      }
    }

    for (const [taskKey, task] of Object.entries(state.tasks)) {
      if (task.id !== taskKey) {
        context.addIssue({
          code: 'custom',
          path: ['tasks', taskKey, 'id'],
          message: 'Task ID does not match its record key',
        });
      }

      if (!referencedTaskIds.has(taskKey)) {
        context.addIssue({
          code: 'custom',
          path: ['tasks', taskKey],
          message: `Task "${taskKey}" is not assigned to a column`,
        });
      }
    }
  });

export function parseAppState(value: unknown): AppState {
  return appStateSchema.parse(value);
}

export function safeParseAppState(value: unknown): AppState | null {
  const result = appStateSchema.safeParse(value);

  return result.success ? result.data : null;
}
