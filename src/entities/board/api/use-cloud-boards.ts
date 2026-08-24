import { useQuery } from '@tanstack/react-query';
import { useCurrentUser } from '../../user/api/use-current-user';
import { getBoards } from './board-api';
import { boardQueryKeys } from './board-query-keys';

export function useCloudBoards() {
  const { data: user } = useCurrentUser();
  return useQuery({
    queryKey: boardQueryKeys.lists(),
    queryFn: async () => {
      const response = await getBoards();
      return response.boards;
    },
    enabled: Boolean(user),
  });
}
