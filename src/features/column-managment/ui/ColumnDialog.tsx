import { useEffect, useRef } from 'react';
import type { ColumnFormValues } from '../model/column-form';
import { ColumnForm } from './ColumnForm';
import styles from './ColumnDialog.module.scss';

type ColumnDialogProps = {
  title: string;
  submitLabel: string;
  defaultValues: ColumnFormValues;
  onSubmit: (values: ColumnFormValues) => void;
  onClose: () => void;
};

export function ColumnDialog({
  title,
  submitLabel,
  defaultValues,
  onSubmit,
  onClose,
}: ColumnDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    dialog.showModal();

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="column-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className={styles.content}>
        <header className={styles.header}>
          <h2 id="column-dialog-title">{title}</h2>

          <button type="button" aria-label="Закрыть окно" onClick={onClose}>
            ×
          </button>
        </header>

        <ColumnForm
          defaultValues={defaultValues}
          submitLabel={submitLabel}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </dialog>
  );
}
