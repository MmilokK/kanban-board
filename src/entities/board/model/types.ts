import type { Column, ColumnId } from '../../column/model/types';
import type { Task, TaskId } from '../../task/model/types';

export const BOARD_SCHEMA_VERSION = 1 as const;

export type BoardState = {
  tasks: Record<TaskId, Task>;
  columns: Record<ColumnId, Column>;
  columnOrder: ColumnId[];
  schemaVersion: typeof BOARD_SCHEMA_VERSION;
};
