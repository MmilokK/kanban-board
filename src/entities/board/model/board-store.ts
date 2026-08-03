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
import { createBoardBundle } from './board-factory';

type BoardActions = {
  createBoard: (title: string) => BoardId | null;

  setActiveBoard: (boardId: BoardId) => void;

  renameBoard: (boardId: BoardId, title: string) => void;

  deleteBoard: (boardId: BoardId) => void;

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

function selectNextActiveBoardId(boardOrder: BoardId[], deletedBoardId: BoardId): BoardId | null {
  const deletedIndex = boardOrder.indexOf(deletedBoardId);

  const nextBoardOrder = boardOrder.filter((boardId) => boardId !== deletedBoardId);

  if (nextBoardOrder.length === 0) {
    return null;
  }

  return (
    nextBoardOrder[deletedIndex] ?? nextBoardOrder[deletedIndex - 1] ?? nextBoardOrder[0] ?? null
  );
}

export const useBoardStore = create<BoardStore>()(
  persist<BoardStore, [], [], AppState>(
    (set) => ({
      ...createDemoAppState(),

      createBoard: (title) => {
        const normalizedTitle = title.trim();

        if (!normalizedTitle) {
          return null;
        }

        const boardId = crypto.randomUUID();

        const columnIds = {
          backlog: crypto.randomUUID(),
          todo: crypto.randomUUID(),
          inProgress: crypto.randomUUID(),
          done: crypto.randomUUID(),
        };

        const now = new Date().toISOString();

        const { board, columns } = createBoardBundle({
          boardId,
          title: normalizedTitle,
          columnIds,
          createdAt: now,
        });

        set((state) => ({
          boards: {
            ...state.boards,
            [board.id]: board,
          },

          boardOrder: [...state.boardOrder, board.id],

          activeBoardId: board.id,

          columns: {
            ...state.columns,
            ...columns,
          },
        }));

        return board.id;
      },

      setActiveBoard: (boardId) => {
        set((state) => {
          if (!state.boards[boardId]) {
            return state;
          }

          if (state.activeBoardId === boardId) {
            return state;
          }

          return {
            activeBoardId: boardId,
          };
        });
      },

      renameBoard: (boardId, title) => {
        const normalizedTitle = title.trim();

        if (!normalizedTitle) {
          return;
        }

        set((state) => {
          const board = state.boards[boardId];

          if (!board) {
            return state;
          }

          if (board.title === normalizedTitle) {
            return state;
          }

          const now = new Date().toISOString();

          return {
            boards: {
              ...state.boards,

              [boardId]: {
                ...board,
                title: normalizedTitle,
                updatedAt: now,
              },
            },
          };
        });
      },

      deleteBoard: (boardId) => {
        set((state) => {
          const board = state.boards[boardId];

          if (!board) {
            return state;
          }

          const nextBoards = {
            ...state.boards,
          };

          delete nextBoards[boardId];

          const nextColumns = {
            ...state.columns,
          };

          const nextTasks = {
            ...state.tasks,
          };

          for (const columnId of board.columnIds) {
            const column = state.columns[columnId];

            if (column) {
              for (const taskId of column.taskIds) {
                delete nextTasks[taskId];
              }
            }

            delete nextColumns[columnId];
          }

          const nextBoardOrder = state.boardOrder.filter(
            (currentBoardId) => currentBoardId !== boardId,
          );

          const nextActiveBoardId =
            state.activeBoardId === boardId
              ? selectNextActiveBoardId(state.boardOrder, boardId)
              : state.activeBoardId;

          return {
            boards: nextBoards,
            boardOrder: nextBoardOrder,
            activeBoardId: nextActiveBoardId,
            columns: nextColumns,
            tasks: nextTasks,
          };
        });
      },

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
