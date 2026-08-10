import type { BoardId, ColumnId } from '../../../shared/model/entity-ids';

export const DEFAULT_BOARD_ID: BoardId = 'board-default';

export const DEFAULT_BOARD_TITLE = 'Kanban Board';

export const ARCHIVE_COLUMN_TITLE = 'Archive';

export type DefaultColumnIds = {
  backlog: ColumnId;
  todo: ColumnId;
  inProgress: ColumnId;
  done: ColumnId;
  archive: ColumnId;
};

export const DEFAULT_COLUMN_IDS = {
  backlog: 'backlog',
  todo: 'todo',
  inProgress: 'in-progress',
  done: 'done',
  archive: 'archive',
} as const satisfies DefaultColumnIds;

export const DEFAULT_COLUMN_TEMPLATES = {
  backlog: {
    title: 'Backlog',
    isCompleted: false,
    isArchive: false,
  },

  todo: {
    title: 'To do',
    isCompleted: false,
    isArchive: false,
  },

  inProgress: {
    title: 'In progress',
    isCompleted: false,
    isArchive: false,
  },

  done: {
    title: 'Done',
    isCompleted: true,
    isArchive: false,
  },

  archive: {
    title: 'Archive',
    isCompleted: false,
    isArchive: true,
  },
} as const;
