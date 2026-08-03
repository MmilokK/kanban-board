import type { BoardId, ColumnId } from '../../../shared/model/entity-ids';

export const DEFAULT_BOARD_ID: BoardId = 'board-default';

export const DEFAULT_BOARD_TITLE = 'Kanban Board';

export type DefaultColumnIds = {
  backlog: ColumnId;
  todo: ColumnId;
  inProgress: ColumnId;
  done: ColumnId;
};

export const DEFAULT_COLUMN_IDS = {
  backlog: 'backlog',
  todo: 'todo',
  inProgress: 'in-progress',
  done: 'done',
} as const satisfies DefaultColumnIds;

export const DEFAULT_COLUMN_TEMPLATES = {
  backlog: {
    title: 'Backlog',
    isCompleted: false,
  },

  todo: {
    title: 'To do',
    isCompleted: false,
  },

  inProgress: {
    title: 'In progress',
    isCompleted: false,
  },

  done: {
    title: 'Done',
    isCompleted: true,
  },
} as const;
