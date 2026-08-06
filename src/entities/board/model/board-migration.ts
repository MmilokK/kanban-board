import type { TaskId } from '../../../shared/model/entity-ids';
import type { Task } from '../../task/model/types';
import type { AppState } from './app-state';
import { APP_SCHEMA_VERSION } from './app-state';
import { DEFAULT_BOARD_ID, DEFAULT_BOARD_TITLE } from './default-board';
import type { LegacyBoardState } from './legacy-board-schema';

type TaskV2 = Omit<Task, 'dueDate'>;

export type AppStateV2 = Omit<AppState, 'tasks' | 'schemaVersion'> & {
  tasks: Record<TaskId, TaskV2>;
  schemaVersion: 2;
};

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

export function migrateBoardStateV1ToV2(legacyState: LegacyBoardState): AppStateV2 {
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

    schemaVersion: 2,
  };
}

export function migrateBoardStateV2ToV3(state: AppStateV2): AppState {
  const tasks = Object.fromEntries(
    Object.entries(state.tasks).map(([taskId, task]) => [
      taskId,
      {
        ...task,
        dueDate: null,
      },
    ]),
  ) as Record<TaskId, Task>;

  return {
    ...state,
    tasks,
    schemaVersion: APP_SCHEMA_VERSION,
  };
}
