import type { BoardId, ColumnId } from '../../../shared/model/entity-ids';
import type { Column } from '../../column/model/types';

import type { Board } from './types';
import { DEFAULT_COLUMN_TEMPLATES, type DefaultColumnIds } from './default-board';

type CreateBoardBundleParams = {
  boardId: BoardId;
  title: string;
  columnIds: DefaultColumnIds;
  createdAt: string;
};

export type BoardBundle = {
  board: Board;
  columns: Record<ColumnId, Column>;
};

export function createBoardBundle({
  boardId,
  title,
  columnIds,
  createdAt,
}: CreateBoardBundleParams): BoardBundle {
  const board: Board = {
    id: boardId,
    title,
    columnIds: [columnIds.backlog, columnIds.todo, columnIds.inProgress, columnIds.done],
    createdAt,
    updatedAt: createdAt,
  };

  const columns: Record<ColumnId, Column> = {
    [columnIds.backlog]: {
      id: columnIds.backlog,
      boardId,
      title: DEFAULT_COLUMN_TEMPLATES.backlog.title,
      taskIds: [],
      isCompleted: DEFAULT_COLUMN_TEMPLATES.backlog.isCompleted,
    },

    [columnIds.todo]: {
      id: columnIds.todo,
      boardId,
      title: DEFAULT_COLUMN_TEMPLATES.todo.title,
      taskIds: [],
      isCompleted: DEFAULT_COLUMN_TEMPLATES.todo.isCompleted,
    },

    [columnIds.inProgress]: {
      id: columnIds.inProgress,
      boardId,
      title: DEFAULT_COLUMN_TEMPLATES.inProgress.title,
      taskIds: [],
      isCompleted: DEFAULT_COLUMN_TEMPLATES.inProgress.isCompleted,
    },

    [columnIds.done]: {
      id: columnIds.done,
      boardId,
      title: DEFAULT_COLUMN_TEMPLATES.done.title,
      taskIds: [],
      isCompleted: DEFAULT_COLUMN_TEMPLATES.done.isCompleted,
    },
  };

  return {
    board,
    columns,
  };
}
