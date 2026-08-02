import type { BoardId, ColumnId } from '../../../shared/model/entity-ids';

export const DEFAULT_BOARD_ID: BoardId = 'board-default';

export const DEFAULT_BOARD_TITLE = 'Kanban Board';

export const DEFAULT_COLUMN_IDS = {
  backlog: 'backlog',
  todo: 'todo',
  inProgress: 'in-progress',
  done: 'done',
} as const satisfies Record<string, ColumnId>;
