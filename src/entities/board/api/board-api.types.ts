export type ApiTaskPriority = 'low' | 'medium' | 'high';

export type ApiSubtask = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
};

export type ApiTaskComment = {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiColumn = {
  id: string;
  title: string;
  position: number;
  isCompleted: boolean;
  isArchive: boolean;
};

export type ApiTask = {
  id: string;
  columnId: string;
  title: string;
  description: string;
  priority: ApiTaskPriority;
  tags: string[];
  dueDate: string | null;
  archivedAt: string | null;
  position: number;
  subtasks: ApiSubtask[];
  comments: ApiTaskComment[];
  createdAt: string;
  updatedAt: string;
};

export type ApiBoard = {
  id: string;
  title: string;
  columns: ApiColumn[];
  tasks: ApiTask[];
  createdAt: string;
  updatedAt: string;
};
