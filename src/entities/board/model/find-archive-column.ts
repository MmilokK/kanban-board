import type { BoardId, ColumnId } from '../../../shared/model/entity-ids';

import type { Column } from '../../column/model/types';

export function findArchiveColumn(
  columns: Record<ColumnId, Column>,
  boardId: BoardId,
): Column | undefined {
  return Object.values(columns).find((column) => column.boardId === boardId && column.isArchive);
}
