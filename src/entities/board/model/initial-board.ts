import type { AppState } from './app-state';
import { APP_SCHEMA_VERSION } from './app-state';
import { DEFAULT_BOARD_ID, DEFAULT_BOARD_TITLE, DEFAULT_COLUMN_IDS } from './default-board';

export function createInitialAppState(): AppState {
  const now = new Date().toISOString();

  return {
    boards: {
      [DEFAULT_BOARD_ID]: {
        id: DEFAULT_BOARD_ID,
        title: DEFAULT_BOARD_TITLE,
        columnIds: [
          DEFAULT_COLUMN_IDS.backlog,
          DEFAULT_COLUMN_IDS.todo,
          DEFAULT_COLUMN_IDS.inProgress,
          DEFAULT_COLUMN_IDS.done,
        ],
        createdAt: now,
        updatedAt: now,
      },
    },

    boardOrder: [DEFAULT_BOARD_ID],

    activeBoardId: DEFAULT_BOARD_ID,

    columns: {
      [DEFAULT_COLUMN_IDS.backlog]: {
        id: DEFAULT_COLUMN_IDS.backlog,
        boardId: DEFAULT_BOARD_ID,
        title: 'Backlog',
        taskIds: [],
        isCompleted: false,
      },

      [DEFAULT_COLUMN_IDS.todo]: {
        id: DEFAULT_COLUMN_IDS.todo,
        boardId: DEFAULT_BOARD_ID,
        title: 'To do',
        taskIds: [],
        isCompleted: false,
      },

      [DEFAULT_COLUMN_IDS.inProgress]: {
        id: DEFAULT_COLUMN_IDS.inProgress,
        boardId: DEFAULT_BOARD_ID,
        title: 'In progress',
        taskIds: [],
        isCompleted: false,
      },

      [DEFAULT_COLUMN_IDS.done]: {
        id: DEFAULT_COLUMN_IDS.done,
        boardId: DEFAULT_BOARD_ID,
        title: 'Done',
        taskIds: [],
        isCompleted: true,
      },
    },

    tasks: {},

    schemaVersion: APP_SCHEMA_VERSION,
  };
}
