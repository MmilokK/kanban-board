import type { SubtaskId, TaskId } from '../../../shared/model/entity-ids';

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
  dueDate: string | null; //Дата в формате YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
};

export type CreateTaskInput = Pick<Task, 'title' | 'description' | 'priority' | 'tags' | 'dueDate'>;

export type UpdateTaskInput = Partial<CreateTaskInput>;
