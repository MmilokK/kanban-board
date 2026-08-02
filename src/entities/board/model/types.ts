import type { BoardId, ColumnId } from '../../../shared/model/entity-ids';

export type Board = {
  id: BoardId;
  title: string;
  columnIds: ColumnId[];
  createdAt: string;
  updatedAt: string;
};
