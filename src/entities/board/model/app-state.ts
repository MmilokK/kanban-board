import type { Board } from './types';
import type { Column } from '../../column/model/types';
import type { Task } from '../../task/model/types';
import type { BoardId, ColumnId, TaskId } from '../../../shared/model/entity-ids';

export const APP_SCHEMA_VERSION = 2 as const;

export type AppState = {
  boards: Record<BoardId, Board>;
  boardOrder: BoardId[];
  activeBoardId: BoardId | null;
  columns: Record<ColumnId, Column>;
  tasks: Record<TaskId, Task>;
  schemaVersion: typeof APP_SCHEMA_VERSION;
};
