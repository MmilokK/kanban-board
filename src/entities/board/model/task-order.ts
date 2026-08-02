import type { AppState } from './app-state';
import type { ColumnId, TaskId } from '../../../shared/model/entity-ids';

export type TaskIdsByColumn = Record<ColumnId, TaskId[]>;

export function selectTaskIdsByColumn(
  state: Pick<AppState, 'activeBoardId' | 'boards' | 'columns'>,
): TaskIdsByColumn {
  if (!state.activeBoardId) {
    return {};
  }

  const board = state.boards[state.activeBoardId];

  if (!board) {
    return {};
  }

  return Object.fromEntries(
    board.columnIds.map((columnId) => [columnId, [...(state.columns[columnId]?.taskIds ?? [])]]),
  );
}
