import { useState } from 'react';
import type { BoardRole } from '../../../entities/board-member/model/board-member';
import { BoardMembersDialog } from './BoardMembersDialog';
import styles from './BoardMembersButton.module.scss';

type BoardMembersButtonProps = {
  boardId: string;
  currentUserRole: BoardRole;
};

export function BoardMembersButton({ boardId, currentUserRole }: BoardMembersButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.button}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Участники
      </button>
      <BoardMembersDialog
        boardId={boardId}
        currentUserRole={currentUserRole}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
}
