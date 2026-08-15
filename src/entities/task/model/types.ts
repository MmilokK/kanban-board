import type { CommentId, SubtaskId, TaskId } from '../../../shared/model/entity-ids';
import type { TaskHistoryEvent } from './task-history';

export type TaskPriority = 'low' | 'medium' | 'high';

export type Subtask = {
  id: SubtaskId;
  title: string;
  description: string;
  isCompleted: boolean;
};

export type CreateSubtaskInput = Pick<Subtask, 'title' | 'description'>;

export type UpdateSubtaskInput = Partial<CreateSubtaskInput>;

export type Task = {
  id: TaskId;
  title: string;
  description: string;
  priority: TaskPriority;
  tags: string[];
  subtasks: Subtask[];
  comments: TaskComment[];
  history: TaskHistoryEvent[];
  dueDate: string | null; //Дата в формате YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
};

export type CreateTaskInput = Pick<Task, 'title' | 'description' | 'priority' | 'tags' | 'dueDate'>;

export type UpdateTaskInput = Partial<CreateTaskInput>;

export type TaskComment = {
  id: CommentId;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskCommentInput = Pick<TaskComment, 'text'>;

export type UpdateTaskCommentInput = Partial<CreateTaskCommentInput>;
