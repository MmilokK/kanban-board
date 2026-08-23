import { useQuery } from '@tanstack/react-query';
import { authQueryKeys } from './auth-query-keys';
import { queryCurrentUser } from './current-user-query';

export function useCurrentUser() {
  return useQuery({
    queryKey: authQueryKeys.currentUser,
    queryFn: queryCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
