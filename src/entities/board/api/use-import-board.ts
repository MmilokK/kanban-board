import { useMutation, useQueryClient } from '@tanstack/react-query';
import { boardQueryKeys } from './board-query-keys';
import { importLocalBoard } from './board-api';

export function useImportBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: importLocalBoard,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: boardQueryKeys.lists(),
      });
    },
  });
}
