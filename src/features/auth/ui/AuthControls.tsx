import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationsRealtime } from '../../../entities/notification/api/use-notifications-realtime';
import { logout } from '../../../entities/user/api/auth-api';
import { authQueryKeys } from '../../../entities/user/api/auth-query-keys';
import { useCurrentUser } from '../../../entities/user/api/use-current-user';
import { NotificationButton } from '../../notifications/ui/NotificationButton';
import { AuthDialog } from './AuthDialog';
import styles from './AuthControls.module.scss';

export function AuthControls() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();

  useNotificationsRealtime(Boolean(user));

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
    <div className={styles.authenticated}>
      <span className={styles.userName} title={user.name ?? user.email}>
        {user.name ?? user.email}
      </span>

      <NotificationButton />

      <button
        type="button"
        className={styles.logoutButton}
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
