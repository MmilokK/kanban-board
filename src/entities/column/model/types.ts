import type { BoardId, ColumnId, TaskId } from '../../../shared/model/entity-ids';

export type Column = {
  id: ColumnId;
  boardId: BoardId;
  title: string;
  taskIds: TaskId[];
  isCompleted: boolean;
};
