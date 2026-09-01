import { apiRequest } from '../../../shared/api/api-client';
import type { ApiBoardResponse } from './board-api.types';

export function createCloudColumn(boardId: string, title: string) {
  return apiRequest<ApiBoardResponse>(`/boards/${boardId}/columns`, {
    method: 'POST',
    body: { title },
  });
}

export function renameCloudColumn(boardId: string, columnId: string, title: string) {
  return apiRequest<ApiBoardResponse>(`/boards/${boardId}/columns/${columnId}`, {
    method: 'PATCH',
    body: { title },
  });
}

export function deleteCloudColumn(boardId: string, columnId: string) {
  return apiRequest<ApiBoardResponse>(`/boards/${boardId}/columns/${columnId}`, {
    method: 'DELETE',
  });
}

export function reorderCloudColumns(boardId: string, columnIds: string[]) {
  return apiRequest<ApiBoardResponse>(`/boards/${boardId}/columns/order`, {
    method: 'PUT',
    body: { columnIds },
  });
}

export function createCloudTask(
  boardId: string,
  columnId: string,
  input: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    tags: string[];
    dueDate: string | null;
  },
) {
  return apiRequest<ApiBoardResponse>(`/boards/${boardId}/columns/${columnId}/tasks`, {
    method: 'POST',
    body: input,
  });
}

export function updateCloudTask(
  boardId: string,
  taskId: string,
  input: {
    title?: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    tags?: string[];
    dueDate?: string | null;
  },
) {
  return apiRequest<ApiBoardResponse>(`/boards/${boardId}/tasks/${taskId}`, {
    method: 'PATCH',
    body: input,
  });
}

export function deleteCloudTask(boardId: string, taskId: string) {
  return apiRequest<ApiBoardResponse>(`/boards/${boardId}/tasks/${taskId}`, {
    method: 'DELETE',
  });
}

export function reorderCloudTasks(
  boardId: string,
  columns: Array<{
    columnId: string;
    taskIds: string[];
  }>,
) {
  return apiRequest<ApiBoardResponse>(`/boards/${boardId}/tasks/order`, {
    method: 'PUT',
    body: { columns },
  });
}

export function archiveCloudTask(boardId: string, taskId: string) {
  return apiRequest<ApiBoardResponse>(`/boards/${boardId}/tasks/${taskId}/archive`, {
    method: 'POST',
  });
}

export function restoreCloudTask(boardId: string, taskId: string, columnId: string) {
  return apiRequest<ApiBoardResponse>(`/boards/${boardId}/tasks/${taskId}/restore`, {
    method: 'POST',
    body: { columnId },
  });
}

export function createCloudSubtask(
  boardId: string,
  taskId: string,
  input: {
    title: string;
    description: string;
  },
) {
  return apiRequest<ApiBoardResponse>(`/boards/${boardId}/tasks/${taskId}/subtasks`, {
    method: 'POST',
    body: input,
  });
}

export function updateCloudSubtask(
  boardId: string,
  taskId: string,
  subtaskId: string,
  input: {
    title?: string;
    description?: string;
    isCompleted?: boolean;
  },
) {
  return apiRequest<ApiBoardResponse>(`/boards/${boardId}/tasks/${taskId}/subtasks/${subtaskId}`, {
    method: 'PATCH',
    body: input,
  });
}

export function deleteCloudSubtask(boardId: string, taskId: string, subtaskId: string) {
  return apiRequest<ApiBoardResponse>(`/boards/${boardId}/tasks/${taskId}/subtasks/${subtaskId}`, {
    method: 'DELETE',
  });
}

export function createCloudComment(boardId: string, taskId: string, text: string) {
  return apiRequest<ApiBoardResponse>(`/boards/${boardId}/tasks/${taskId}/comments`, {
    method: 'POST',
    body: { text },
  });
}

export function updateCloudComment(
  boardId: string,
  taskId: string,
  commentId: string,
  text: string,
) {
  return apiRequest<ApiBoardResponse>(`/boards/${boardId}/tasks/${taskId}/comments/${commentId}`, {
    method: 'PATCH',
    body: { text },
  });
}

export function deleteCloudComment(boardId: string, taskId: string, commentId: string) {
  return apiRequest<ApiBoardResponse>(`/boards/${boardId}/tasks/${taskId}/comments/${commentId}`, {
    method: 'DELETE',
  });
}
