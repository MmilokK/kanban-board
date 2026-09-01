export type ApiBoardRole = 'OWNER' | 'EDITOR' | 'VIEWER';

export type ApiTaskPriority = 'low' | 'medium' | 'high';

export type ApiSubtask = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  position: number;
};

export type CreateCloudSubtaskInput = {
  title: string;
  description: string;
};

export type UpdateCloudSubtaskInput = {
  title?: string;
  description?: string;
  isCompleted?: boolean;
};

export type ApiTaskComment = {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCloudCommentInput = {
  text: string;
};

export type UpdateCloudCommentInput = Partial<CreateCloudCommentInput>;

export type ApiTaskHistoryActor = {
  id: string;
  name: string | null;
};

export type ApiTaskHistoryEvent = {
  id: string;
  type: string;
  payload: unknown;
  actor: ApiTaskHistoryActor | null;
  createdAt: string;
};

export type ApiColumn = {
  id: string;
  title: string;
  position: number;
  isCompleted: boolean;
  isArchive: boolean;
};

export type CreateCloudColumnInput = {
  title: string;
};

export type UpdateCloudColumnInput = {
  title: string;
};

export type ReorderCloudColumnsInput = {
  columnIds: string[];
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
  history: ApiTaskHistoryEvent[];
  createdAt: string;
  updatedAt: string;
};

export type CreateCloudTaskInput = {
  title: string;
  description: string;
  priority: ApiTaskPriority;
  tags: string[];
  dueDate: string | null;
};

export type UpdateCloudTaskInput = {
  title?: string;
  description?: string;
  priority?: ApiTaskPriority;
  tags?: string[];
  dueDate?: string | null;
};

export type CloudTaskOrderColumnInput = {
  columnId: string;
  taskIds: string[];
};

export type ReorderCloudTasksInput = {
  columns: CloudTaskOrderColumnInput[];
};

export type RestoreCloudTaskInput = {
  columnId: string;
};

export type ApiBoard = {
  id: string;
  title: string;
  columns: ApiColumn[];
  tasks: ApiTask[];
  role: ApiBoardRole;
  createdAt: string;
  updatedAt: string;
};

export type ApiBoardListItem = {
  id: string;
  title: string;
  role: ApiBoardRole;
  createdAt: string;
  updatedAt: string;
};

export type ApiBoardResponse = {
  board: ApiBoard;
};

export type ApiBoardsResponse = {
  boards: ApiBoardListItem[];
};
