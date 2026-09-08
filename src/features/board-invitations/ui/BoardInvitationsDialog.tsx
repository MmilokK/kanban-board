import { useEffect, useRef, useState, type FormEvent } from 'react';

import {
  useBoardInvitationsQuery,
  useCreateEmailBoardInvitationMutation,
  useCreateLinkBoardInvitationMutation,
  useRevokeBoardInvitationMutation,
} from '../api/board-invitations.queries';

import type { BoardInvitation, BoardInvitationRole } from '../api/board-invitations-api';

type BoardInvitationsDialogProps = {
  boardId: string | null;
  isOpen: boolean;
  onClose: () => void;
};

function formatRole(role: BoardInvitationRole): string {
  switch (role) {
    case 'EDITOR':
      return 'Редактор';

    case 'VIEWER':
      return 'Наблюдатель';
  }
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function getInvitationStatus(invitation: BoardInvitation): string {
  if (invitation.revokedAt) {
    return 'Отозвано';
  }

  if (new Date(invitation.expiresAt).getTime() <= Date.now()) {
    return 'Истекло';
  }

  if (invitation.maxUses !== null && invitation.usedCount >= invitation.maxUses) {
    return 'Лимит исчерпан';
  }

  return 'Активно';
}

function getInvitationLink(token: string): string {
  return `${window.location.origin}/invitations/${encodeURIComponent(token)}`;
}

export function BoardInvitationsDialog({ boardId, isOpen, onClose }: BoardInvitationsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [email, setEmail] = useState('');
  const [emailRole, setEmailRole] = useState<BoardInvitationRole>('EDITOR');

  const [linkRole, setLinkRole] = useState<BoardInvitationRole>('VIEWER');

  const [expiresInDays, setExpiresInDays] = useState(7);
  const [limitUses, setLimitUses] = useState(false);
  const [maxUses, setMaxUses] = useState(1);

  const [createdLink, setCreatedLink] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const invitationsQuery = useBoardInvitationsQuery(boardId ?? '', {
    enabled: isOpen && boardId !== null,
  });

  const createEmailMutation = useCreateEmailBoardInvitationMutation(boardId ?? '');

  const createLinkMutation = useCreateLinkBoardInvitationMutation(boardId ?? '');

  const revokeMutation = useRevokeBoardInvitationMutation(boardId ?? '');

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
      return;
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const invitations = invitationsQuery.data?.invitations ?? [];

  const activeInvitations = invitations.filter(
    (invitation) => getInvitationStatus(invitation) === 'Активно',
  );

  const inactiveInvitations = invitations.filter(
    (invitation) => getInvitationStatus(invitation) !== 'Активно',
  );

  const isCreating = createEmailMutation.isPending || createLinkMutation.isPending;

  function handleClose() {
    setCreatedLink(null);
    setCopyStatus(null);
    onClose();
  }

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!boardId) {
      return;
    }

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      return;
    }

    await createEmailMutation.mutateAsync({
      email: normalizedEmail,
      role: emailRole,
    });

    setEmail('');
  }

  async function handleLinkSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!boardId) {
      return;
    }

    const response = await createLinkMutation.mutateAsync({
      role: linkRole,
      expiresInDays,
      maxUses: limitUses ? maxUses : null,
    });

    setCreatedLink(getInvitationLink(response.invitation.token));
    setCopyStatus(null);
  }

  async function handleCopyLink(link: string) {
    try {
      await navigator.clipboard.writeText(link);
      setCopyStatus('Ссылка скопирована');
    } catch {
      setCopyStatus('Не удалось скопировать ссылку');
    }
  }

  async function handleRevoke(invitationId: string) {
    if (!boardId) {
      return;
    }

    await revokeMutation.mutateAsync(invitationId);
  }

  function renderInvitation(invitation: BoardInvitation) {
    const status = getInvitationStatus(invitation);
    const isActive = status === 'Активно';

    return (
      <li key={invitation.id}>
        <div>
          <strong>
            {invitation.type === 'EMAIL' ? invitation.email : 'Приглашение по ссылке'}
          </strong>

          <div>Роль: {formatRole(invitation.role)}</div>

          <div>Статус: {status}</div>

          <div>Действует до: {formatDate(invitation.expiresAt)}</div>

          {invitation.type === 'LINK' && (
            <div>
              Использований: {invitation.usedCount}
              {invitation.maxUses !== null ? ` / ${invitation.maxUses}` : ' / без ограничений'}
            </div>
          )}

          {invitation.type === 'EMAIL' && (
            <div>Использовано: {invitation.usedCount > 0 ? 'Да' : 'Нет'}</div>
          )}
        </div>

        {isActive && invitation.type === 'LINK' && (
          <button
            type="button"
            onClick={() => {
              void handleCopyLink(getInvitationLink(invitation.token));
            }}
          >
            Копировать ссылку
          </button>
        )}

        {isActive && (
          <button
            type="button"
            disabled={revokeMutation.isPending}
            onClick={() => {
              void handleRevoke(invitation.id);
            }}
          >
            Отозвать
          </button>
        )}
      </li>
    );
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="board-invitations-title"
      onClose={handleClose}
      onCancel={(event) => {
        event.preventDefault();
        handleClose();
      }}
    >
      <div>
        <header>
          <h2 id="board-invitations-title">Приглашения на доску</h2>

          <button type="button" aria-label="Закрыть приглашения" onClick={handleClose}>
            ×
          </button>
        </header>

        <section>
          <h3>Пригласить по email</h3>

          <form onSubmit={(event) => void handleEmailSubmit(event)}>
            <label>
              Email
              <input
                type="email"
                value={email}
                required
                disabled={isCreating}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </label>

            <label>
              Роль
              <select
                value={emailRole}
                disabled={isCreating}
                onChange={(event) => {
                  setEmailRole(event.target.value as BoardInvitationRole);
                }}
              >
                <option value="EDITOR">Редактор</option>

                <option value="VIEWER">Наблюдатель</option>
              </select>
            </label>

            <button type="submit" disabled={isCreating || !email.trim()}>
              Отправить приглашение
            </button>
          </form>

          {createEmailMutation.isError && (
            <p role="alert">Не удалось создать приглашение по email</p>
          )}

          {createEmailMutation.isSuccess && <p role="status">Приглашение по email создано</p>}
        </section>

        <section>
          <h3>Приглашение по ссылке</h3>

          <form onSubmit={(event) => void handleLinkSubmit(event)}>
            <label>
              Роль
              <select
                value={linkRole}
                disabled={isCreating}
                onChange={(event) => {
                  setLinkRole(event.target.value as BoardInvitationRole);
                }}
              >
                <option value="EDITOR">Редактор</option>

                <option value="VIEWER">Наблюдатель</option>
              </select>
            </label>

            <label>
              Срок действия, дней
              <input
                type="number"
                min={1}
                max={30}
                value={expiresInDays}
                disabled={isCreating}
                onChange={(event) => {
                  setExpiresInDays(Number(event.target.value));
                }}
              />
            </label>

            <label>
              <input
                type="checkbox"
                checked={limitUses}
                disabled={isCreating}
                onChange={(event) => {
                  setLimitUses(event.target.checked);
                }}
              />
              Ограничить количество использований
            </label>

            {limitUses && (
              <label>
                Максимум использований
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={maxUses}
                  disabled={isCreating}
                  onChange={(event) => {
                    setMaxUses(Number(event.target.value));
                  }}
                />
              </label>
            )}

            <button type="submit" disabled={isCreating}>
              Создать ссылку
            </button>
          </form>

          {createLinkMutation.isError && (
            <p role="alert">Не удалось создать приглашение по ссылке</p>
          )}

          {createdLink && (
            <div>
              <label>
                Ссылка приглашения
                <input type="text" readOnly value={createdLink} />
              </label>

              <button
                type="button"
                onClick={() => {
                  void handleCopyLink(createdLink);
                }}
              >
                Копировать
              </button>
            </div>
          )}

          {copyStatus && <p role="status">{copyStatus}</p>}
        </section>

        <section>
          <h3>
            Активные приглашения
            {activeInvitations.length > 0 ? ` (${activeInvitations.length})` : ''}
          </h3>

          {invitationsQuery.isPending && <p>Загрузка приглашений…</p>}

          {invitationsQuery.isError && <p role="alert">Не удалось загрузить приглашения</p>}

          {invitationsQuery.isSuccess && activeInvitations.length === 0 && (
            <p>Активных приглашений нет.</p>
          )}

          {activeInvitations.length > 0 && <ul>{activeInvitations.map(renderInvitation)}</ul>}
        </section>

        {inactiveInvitations.length > 0 && (
          <section>
            <h3>Неактивные приглашения ({inactiveInvitations.length})</h3>

            <ul>{inactiveInvitations.map(renderInvitation)}</ul>
          </section>
        )}

        <footer>
          <button type="button" onClick={handleClose}>
            Закрыть
          </button>
        </footer>
      </div>
    </dialog>
  );
}
