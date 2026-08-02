import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { BoardId, ColumnId, TaskId } from '../../../shared/model/entity-ids';
import type { CreateTaskInput, UpdateTaskInput } from '../../task/model/types';

import type { AppState } from './app-state';
import { APP_SCHEMA_VERSION } from './app-state';
import { safeParseAppState } from './board-schema';
import {
  BOARD_STORAGE_KEY,
  migratePersistedBoardState,
  selectPersistedBoardState,
} from './board-storage';
import { createDemoAppState } from './demo-board';
import type { TaskIdsByColumn } from './task-order';

type BoardActions = {
  addTask: (columnId: ColumnId, input: CreateTaskInput) => void;

  updateTask: (taskId: TaskId, input: UpdateTaskInput) => void;

  deleteTask: (taskId: TaskId) => void;

  replaceTaskOrder: (taskIdsByColumn: TaskIdsByColumn) => void;

  resetBoard: () => void;
};

export type BoardStore = AppState & BoardActions;

function findTaskColumnId(state: AppState, taskId: TaskId): ColumnId | null {
  for (const column of Object.values(state.columns)) {
    if (column.taskIds.includes(taskId)) {
      return column.id;
    }
  }

  return null;
}

function updateBoardTimestamp(
  boards: AppState['boards'],
  boardId: BoardId,
  updatedAt: string,
): AppState['boards'] {
  const board = boards[boardId];

  if (!board) {
    return boards;
  }

  return {
    ...boards,

    [boardId]: {
      ...board,
      updatedAt,
    },
  };
}

export const useBoardStore = create<BoardStore>()(
  persist<BoardStore, [], [], AppState>(
    (set) => ({
      ...createDemoAppState(),

      addTask: (columnId, input) => {
        set((state) => {
          const column = state.columns[columnId];

          if (!column) {
            return state;
          }

          const now = new Date().toISOString();

          const taskId = crypto.randomUUID();

          return {
            tasks: {
              ...state.tasks,

              [taskId]: {
                id: taskId,
                ...input,
                createdAt: now,
                updatedAt: now,
              },
            },

            columns: {
              ...state.columns,

              [columnId]: {
                ...column,
                taskIds: [...column.taskIds, taskId],
              },
            },

            boards: updateBoardTimestamp(state.boards, column.boardId, now),
          };
        });
      },

      updateTask: (taskId, input) => {
        set((state) => {
          const task = state.tasks[taskId];

          if (!task) {
            return state;
          }

          const now = new Date().toISOString();

          const columnId = findTaskColumnId(state, taskId);

          const column = columnId ? state.columns[columnId] : undefined;

          return {
            tasks: {
              ...state.tasks,

              [taskId]: {
                ...task,
                ...input,
                updatedAt: now,
              },
            },

            boards: column ? updateBoardTimestamp(state.boards, column.boardId, now) : state.boards,
          };
        });
      },

      deleteTask: (taskId) => {
        set((state) => {
          const task = state.tasks[taskId];

          if (!task) {
            return state;
          }

          const columnId = findTaskColumnId(state, taskId);

          if (!columnId) {
            return state;
          }

          const column = state.columns[columnId];

          if (!column) {
            return state;
          }

          const nextTasks = {
            ...state.tasks,
          };

          delete nextTasks[taskId];

          const now = new Date().toISOString();

          return {
            tasks: nextTasks,

            columns: {
              ...state.columns,

              [columnId]: {
                ...column,

                taskIds: column.taskIds.filter((currentTaskId) => currentTaskId !== taskId),
              },
            },

            boards: updateBoardTimestamp(state.boards, column.boardId, now),
          };
        });
      },

      replaceTaskOrder: (taskIdsByColumn) => {
        set((state) => {
          const nextColumns = {
            ...state.columns,
          };

          const affectedBoardIds = new Set<BoardId>();

          for (const [columnId, taskIds] of Object.entries(taskIdsByColumn)) {
            const column = state.columns[columnId];

            if (!column) {
              continue;
            }

            nextColumns[columnId] = {
              ...column,
              taskIds: [...taskIds],
            };

            affectedBoardIds.add(column.boardId);
          }

          if (affectedBoardIds.size === 0) {
            return state;
          }

          const now = new Date().toISOString();

          const nextBoards = {
            ...state.boards,
          };

          for (const boardId of affectedBoardIds) {
            const board = nextBoards[boardId];

            if (!board) {
              continue;
            }

            nextBoards[boardId] = {
              ...board,
              updatedAt: now,
            };
          }

          return {
            columns: nextColumns,
            boards: nextBoards,
          };
        });
      },

      resetBoard: () => {
        set(createDemoAppState());
      },
    }),

    {
      name: BOARD_STORAGE_KEY,

      version: APP_SCHEMA_VERSION,

      storage: createJSONStorage<AppState>(() => window.localStorage),

      partialize: selectPersistedBoardState,

      migrate: migratePersistedBoardState,

      merge: (persistedState, currentState) => {
        const parsedState = safeParseAppState(persistedState);

        if (!parsedState) {
          console.error('Persisted board state is invalid. Demo state will be used.');

          return currentState;
        }

        return {
          ...currentState,
          ...parsedState,
        };
      },

      onRehydrateStorage: () => {
        return (_state, error) => {
          if (error) {
            console.error('Failed to restore board state', error);
          }
        };
      },
    },
  ),
);
