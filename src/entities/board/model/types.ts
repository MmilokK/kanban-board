import type { BoardId, ColumnId } from '../../../shared/model/entity-ids';
import type { BoardRole } from '../../board-member/model/board-member';

export type Board = {
  id: BoardId;
  title: string;
  role: BoardRole;
  columnIds: ColumnId[];
  createdAt: string;
  updatedAt: string;
};
