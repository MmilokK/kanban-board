import { createDemoBoardState } from './demo-board';
import { parseBoardState } from './board-schema';
import { BOARD_SCHEMA_VERSION, type BoardState } from './types';

export const BOARD_STORAGE_KEY = 'kanban-board-storage';

export function selectPersistedBoardState(state: BoardState): BoardState {
  return {
    tasks: state.tasks,
    columns: state.columns,
    columnOrder: state.columnOrder,
    schemaVersion: state.schemaVersion,
  };
}

export function migratePersistedBoardState(
  persistedState: unknown,
  persistedVersion: number,
): BoardState {
  /*
   * Пока существует только версия 1.
   *
   * Когда появится версия 2, здесь можно будет
   * преобразовать состояние версии 1 в новый формат.
   */
  if (persistedVersion > BOARD_SCHEMA_VERSION) {
    return createDemoBoardState();
  }

  return parseBoardState(persistedState) ?? createDemoBoardState();
}

export function removePersistedBoardState(): void {
  try {
    window.localStorage.removeItem(BOARD_STORAGE_KEY);
  } catch {
    /*
     * Браузер может запретить доступ к localStorage.
     * Приложение продолжит работать без persistence.
     */
  }
}
