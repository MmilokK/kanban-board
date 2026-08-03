import type { AppState } from './app-state';
import { APP_SCHEMA_VERSION } from './app-state';
import { createBoardBundle } from './board-factory';
import { DEFAULT_BOARD_ID, DEFAULT_BOARD_TITLE, DEFAULT_COLUMN_IDS } from './default-board';

export function createInitialAppState(): AppState {
  const now = new Date().toISOString();

  const { board, columns } = createBoardBundle({
    boardId: DEFAULT_BOARD_ID,
    title: DEFAULT_BOARD_TITLE,
    columnIds: DEFAULT_COLUMN_IDS,
    createdAt: now,
  });

  return {
    boards: {
      [board.id]: board,
    },

    boardOrder: [board.id],

    activeBoardId: board.id,

    columns,

    tasks: {},

    schemaVersion: APP_SCHEMA_VERSION,
  };
}
