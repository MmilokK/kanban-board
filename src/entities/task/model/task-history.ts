import type { ColumnId, CommentId, SubtaskId } from '../../../shared/model/entity-ids';
import type { TaskPriority } from './types';

export type TaskHistoryEventId = string;

type TaskHistoryBaseEvent = {
  id: TaskHistoryEventId;
  createdAt: string;
};

type OptionalChange<T> =
  | {
      from: T;
      to: T;
    }
  | undefined;

export type TaskHistoryColumnSnapshot = {
  id: ColumnId;
  title: string;
};

export type TaskHistoryEvent =
  | (TaskHistoryBaseEvent & {
      type: 'task-created';
    })
  | (TaskHistoryBaseEvent & {
      type: 'task-updated';
      changes: {
        title?: OptionalChange<string>;
        description?: OptionalChange<string>;
        priority?: OptionalChange<TaskPriority>;
        dueDate?: OptionalChange<string | null>;
        tags?: OptionalChange<string[]>;
      };
    })
  | (TaskHistoryBaseEvent & {
      type: 'task-moved';
      fromColumn: TaskHistoryColumnSnapshot;
      toColumn: TaskHistoryColumnSnapshot;
    })
  | (TaskHistoryBaseEvent & {
      type: 'task-archived';
      fromColumn: TaskHistoryColumnSnapshot;
    })
  | (TaskHistoryBaseEvent & {
      type: 'task-restored';
      toColumn: TaskHistoryColumnSnapshot;
    })
  | (TaskHistoryBaseEvent & {
      type: 'subtask-added';
      subtaskId: SubtaskId;
      title: string;
    })
  | (TaskHistoryBaseEvent & {
      type: 'subtask-updated';
      subtaskId: SubtaskId;
      changes: {
        title?: OptionalChange<string>;
        description?: OptionalChange<string>;
      };
    })
  | (TaskHistoryBaseEvent & {
      type: 'subtask-completed';
      subtaskId: SubtaskId;
      title: string;
    })
  | (TaskHistoryBaseEvent & {
      type: 'subtask-reopened';
      subtaskId: SubtaskId;
      title: string;
    })
  | (TaskHistoryBaseEvent & {
      type: 'subtask-deleted';
      subtaskId: SubtaskId;
      title: string;
    })
  | (TaskHistoryBaseEvent & {
      type: 'comment-added';
      commentId: CommentId;
    })
  | (TaskHistoryBaseEvent & {
      type: 'comment-updated';
      commentId: CommentId;
    })
  | (TaskHistoryBaseEvent & {
      type: 'comment-deleted';
      commentId: CommentId;
    });
