import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '../../../shared/api/api-error';
import { getBoard } from './board-api';
import { boardQueryKeys } from './board-query-keys';

function isBoardNotFoundError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 404 && error.code === 'BOARD_NOT_FOUND';
}

export function useCloudBoard(boardId: string | null) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: boardQueryKeys.detail(boardId ?? ''),
    queryFn: () => {
      if (!boardId) {
        throw new Error('Идентификатор доски отсутствует');
      }
      return getBoard(boardId);
    },
    enabled: Boolean(boardId),
  });

  const isNotFound = isBoardNotFoundError(query.error);

  useEffect(() => {
    if (!isNotFound) {
      return;
    }

    void queryClient.invalidateQueries({
      queryKey: boardQueryKeys.lists(),
    });
  }, [isNotFound, queryClient]);

  if (isNotFound) {
    return {
      ...query,
      data: undefined,
    };
  }

  return query;
}
