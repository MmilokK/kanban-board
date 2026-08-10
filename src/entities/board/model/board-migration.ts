import type { BoardId, ColumnId, TaskId } from '../../../shared/model/entity-ids';

import type { Board } from './types';
import type { Column } from '../../column/model/types';
import type { Task } from '../../task/model/types';
import type { AppState } from './app-state';

type LegacyColumnId = 'backlog' | 'todo' | 'in-progress' | 'done';

export type LegacyBoardState = {
  tasks: Record<
    string,
    {
      id: string;
      title: string;
      description: string;

      priority: 'low' | 'medium' | 'high';

      tags: string[];

      createdAt: string;
      updatedAt: string;
    }
  >;

  columns: Record<
    LegacyColumnId,
    {
      id: LegacyColumnId;
      title: string;
      taskIds: string[];
    }
  >;

  columnOrder: LegacyColumnId[];

  schemaVersion: 1;
};

const MIGRATED_BOARD_ID = 'board-default' as BoardId;

const ARCHIVE_COLUMN_ID = 'board-default-archive' as ColumnId;

function migrateColumnId(legacyColumnId: LegacyColumnId): ColumnId {
  return `board-default-${legacyColumnId}` as ColumnId;
}

function isCompletedLegacyColumn(columnId: LegacyColumnId): boolean {
  return columnId === 'done';
}

export function migrateLegacyBoardState(legacyState: LegacyBoardState): AppState {
  const migratedTasks = Object.fromEntries(
    Object.entries(legacyState.tasks).map(([taskId, task]) => {
      const migratedTask: Task = {
        id: task.id as TaskId,

        title: task.title,
        description: task.description,

        priority: task.priority,

        tags: [...task.tags],

        dueDate: null,
        archivedAt: null,

        createdAt: task.createdAt,

        updatedAt: task.updatedAt,
      };

      return [taskId, migratedTask];
    }),
  ) as Record<TaskId, Task>;

  const migratedColumns = Object.fromEntries(
    legacyState.columnOrder.map((legacyColumnId) => {
      const legacyColumn = legacyState.columns[legacyColumnId];

      const columnId = migrateColumnId(legacyColumnId);

      const migratedColumn: Column = {
        id: columnId,

        boardId: MIGRATED_BOARD_ID,

        title: legacyColumn.title,

        taskIds: legacyColumn.taskIds.map((taskId) => taskId as TaskId),

        isCompleted: isCompletedLegacyColumn(legacyColumnId),

        isArchive: false,
      };

      return [columnId, migratedColumn];
    }),
  ) as Record<ColumnId, Column>;

  const archiveColumn: Column = {
    id: ARCHIVE_COLUMN_ID,

    boardId: MIGRATED_BOARD_ID,

    title: 'Archive',

    taskIds: [],

    isCompleted: false,
    isArchive: true,
  };

  migratedColumns[ARCHIVE_COLUMN_ID] = archiveColumn;

  const migratedColumnIds = legacyState.columnOrder.map(migrateColumnId);

  const allColumnIds = [...migratedColumnIds, ARCHIVE_COLUMN_ID];

  const timestamps = Object.values(migratedTasks)
    .flatMap((task) => [task.createdAt, task.updatedAt])
    .sort();

  const createdAt = timestamps[0] ?? new Date().toISOString();

  const updatedAt = timestamps.at(-1) ?? createdAt;

  const board: Board = {
    id: MIGRATED_BOARD_ID,

    title: 'Kanban Board',

    columnIds: allColumnIds,

    createdAt,
    updatedAt,
  };

  return {
    boards: {
      [MIGRATED_BOARD_ID]: board,
    },

    boardOrder: [MIGRATED_BOARD_ID],

    activeBoardId: MIGRATED_BOARD_ID,

    columns: migratedColumns,

    tasks: migratedTasks,

    schemaVersion: 2,
  };
}
