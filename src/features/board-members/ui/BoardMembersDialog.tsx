import type { BoardRole } from '../../../entities/board-member/model/board-member';
import { BoardMembers } from './BoardMembers';
import styles from './BoardMembersDialog.module.scss';

type BoardMembersDialogProps = {
  boardId: string;
  currentUserRole: BoardRole;
  isOpen: boolean;
  onClose: () => void;
};

export function BoardMembersDialog({
  boardId,
  currentUserRole,
  isOpen,
  onClose,
}: BoardMembersDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="board-members-dialog-title"
      >
        <header className={styles.header}>
          <h2 id="board-members-dialog-title" className={styles.title}>
            Участники доски
          </h2>
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Закрыть список участников"
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <BoardMembers boardId={boardId} currentUserRole={currentUserRole} />
      </section>
    </div>
  );
}
