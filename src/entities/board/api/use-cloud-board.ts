import { useQuery } from '@tanstack/react-query';
import { getBoard } from './board-api';
import { boardQueryKeys } from './board-query-keys';

export function useCloudBoard(boardId: string | null) {
  return useQuery({
    queryKey: boardQueryKeys.detail(boardId ?? ''),
    queryFn: () => {
      if (!boardId) {
        throw new Error('Идентификатор доски отсутствует');
      }
      return getBoard(boardId);
    },
    enabled: Boolean(boardId),
  });
}
