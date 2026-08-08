import styles from './UndoSnackbar.module.scss';

type UndoSnackbarProps = {
  taskTitle: string;
  onUndo: () => void;
  onDismiss: () => void;
};

export function UndoSnackbar({ taskTitle, onUndo, onDismiss }: UndoSnackbarProps) {
  return (
    <div className={styles.snackbar} role="status" aria-live="polite">
      <p>Задача «{taskTitle}» удалена</p>

      <div className={styles.actions}>
        <button type="button" onClick={onUndo}>
          Отменить
        </button>

        <button type="button" aria-label="Закрыть уведомление" onClick={onDismiss}>
          ×
        </button>
      </div>
    </div>
  );
}
