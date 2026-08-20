import type { BoardId, ColumnId, TaskId } from '../../../shared/model/entity-ids';
import type { AppState } from '../model/app-state';
import type { Board } from '../model/types';
import type { Column } from '../../column/model/types';
import type { Task } from '../../task/model/types';
import type { ApiBoard } from './board-api.types';

export function mapApiBoardToState(
  apiBoard: ApiBoard,
): Pick<AppState, 'boards' | 'columns' | 'tasks'> {
  const boardId = apiBoard.id as BoardId;

  const orderedApiColumns = [...apiBoard.columns].sort(
    (first, second) => first.position - second.position,
  );

  const columns = Object.fromEntries(
    orderedApiColumns.map((apiColumn) => {
      const taskIds = apiBoard.tasks
        .filter((task) => task.columnId === apiColumn.id)
        .sort((first, second) => first.position - second.position)
        .map((task) => task.id as TaskId);

      const column: Column = {
        ...apiColumn,
        boardId,
        taskIds,
      };

      return [apiColumn.id, column];
    }),
  ) as Record<ColumnId, Column>;

  const tasks = Object.fromEntries(
    apiBoard.tasks.map((apiTask) => {
      const task: Task = {
        ...apiTask,
        tags: [...apiTask.tags],
        subtasks: apiTask.subtasks.map((subtask) => ({ ...subtask })),
        comments: apiTask.comments.map((comment) => ({ ...comment })),
        history: [],
      };

      return [apiTask.id, task];
    }),
  ) as Record<TaskId, Task>;

  const board: Board = {
    ...apiBoard,
    id: boardId,
    columnIds: orderedApiColumns.map((column) => column.id as ColumnId),
  };

  return {
    boards: {
      [boardId]: board,
    },
    columns,
    tasks,
  };
}
