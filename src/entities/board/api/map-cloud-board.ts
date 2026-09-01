import type {
  BoardId,
  ColumnId,
  CommentId,
  SubtaskId,
  TaskId,
} from '../../../shared/model/entity-ids';
import type { Board } from '../model/types';
import type { Column } from '../../column/model/types';
import type { Task } from '../../task/model/types';
import type { TaskHistoryColumnSnapshot, TaskHistoryEvent } from '../../task/model/task-history';
import type { ApiBoard, ApiTask, ApiTaskHistoryEvent } from './board-api.types';

export type MappedCloudBoard = {
  board: Board;
  columns: Record<ColumnId, Column>;
  tasks: Record<TaskId, Task>;
};

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getString(object: JsonObject, key: string): string | undefined {
  const value = object[key];
  return typeof value === 'string' ? value : undefined;
}

function getNullableString(object: JsonObject, key: string): string | null | undefined {
  const value = object[key];
  if (value === null) return null;
  return typeof value === 'string' ? value : undefined;
}

function getStringArray(object: JsonObject, key: string): string[] | undefined {
  const value = object[key];
  if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) {
    return undefined;
  }
  return value;
}

function getColumnSnapshot(value: unknown): TaskHistoryColumnSnapshot | undefined {
  if (!isObject(value)) return undefined;
  const id = getString(value, 'id');
  const title = getString(value, 'title');
  if (!id || title === undefined) return undefined;
  return {
    id: id as ColumnId,
    title,
  };
}

function getRequiredString(payload: JsonObject, key: string, event: ApiTaskHistoryEvent): string {
  const value = getString(payload, key);
  if (value === undefined) {
    throw new Error(
      `Некорректный payload события истории "${event.type}": отсутствует поле "${key}"`,
    );
  }
  return value;
}

function getRequiredColumnSnapshot(
  payload: JsonObject,
  key: string,
  event: ApiTaskHistoryEvent,
): TaskHistoryColumnSnapshot {
  const value = getColumnSnapshot(payload[key]);
  if (!value) {
    throw new Error(
      `Некорректный payload события истории "${event.type}": отсутствует поле "${key}"`,
    );
  }
  return value;
}

function mapTaskUpdatedEvent(event: ApiTaskHistoryEvent, payload: JsonObject): TaskHistoryEvent {
  const rawChanges = payload.changes;
  if (!isObject(rawChanges)) {
    throw new Error(`Некорректный payload события истории "${event.type}": отсутствует changes`);
  }
  const changes: Extract<TaskHistoryEvent, { type: 'task-updated' }>['changes'] = {};
  if (isObject(rawChanges.title)) {
    const from = getString(rawChanges.title, 'from');
    const to = getString(rawChanges.title, 'to');
    if (from !== undefined && to !== undefined) {
      changes.title = {
        from,
        to,
      };
    }
  }

  if (isObject(rawChanges.description)) {
    const from = getString(rawChanges.description, 'from');
    const to = getString(rawChanges.description, 'to');
    if (from !== undefined && to !== undefined) {
      changes.description = {
        from,
        to,
      };
    }
  }

  if (isObject(rawChanges.priority)) {
    const from = getString(rawChanges.priority, 'from');
    const to = getString(rawChanges.priority, 'to');
    const priorities = ['low', 'medium', 'high'] as const;
    if (
      from !== undefined &&
      to !== undefined &&
      priorities.includes(from as (typeof priorities)[number]) &&
      priorities.includes(to as (typeof priorities)[number])
    ) {
      changes.priority = {
        from: from as (typeof priorities)[number],
        to: to as (typeof priorities)[number],
      };
    }
  }

  if (isObject(rawChanges.dueDate)) {
    const from = getNullableString(rawChanges.dueDate, 'from');
    const to = getNullableString(rawChanges.dueDate, 'to');
    if (from !== undefined && to !== undefined) {
      changes.dueDate = {
        from,
        to,
      };
    }
  }

  if (isObject(rawChanges.tags)) {
    const from = getStringArray(rawChanges.tags, 'from');
    const to = getStringArray(rawChanges.tags, 'to');
    if (from !== undefined && to !== undefined) {
      changes.tags = {
        from,
        to,
      };
    }
  }

  return {
    id: event.id,
    type: 'task-updated',
    changes,
    createdAt: event.createdAt,
  };
}

function mapSubtaskUpdatedEvent(event: ApiTaskHistoryEvent, payload: JsonObject): TaskHistoryEvent {
  const subtaskId = getRequiredString(payload, 'subtaskId', event);
  const rawChanges = payload.changes;
  if (!isObject(rawChanges)) {
    throw new Error(`Некорректный payload события истории "${event.type}": отсутствует changes`);
  }
  const changes: Extract<TaskHistoryEvent, { type: 'subtask-updated' }>['changes'] = {};
  if (isObject(rawChanges.title)) {
    const from = getString(rawChanges.title, 'from');
    const to = getString(rawChanges.title, 'to');
    if (from !== undefined && to !== undefined) {
      changes.title = {
        from,
        to,
      };
    }
  }

  if (isObject(rawChanges.description)) {
    const from = getString(rawChanges.description, 'from');
    const to = getString(rawChanges.description, 'to');

    if (from !== undefined && to !== undefined) {
      changes.description = {
        from,
        to,
      };
    }
  }

  return {
    id: event.id,
    type: 'subtask-updated',
    subtaskId: subtaskId as SubtaskId,
    changes,
    createdAt: event.createdAt,
  };
}

