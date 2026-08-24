export type BoardListItemDto = {
  id: string;
  title: string;
  role: 'OWNER' | 'EDITOR' | 'VIEWER';
  createdAt: string;
  updatedAt: string;
};

export type ColumnDto = {
  id: string;
  title: string;
  position: number;
  isCompleted: boolean;
  isArchive: boolean;
};

export type SubtaskDto = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  position: number;
};

export type CommentDto = {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskDto = {
  id: string;
  columnId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  dueDate: string | null;
  archivedAt: string | null;
  position: number;
  subtasks: SubtaskDto[];
  comments: CommentDto[];
  createdAt: string;
  updatedAt: string;
};

export type BoardDto = {
  id: string;
  title: string;
  role: 'OWNER' | 'EDITOR' | 'VIEWER';
  columns: ColumnDto[];
  tasks: TaskDto[];
  createdAt: string;
  updatedAt: string;
};
