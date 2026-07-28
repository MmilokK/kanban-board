import type { Column, ColumnId } from '../../column/model/types';
import type { Task, TaskId } from '../../task/model/types';

export type BoardState = {
  tasks: Record<TaskId, Task>;
  columns: Record<ColumnId, Column>;
  columnOrder: ColumnId[];
  schemaVersion: 1;
};
