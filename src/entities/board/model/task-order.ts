import type { AppState } from './app-state';
import type { ColumnId, TaskId } from '../../../shared/model/entity-ids';

export type TaskIdsByColumn = Record<ColumnId, TaskId[]>;

export function selectTaskIdsByColumn(state: AppState): TaskIdsByColumn {
  return Object.fromEntries(
    Object.values(state.columns)
      .filter((column) => !column.isArchive)
      .map((column) => [column.id, column.taskIds]),
  );
}
