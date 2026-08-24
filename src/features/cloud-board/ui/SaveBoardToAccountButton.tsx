import { useState } from 'react';
import { useCurrentUser } from '../../../entities/user/api/use-current-user';
import { useImportBoard } from '../../../entities/board/api/use-import-board';
import { createLocalBoardImport } from '../../../entities/board/api/local-board-import';
import { useBoardStore } from '../../../entities/board/model/board-store';
import type { BoardId } from '../../../shared/model/entity-ids';
import { AuthDialog } from '../../auth/ui/AuthDialog';
import styles from './SaveBoardToAccountButton.module.scss';

type SaveBoardToAccountButtonProps = {
  boardId: BoardId;
};

export function SaveBoardToAccountButton({ boardId }: SaveBoardToAccountButtonProps) {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const { data: user } = useCurrentUser();
  const importMutation = useImportBoard();

  function saveBoard() {
    const state = useBoardStore.getState();
    const input = createLocalBoardImport(state, boardId);

    importMutation.mutate(input, {
      onSuccess: () => {
        setSaved(true);
      },
    });
  }

  function handleClick() {
    if (!user) {
      setAuthDialogOpen(true);
      return;
    }
    saveBoard();
  }

  return (
    <>
      <button
        className={styles.button}
        type="button"
        disabled={importMutation.isPending || saved}
        onClick={handleClick}
      >
        {saved
          ? 'Сохранено в аккаунте'
          : importMutation.isPending
            ? 'Сохранение...'
            : 'Сохранить в аккаунте'}
      </button>

      {importMutation.isError && (
        <p role="alert" className={styles.error}>
          Не удалось сохранить доску в аккаунте.
        </p>
      )}

      {authDialogOpen && (
        <AuthDialog
          onClose={() => {
            setAuthDialogOpen(false);
          }}
          onAuthenticated={() => {
            saveBoard();
          }}
        />
      )}
    </>
  );
}
