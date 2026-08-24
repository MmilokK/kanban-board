import type { AppState } from '../model/app-state';

import type { BoardId } from '../../../shared/model/entity-ids';

export type ImportBoardInput = {
  title: string;
  columns: Array<{
    title: string;
    isCompleted: boolean;
    isArchive: boolean;
    tasks: Array<{
      title: string;
      description: string;
      priority: 'low' | 'medium' | 'high';
      tags: string[];
      dueDate: string | null;
      archivedAt: string | null;
      subtasks: Array<{
        title: string;
        description: string;
        isCompleted: boolean;
      }>;
      comments: Array<{
        text: string;
        createdAt: string;
        updatedAt: string;
      }>;
    }>;
  }>;
};

export function createLocalBoardImport(state: AppState, boardId: BoardId): ImportBoardInput {
  const board = state.boards[boardId];

  if (!board) {
    throw new Error('Доска не найдена');
  }

  return {
    title: board.title,
    columns: board.columnIds
      .map((columnId) => state.columns[columnId])
      .filter((column) => column !== undefined)
      .map((column) => ({
        title: column.title,
        isCompleted: column.isCompleted,
        isArchive: column.isArchive,
        tasks: column.taskIds
          .map((taskId) => state.tasks[taskId])
          .filter((task) => task !== undefined)
          .map((task) => ({
            title: task.title,
            description: task.description,
            priority: task.priority,
            tags: [...task.tags],
            dueDate: task.dueDate,
            archivedAt: task.archivedAt,
            subtasks: task.subtasks.map((subtask) => ({
              title: subtask.title,
              description: subtask.description,
              isCompleted: subtask.isCompleted,
            })),
            comments: task.comments.map((comment) => ({
              text: comment.text,
              createdAt: comment.createdAt,
              updatedAt: comment.updatedAt,
            })),
          })),
      })),
  };
}
