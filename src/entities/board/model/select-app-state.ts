import type { AppState } from './app-state';
import type { BoardStore } from './board-store';

export function selectAppState(state: BoardStore): AppState {
  return {
    boards: state.boards,
    boardOrder: state.boardOrder,
    activeBoardId: state.activeBoardId,
    columns: state.columns,
    tasks: state.tasks,
    schemaVersion: state.schemaVersion,
  };
}
