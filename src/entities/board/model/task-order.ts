import type { ColumnId } from '../../column/model/types';
import type { TaskId } from '../../task/model/types';

import type { BoardState } from './types';

export type TaskIdsByColumn = Record<ColumnId, TaskId[]>;

export function selectTaskIdsByColumn(
  state: Pick<BoardState, 'columns' | 'columnOrder'>,
): TaskIdsByColumn {
  return Object.fromEntries(
    state.columnOrder.map((columnId) => [columnId, [...state.columns[columnId].taskIds]]),
  ) as TaskIdsByColumn;
}
