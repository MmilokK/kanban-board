import type { TaskId } from '../../task/model/types';

export const COLUMN_IDS = ['backlog', 'todo', 'in-progress', 'done'] as const;

export type ColumnId = (typeof COLUMN_IDS)[number];

export type Column = {
  id: ColumnId;
  title: string;
  taskIds: TaskId[];
};
