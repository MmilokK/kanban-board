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
    columnIds: [
      columnIds.backlog,
      columnIds.todo,
      columnIds.inProgress,
      columnIds.done,
      columnIds.archive,
    ],
    createdAt,
    updatedAt: createdAt,
  };

  const columns: Record<ColumnId, Column> = {
    [columnIds.backlog]: {
      ...DEFAULT_COLUMN_TEMPLATES.backlog,
      id: columnIds.backlog,
      boardId,
      taskIds: [],
    },

    [columnIds.todo]: {
      ...DEFAULT_COLUMN_TEMPLATES.todo,
      id: columnIds.todo,
      boardId,
      taskIds: [],
    },

    [columnIds.inProgress]: {
      ...DEFAULT_COLUMN_TEMPLATES.inProgress,
      id: columnIds.inProgress,
      boardId,
      taskIds: [],
    },

    [columnIds.done]: {
      ...DEFAULT_COLUMN_TEMPLATES.done,
      id: columnIds.done,
      boardId,
      taskIds: [],
    },
    [columnIds.archive]: {
      ...DEFAULT_COLUMN_TEMPLATES.archive,
      id: columnIds.archive,
      boardId,
      taskIds: [],
    },
  };

  return {
    board,
    columns,
  };
}
