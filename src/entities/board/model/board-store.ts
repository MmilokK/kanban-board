import { create } from 'zustand';

import type { ColumnId } from '../../column/model/types';
import type { CreateTaskInput, TaskId, UpdateTaskInput } from '../../task/model/types';
import type { TaskIdsByColumn } from './task-order';

import { createDemoBoardState } from './demo-board';
import type { BoardState } from './types';

type BoardActions = {
  addTask: (input: CreateTaskInput, columnId?: ColumnId) => TaskId;

  updateTask: (taskId: TaskId, changes: UpdateTaskInput) => void;

  deleteTask: (taskId: TaskId) => void;

  resetBoard: () => void;

  replaceTaskOrder: (taskIdsByColumn: TaskIdsByColumn) => void;
};

export type BoardStore = BoardState & BoardActions;

export const useBoardStore = create<BoardStore>()((set) => ({
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

  resetBoard: () => {
    set(createDemoBoardState());
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
}));
