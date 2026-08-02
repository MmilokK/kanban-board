import type { AppState } from './app-state';
import { APP_SCHEMA_VERSION } from './app-state';
import { DEFAULT_BOARD_ID, DEFAULT_BOARD_TITLE } from './default-board';
import type { LegacyBoardState } from './legacy-board-schema';

const FALLBACK_DATE = '1970-01-01T00:00:00.000Z';

function selectBoardDates(state: LegacyBoardState): {
  createdAt: string;
  updatedAt: string;
} {
  const tasks = Object.values(state.tasks);

  const createdDates = tasks.map((task) => task.createdAt).sort();

  const updatedDates = tasks.map((task) => task.updatedAt).sort();

  const createdAt = createdDates[0] ?? FALLBACK_DATE;

  const updatedAt = updatedDates[updatedDates.length - 1] ?? createdAt;

  return {
    createdAt,
    updatedAt,
  };
}

export function migrateBoardStateV1ToV2(legacyState: LegacyBoardState): AppState {
  const { createdAt, updatedAt } = selectBoardDates(legacyState);

  const columns = Object.fromEntries(
    Object.entries(legacyState.columns).map(([columnId, column]) => [
      columnId,
      {
        ...column,
        boardId: DEFAULT_BOARD_ID,
        isCompleted: columnId === 'done',
      },
    ]),
  );

  return {
    boards: {
      [DEFAULT_BOARD_ID]: {
        id: DEFAULT_BOARD_ID,
        title: DEFAULT_BOARD_TITLE,
        columnIds: [...legacyState.columnOrder],
        createdAt,
        updatedAt,
      },
    },

    boardOrder: [DEFAULT_BOARD_ID],

    activeBoardId: DEFAULT_BOARD_ID,

    columns,

    tasks: structuredClone(legacyState.tasks),

    schemaVersion: APP_SCHEMA_VERSION,
  };
}
