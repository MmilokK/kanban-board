import { useQuery } from '@tanstack/react-query';
import { getBoards } from './board-api';
import { boardQueryKeys } from './board-query-keys';

export function useCloudBoards() {
  return useQuery({
    queryKey: boardQueryKeys.lists(),
    queryFn: async () => {
      return getBoards().then(({ boards }) => boards);
    },
  });
}
