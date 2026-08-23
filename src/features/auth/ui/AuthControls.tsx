import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../../../entities/user/api/auth-api';
import { authQueryKeys } from '../../../entities/user/api/auth-query-keys';
import { useCurrentUser } from '../../../entities/user/api/use-current-user';
import { AuthDialog } from './AuthDialog';

export function AuthControls() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(authQueryKeys.currentUser, null);
    },
  });

  if (!user) {
    return (
      <>
        <button
          type="button"
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          Войти
        </button>

        {dialogOpen && (
          <AuthDialog
            onClose={() => {
              setDialogOpen(false);
            }}
          />
        )}
      </>
    );
  }

  return (
    <div>
      <span>{user.name ?? user.email}</span>

      <button
        type="button"
        disabled={logoutMutation.isPending}
        onClick={() => {
          logoutMutation.mutate();
        }}
      >
        Выйти
      </button>
    </div>
  );
}
