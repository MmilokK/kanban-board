import { useBoardMembers } from '../../../entities/board-member/api/use-board-members';
import type { BoardRole } from '../../../entities/board-member/model/board-member';
import { canManageBoardMembers } from '../../../entities/board-member/model/board-member';
import { useRemoveBoardMember } from '../api/use-remove-board-member';

import { useUpdateBoardMemberRole } from '../api/use-update-board-member-role';
import styles from './BoardMembers.module.scss';

type BoardMembersProps = {
  boardId: string;
  currentUserRole: BoardRole;
};

function getRoleLabel(role: BoardRole): string {
  switch (role) {
    case 'OWNER':
      return 'Владелец';
    case 'EDITOR':
      return 'Редактор';
    case 'VIEWER':
      return 'Наблюдатель';
  }
}

export function BoardMembers({ boardId, currentUserRole }: BoardMembersProps) {
  const membersQuery = useBoardMembers(boardId);
  const updateRoleMutation = useUpdateBoardMemberRole(boardId);
  const removeMemberMutation = useRemoveBoardMember(boardId);
  const canManage = canManageBoardMembers(currentUserRole);

  if (membersQuery.isPending) {
    return <p className={styles.status}>Загрузка участников...</p>;
  }

  if (membersQuery.isError) {
    return (
      <p className={styles.error} role="alert">
        Не удалось загрузить участников доски.
      </p>
    );
  }

  return (
    <section className={styles.container} aria-labelledby="board-members-title">
      <header className={styles.header}>
        <div>
          <h2 id="board-members-title" className={styles.title}>
            Участники
          </h2>
          <p className={styles.description}>Пользователи, имеющие доступ к этой доске.</p>
        </div>
        <span className={styles.count}>{membersQuery.data.length}</span>
      </header>

      <ul className={styles.list}>
        {membersQuery.data.map((member) => {
          const isOwner = member.role === 'OWNER';
          const displayName = member.user.name?.trim() || member.user.email;

          return (
            <li key={member.id} className={styles.member}>
              <div className={styles.user}>
                <strong className={styles.name}>{displayName}</strong>

                {member.user.name ? (
                  <span className={styles.email}>{member.user.email}</span>
                ) : null}
              </div>

              <div className={styles.actions}>
                {canManage && !isOwner ? (
                  <select
                    className={styles.select}
                    aria-label={`Роль участника ${displayName}`}
                    value={member.role}
                    disabled={updateRoleMutation.isPending || removeMemberMutation.isPending}
                    onChange={(event) => {
                      const role = event.target.value as 'EDITOR' | 'VIEWER';
                      updateRoleMutation.mutate({
                        userId: member.user.id,
                        role,
                      });
                    }}
                  >
                    <option value="EDITOR">Редактор</option>
                    <option value="VIEWER">Наблюдатель</option>
                  </select>
                ) : (
                  <span className={styles.role}>{getRoleLabel(member.role)}</span>
                )}

                {canManage && !isOwner ? (
                  <button
                    type="button"
                    className={styles.removeButton}
                    disabled={removeMemberMutation.isPending || updateRoleMutation.isPending}
                    aria-label={`Удалить участника ${displayName}`}
                    onClick={() => {
                      const confirmed = window.confirm(
                        `Удалить участника «${displayName}» из доски?`,
                      );
                      if (!confirmed) {
                        return;
                      }
                      removeMemberMutation.mutate(member.user.id);
                    }}
                  >
                    Удалить
                  </button>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>

      {updateRoleMutation.isError ? (
        <p className={styles.error} role="alert">
          Не удалось изменить роль участника.
        </p>
      ) : null}

      {removeMemberMutation.isError ? (
        <p className={styles.error} role="alert">
          Не удалось удалить участника.
        </p>
      ) : null}
    </section>
  );
}
