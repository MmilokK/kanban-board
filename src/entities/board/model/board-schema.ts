import { z } from 'zod';

import { COLUMN_IDS } from '../../column/model/types';

import { BOARD_SCHEMA_VERSION, type BoardState } from './types';

const columnIdSchema = z.enum(COLUMN_IDS);

const taskPrioritySchema = z.enum(['low', 'medium', 'high']);

const taskSchema = z.object({
  id: z.string().min(1),

  title: z.string().trim().min(1).max(80),

  description: z.string().trim().max(500),

  priority: taskPrioritySchema,

  tags: z
    .array(z.string().trim().min(1).max(20))
    .max(5)
    .refine((tags) => new Set(tags).size === tags.length, 'Теги задачи должны быть уникальными'),

  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

const columnSchema = z.object({
  id: columnIdSchema,
  title: z.string().trim().min(1),
  taskIds: z.array(z.string().min(1)),
});

const columnsSchema = z.object({
  backlog: columnSchema.extend({
    id: z.literal('backlog'),
  }),

  todo: columnSchema.extend({
    id: z.literal('todo'),
  }),

  'in-progress': columnSchema.extend({
    id: z.literal('in-progress'),
  }),

  done: columnSchema.extend({
    id: z.literal('done'),
  }),
});

const columnOrderSchema = z
  .array(columnIdSchema)
  .length(COLUMN_IDS.length)
  .refine(
    (columnIds) => new Set(columnIds).size === COLUMN_IDS.length,
    'Колонки не должны повторяться',
  );

export const boardStateSchema = z
  .object({
    tasks: z.record(z.string().min(1), taskSchema),
    columns: columnsSchema,
    columnOrder: columnOrderSchema,
    schemaVersion: z.literal(BOARD_SCHEMA_VERSION),
  })
  .superRefine((board, context) => {
    const placedTaskIds = new Set<string>();

    for (const [taskKey, task] of Object.entries(board.tasks)) {
      if (taskKey !== task.id) {
        context.addIssue({
          code: 'custom',
          path: ['tasks', taskKey, 'id'],
          message: 'Ключ задачи должен совпадать с её id',
        });
      }
    }

    for (const columnId of board.columnOrder) {
      const column = board.columns[columnId];

      column.taskIds.forEach((taskId, index) => {
        if (!board.tasks[taskId]) {
          context.addIssue({
            code: 'custom',
            path: ['columns', columnId, 'taskIds', index],
            message: 'Колонка ссылается на несуществующую задачу',
          });

          return;
        }

        if (placedTaskIds.has(taskId)) {
          context.addIssue({
            code: 'custom',
            path: ['columns', columnId, 'taskIds', index],
            message: 'Задача не может находиться в нескольких колонках',
          });

          return;
        }

        placedTaskIds.add(taskId);
      });
    }

    for (const taskId of Object.keys(board.tasks)) {
      if (!placedTaskIds.has(taskId)) {
        context.addIssue({
          code: 'custom',
          path: ['tasks', taskId],
          message: 'Задача должна находиться в одной из колонок',
        });
      }
    }
  });

export function parseBoardState(value: unknown): BoardState | null {
  const result = boardStateSchema.safeParse(value);

  if (!result.success) {
    return null;
  }

  return result.data;
}
