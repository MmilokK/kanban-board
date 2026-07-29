export type TaskId = string;

export type TaskPriority = 'low' | 'medium' | 'high';

export type Task = {
  id: TaskId;
  title: string;
  description: string;
  priority: TaskPriority;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskInput = Pick<Task, 'title' | 'description' | 'priority' | 'tags'>;

export type UpdateTaskInput = Partial<CreateTaskInput>;
