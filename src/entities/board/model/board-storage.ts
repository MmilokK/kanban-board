import type { AppState } from './app-state';
import { legacyBoardStateSchema } from './legacy-board-schema';
import { migrateLegacyBoardState } from './board-migration';
import { appStateSchema, parseAppState } from './board-schema';

export const BOARD_STORAGE_KEY = 'kanban-board-storage';

export function selectPersistedBoardState(state: AppState): AppState {
  return {
    boards: state.boards,
    boardOrder: state.boardOrder,
    activeBoardId: state.activeBoardId,
    columns: state.columns,
    tasks: state.tasks,
    schemaVersion: state.schemaVersion,
  };
}

export function migratePersistedBoardState(
  persistedState: unknown,
  persistedVersion: number,
): AppState {
  const currentResult = appStateSchema.safeParse(persistedState);

  if (currentResult.success) {
    return currentResult.data;
  }

  if (persistedVersion === 0 || persistedVersion === 1) {
    const legacyResult = legacyBoardStateSchema.safeParse(persistedState);

    if (legacyResult.success) {
      return migrateLegacyBoardState(legacyResult.data);
    }
  }

  throw new Error(`Unsupported persisted board state version: ${persistedVersion}`);
}

export function parsePersistedBoardState(value: unknown): AppState {
  return parseAppState(value);
}

export function removePersistedBoardState(): void {
  window.localStorage.removeItem(BOARD_STORAGE_KEY);
}
