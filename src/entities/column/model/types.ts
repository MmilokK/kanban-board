import type { TaskId } from '../../task/model/types';

export type ColumnId = 'backlog' | 'todo' | 'in-progress' | 'done';

export type Column = {
  id: ColumnId;
  title: string;
  taskIds: TaskId[];
};