function mapTaskHistoryEvent(event: ApiTaskHistoryEvent): TaskHistoryEvent {
  const payload = isObject(event.payload) ? event.payload : {};
  switch (event.type) {
    case 'TASK_CREATED':
      return {
        id: event.id,
        type: 'task-created',
        createdAt: event.createdAt,
      };

    case 'TASK_UPDATED':
      return mapTaskUpdatedEvent(event, payload);

    case 'TASK_MOVED':
      return {
        id: event.id,
        type: 'task-moved',
        fromColumn: getRequiredColumnSnapshot(payload, 'fromColumn', event),
        toColumn: getRequiredColumnSnapshot(payload, 'toColumn', event),
        createdAt: event.createdAt,
      };

    case 'TASK_ARCHIVED':
      return {
        id: event.id,
        type: 'task-archived',
        fromColumn: getRequiredColumnSnapshot(payload, 'fromColumn', event),
        createdAt: event.createdAt,
      };

    case 'TASK_RESTORED':
      return {
        id: event.id,
        type: 'task-restored',
        toColumn: getRequiredColumnSnapshot(payload, 'toColumn', event),
        createdAt: event.createdAt,
      };

    case 'SUBTASK_CREATED':
      return {
        id: event.id,
        type: 'subtask-added',
        subtaskId: getRequiredString(payload, 'subtaskId', event) as SubtaskId,
        title: getRequiredString(payload, 'title', event),
        createdAt: event.createdAt,
      };

    case 'SUBTASK_UPDATED':
      return mapSubtaskUpdatedEvent(event, payload);

    case 'SUBTASK_COMPLETED':
      return {
        id: event.id,
        type: 'subtask-completed',
        subtaskId: getRequiredString(payload, 'subtaskId', event) as SubtaskId,
        title: getRequiredString(payload, 'title', event),
        createdAt: event.createdAt,
      };

    case 'SUBTASK_REOPENED':
      return {
        id: event.id,
        type: 'subtask-reopened',
        subtaskId: getRequiredString(payload, 'subtaskId', event) as SubtaskId,
        title: getRequiredString(payload, 'title', event),
        createdAt: event.createdAt,
      };

    case 'SUBTASK_DELETED':
      return {
        id: event.id,
        type: 'subtask-deleted',
        subtaskId: getRequiredString(payload, 'subtaskId', event) as SubtaskId,
        title: getRequiredString(payload, 'title', event),
        createdAt: event.createdAt,
      };

    case 'COMMENT_ADDED':
      return {
        id: event.id,
        type: 'comment-added',
        commentId: getRequiredString(payload, 'commentId', event) as CommentId,
        createdAt: event.createdAt,
      };

    case 'COMMENT_UPDATED':
      return {
        id: event.id,
        type: 'comment-updated',
        commentId: getRequiredString(payload, 'commentId', event) as CommentId,
        createdAt: event.createdAt,
      };

    case 'COMMENT_DELETED':
      return {
        id: event.id,
        type: 'comment-deleted',
        commentId: getRequiredString(payload, 'commentId', event) as CommentId,
        createdAt: event.createdAt,
      };

    default:
      throw new Error(`Неизвестный тип события cloud-истории: ${event.type}`);
  }
}

function mapCloudTask(task: ApiTask): Task {
  return {
    id: task.id as TaskId,
    title: task.title,
    description: task.description,
    priority: task.priority,
    tags: [...task.tags],
    dueDate: task.dueDate,
    archivedAt: task.archivedAt,
    subtasks: task.subtasks.map((subtask) => ({
      id: subtask.id as SubtaskId,
      title: subtask.title,
      description: subtask.description,
      isCompleted: subtask.isCompleted,
    })),
    comments: [...task.comments]
      .sort((first, second) => first.createdAt.localeCompare(second.createdAt))
      .map((comment) => ({
        id: comment.id as CommentId,
        text: comment.text,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      })),

    history: [...task.history]
      .sort((first, second) => first.createdAt.localeCompare(second.createdAt))
      .map(mapTaskHistoryEvent),
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}

export function mapCloudBoard(apiBoard: ApiBoard): MappedCloudBoard {
  const boardId = apiBoard.id as BoardId;
  const orderedApiColumns = [...apiBoard.columns].sort(
    (first, second) => first.position - second.position,
  );
  const orderedTasks = [...apiBoard.tasks].sort(
    (first, second) => first.position - second.position,
  );
  const columns = Object.fromEntries(
    orderedApiColumns.map((apiColumn) => {
      const columnId = apiColumn.id as ColumnId;
      const column: Column = {
        id: columnId,
        boardId,
        title: apiColumn.title,
        taskIds: orderedTasks
          .filter((task) => task.columnId === apiColumn.id)
          .map((task) => task.id as TaskId),
        isCompleted: apiColumn.isCompleted,
        isArchive: apiColumn.isArchive,
      };
      return [columnId, column];
    }),
  ) as Record<ColumnId, Column>;

  const tasks = Object.fromEntries(
    apiBoard.tasks.map((apiTask) => {
      const taskId = apiTask.id as TaskId;
      return [taskId, mapCloudTask(apiTask)];
    }),
  ) as Record<TaskId, Task>;

  const board: Board = {
    id: boardId,
    title: apiBoard.title,
    columnIds: orderedApiColumns.map((column) => column.id as ColumnId),
    createdAt: apiBoard.createdAt,
    updatedAt: apiBoard.updatedAt,
  };

  return {
    board,
    columns,
    tasks,
  };
}
