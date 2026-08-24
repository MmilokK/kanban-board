import { apiRequest } from '../../../shared/api/api-client';

import type { ApiBoard, ApiBoardsResponse } from './board-api.types';
import type { ImportBoardInput } from './local-board-import';

export function getBoards() {
  return apiRequest<ApiBoardsResponse>('/boards');
}

export function getBoard(boardId: string) {
  return apiRequest<{ board: ApiBoard }>(`/boards/${boardId}`);
}

export function createCloudBoard(title: string) {
  return apiRequest<{ board: ApiBoard }>('/boards', {
    method: 'POST',
    body: {
      title,
    },
  });
}

export function renameCloudBoard(boardId: string, title: string) {
  return apiRequest<{ board: ApiBoard }>(`/boards/${boardId}`, {
    method: 'PATCH',
    body: {
      title,
    },
  });
}

export function deleteCloudBoard(boardId: string) {
  return apiRequest<void>(`/boards/${boardId}`, {
    method: 'DELETE',
  });
}

export function importLocalBoard(input: ImportBoardInput) {
  return apiRequest<{ board: ApiBoard }>('/boards/import', {
    method: 'POST',
    body: input,
  });
}
