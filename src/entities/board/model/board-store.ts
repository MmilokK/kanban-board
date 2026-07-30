import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ColumnId } from '../../column/model/types';
import type { CreateTaskInput, TaskId, UpdateTaskInput } from '../../task/model/types';

import {
  BOARD_STORAGE_KEY,
  migratePersistedBoardState,
  removePersistedBoardState,
  selectPersistedBoardState,
} from './board-storage';
import { createDemoBoardState } from './demo-board';
import { parseBoardState } from './board-schema';
import type { TaskIdsByColumn } from './task-order';
import { BOARD_SCHEMA_VERSION, type BoardState } from './types';

type BoardActions = {
  addTask: (input: CreateTaskInput, columnId?: ColumnId) => TaskId;

  updateTask: (taskId: TaskId, changes: UpdateTaskInput) => void;

  deleteTask: (taskId: TaskId) => void;

  replaceTaskOrder: (taskIdsByColumn: TaskIdsByColumn) => void;

  resetBoard: () => void;
};

export type BoardStore = BoardState & BoardActions;

export const useBoardStore = create<BoardStore>()(
  persist<BoardStore, [], [], BoardState>(
    (set) => ({
      ...createDemoBoardState(),

      addTask: (input, columnId = 'backlog') => {
        const taskId = crypto.randomUUID();
        const timestamp = new Date().toISOString();

        set((state) => {
          const column = state.columns[columnId];

          return {
            tasks: {
              ...state.tasks,

              [taskId]: {
                ...input,
                id: taskId,
                createdAt: timestamp,
                updatedAt: timestamp,
              },
            },

            columns: {
              ...state.columns,

              [columnId]: {
                ...column,
                taskIds: [...column.taskIds, taskId],
              },
            },
          };
        });

        return taskId;
      },

      updateTask: (taskId, changes) => {
        const timestamp = new Date().toISOString();

        set((state) => {
          const task = state.tasks[taskId];

          if (!task) {
            return state;
          }

          return {
            tasks: {
              ...state.tasks,

              [taskId]: {
                ...task,
                ...changes,
                updatedAt: timestamp,
              },
            },
          };
        });
      },

      deleteTask: (taskId) => {
        set((state) => {
          if (!state.tasks[taskId]) {
            return state;
          }

          const nextTasks = {
            ...state.tasks,
          };

          delete nextTasks[taskId];

          const nextColumns = {
            ...state.columns,
          };

          state.columnOrder.forEach((columnId) => {
            const column = state.columns[columnId];

            nextColumns[columnId] = {
              ...column,
              taskIds: column.taskIds.filter((currentTaskId) => currentTaskId !== taskId),
            };
          });

          return {
            tasks: nextTasks,
            columns: nextColumns,
          };
        });
      },

      replaceTaskOrder: (taskIdsByColumn) => {
        set((state) => {
          const nextColumns = {
            ...state.columns,
          };

          state.columnOrder.forEach((columnId) => {
            nextColumns[columnId] = {
              ...state.columns[columnId],
              taskIds: [...taskIdsByColumn[columnId]],
            };
          });

          return {
            columns: nextColumns,
          };
        });
      },

      resetBoard: () => {
        set(createDemoBoardState());
      },
    }),

    {
      name: BOARD_STORAGE_KEY,

      version: BOARD_SCHEMA_VERSION,

      storage: createJSONStorage<BoardState>(() => window.localStorage),

      partialize: selectPersistedBoardState,

      migrate: (persistedState, persistedVersion) =>
        migratePersistedBoardState(persistedState, persistedVersion),

      merge: (persistedState, currentState) => {
        const parsedState = parseBoardState(persistedState);

        if (!parsedState) {
          if (persistedState !== undefined) {
            removePersistedBoardState();
          }

          return currentState;
        }

        return {
          ...currentState,
          ...parsedState,
        };
      },

      onRehydrateStorage: () => (_state, error) => {
        if (error) {
          removePersistedBoardState();
        }
      },
    },
  ),
);
