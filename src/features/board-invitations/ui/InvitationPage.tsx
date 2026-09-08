import { useState } from 'react';
import { useCurrentUser } from '../../../entities/user/api/use-current-user';
import { AuthDialog } from '../../auth/ui/AuthDialog';
import {
  useAcceptBoardInvitationMutation,
  usePublicBoardInvitationQuery,
} from '../api/board-invitations.queries';
import type { BoardInvitationRole, BoardInvitationType } from '../api/board-invitations-api';

type InvitationPageProps = {
  token: string;
  onAccepted: (boardId: string) => void;
};

function formatRole(role: BoardInvitationRole): string {
  switch (role) {
    case 'EDITOR':
      return 'Редактор';
    case 'VIEWER':
      return 'Наблюдатель';
  }
}

function formatInvitationType(type: BoardInvitationType): string {
  switch (type) {
    case 'EMAIL':
      return 'Приглашение по email';
    case 'LINK':
      return 'Приглашение по ссылке';
  }
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function InvitationPage({ token, onAccepted }: InvitationPageProps) {
  const { data: user, isPending: isUserPending } = useCurrentUser();
  const invitationQuery = usePublicBoardInvitationQuery(token);
  const acceptMutation = useAcceptBoardInvitationMutation(token);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [acceptError, setAcceptError] = useState<string | null>(null);

  if (invitationQuery.isPending || isUserPending) {
    return <p role="status">Загрузка приглашения…</p>;
  }

  if (invitationQuery.isError) {
    return (
      <section>
        <h2>Приглашение недоступно</h2>
        <p role="alert">Приглашение не найдено или больше недоступно.</p>
      </section>
    );
  }

  const invitation = invitationQuery.data.invitation;
  const isUnavailable = invitation.isExpired || invitation.isRevoked || invitation.isExhausted;

  async function handleAccept() {
    if (!user) {
      setIsAuthDialogOpen(true);
      return;
    }
    setAcceptError(null);
    try {
      const response = await acceptMutation.mutateAsync();
      onAccepted(response.member.boardId);
    } catch {
      setAcceptError('Не удалось принять приглашение.');
    }
  }

  return (
    <>
      <section aria-labelledby="invitation-title">
        <h2 id="invitation-title">Приглашение на доску</h2>
        <h3>{invitation.boardTitle}</h3>
        <dl>
          <div>
            <dt>Тип приглашения</dt>
            <dd>{formatInvitationType(invitation.type)}</dd>
          </div>
          <div>
            <dt>Роль</dt>
            <dd>{formatRole(invitation.role)}</dd>
          </div>
          <div>
            <dt>Действует до</dt>
            <dd>{formatDate(invitation.expiresAt)}</dd>
          </div>
        </dl>

        {invitation.isRevoked && (
          <p role="alert">Это приглашение было отозвано владельцем доски.</p>
        )}
        {invitation.isExpired && <p role="alert">Срок действия этого приглашения истёк.</p>}
        {invitation.isExhausted && (
          <p role="alert">Лимит использований этого приглашения исчерпан.</p>
        )}

        {!isUnavailable && !user && (
          <div>
            <p>Чтобы принять приглашение, войди в аккаунт или зарегистрируйся.</p>
            <button
              type="button"
              onClick={() => {
                setIsAuthDialogOpen(true);
              }}
            >
              Войти или зарегистрироваться
            </button>
          </div>
        )}

        {!isUnavailable && user && (
          <div>
            <p>
              После принятия приглашения ты получишь доступ к доске с ролью{' '}
              <strong>{formatRole(invitation.role)}</strong>.
            </p>

            <button
              type="button"
              disabled={acceptMutation.isPending}
              onClick={() => {
                void handleAccept();
              }}
            >
              {acceptMutation.isPending ? 'Принятие приглашения…' : 'Принять приглашение'}
            </button>
          </div>
        )}

        {acceptError && <p role="alert">{acceptError}</p>}
      </section>

      {isAuthDialogOpen && (
        <AuthDialog
          onClose={() => {
            setIsAuthDialogOpen(false);
          }}
        />
      )}
    </>
  );
}
