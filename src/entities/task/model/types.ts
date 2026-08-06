import type { TaskId } from '../../../shared/model/entity-ids';

export type TaskPriority = 'low' | 'medium' | 'high';

export type Task = {
  id: TaskId;
  title: string;
  description: string;
  priority: TaskPriority;
  tags: string[];
  dueDate: string | null; //Дата в формате YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskInput = Pick<Task, 'title' | 'description' | 'priority' | 'tags' | 'dueDate'>;

export type UpdateTaskInput = Partial<CreateTaskInput>;
