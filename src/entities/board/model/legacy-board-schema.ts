import { z } from 'zod';

export const LEGACY_COLUMN_IDS = ['backlog', 'todo', 'in-progress', 'done'] as const;

export type LegacyColumnId = (typeof LEGACY_COLUMN_IDS)[number];

const legacyColumnIdSchema = z.enum(LEGACY_COLUMN_IDS);

const legacyTaskIdSchema = z.string().min(1);

export const legacyTaskSchema = z.object({
  id: legacyTaskIdSchema,
  title: z.string(),
  description: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
  tags: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const legacyColumnSchema = z.object({
  id: legacyColumnIdSchema,
  title: z.string(),
  taskIds: z.array(legacyTaskIdSchema),
});

export const legacyBoardStateSchema = z
  .object({
    tasks: z.record(legacyTaskIdSchema, legacyTaskSchema),

    columns: z.record(legacyColumnIdSchema, legacyColumnSchema),

    columnOrder: z.array(legacyColumnIdSchema),

    schemaVersion: z.literal(1),
  })
  .superRefine((state, context) => {
    const orderedColumnIds = new Set<LegacyColumnId>();

    const referencedTaskIds = new Set<string>();

    /*
     * Проверяем columnOrder:
     *
     * - колонка существует;
     * - колонка не повторяется;
     * - каждая колонка присутствует в порядке.
     */
    for (const columnId of state.columnOrder) {
      if (orderedColumnIds.has(columnId)) {
        context.addIssue({
          code: 'custom',
          path: ['columnOrder'],
          message: `Column "${columnId}" appears more than once in columnOrder`,
        });
      }

      orderedColumnIds.add(columnId);

      if (!state.columns[columnId]) {
        context.addIssue({
          code: 'custom',
          path: ['columnOrder'],
          message: `Column "${columnId}" does not exist`,
        });
      }
    }

    for (const columnId of LEGACY_COLUMN_IDS) {
      if (!orderedColumnIds.has(columnId)) {
        context.addIssue({
          code: 'custom',
          path: ['columnOrder'],
          message: `Column "${columnId}" is missing from columnOrder`,
        });
      }
    }

    /*
     * Проверяем колонки и ссылки на задачи:
     *
     * - ключ Record совпадает с column.id;
     * - задача существует;
     * - задача не повторяется внутри колонки;
     * - задача не принадлежит нескольким колонкам.
     */
    for (const [columnKey, column] of Object.entries(state.columns)) {
      if (column.id !== columnKey) {
        context.addIssue({
          code: 'custom',
          path: ['columns', columnKey, 'id'],
          message: 'Column ID does not match its record key',
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

    /*
     * Проверяем объект tasks:
     *
     * - ключ Record совпадает с task.id;
     * - каждая задача находится в одной из колонок.
     */
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

export type LegacyTask = z.infer<typeof legacyTaskSchema>;

export type LegacyColumn = z.infer<typeof legacyColumnSchema>;

export type LegacyBoardState = z.infer<typeof legacyBoardStateSchema>;

export function parseLegacyBoardState(value: unknown): LegacyBoardState {
  return legacyBoardStateSchema.parse(value);
}

export function safeParseLegacyBoardState(value: unknown): LegacyBoardState | null {
  const result = legacyBoardStateSchema.safeParse(value);

  return result.success ? result.data : null;
}
