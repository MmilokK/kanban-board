import { useEffect, useRef } from 'react';
import type { BoardFormValues } from '../model/board-form';
import { BoardForm } from './BoardForm';
import styles from './BoardDialog.module.scss';

type BoardDialogProps = {
  title: string;
  submitLabel: string;
  defaultValues: BoardFormValues;
  onSubmit: (values: BoardFormValues) => void;
  onClose: () => void;
};

export function BoardDialog({
  title,
  submitLabel,
  defaultValues,
  onSubmit,
  onClose,
}: BoardDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="board-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
    >
      <div className={styles.content}>
        <header className={styles.header}>
          <h2 id="board-dialog-title">{title}</h2>

          <button type="button" aria-label="Закрыть окно" onClick={onClose}>
            ×
          </button>
        </header>

        <BoardForm
          defaultValues={defaultValues}
          submitLabel={submitLabel}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </dialog>
  );
}
