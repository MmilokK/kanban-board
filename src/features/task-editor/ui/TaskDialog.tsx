import { useEffect, useRef } from 'react';

import type { Task } from '../../../entities/task/model/types';

import type { TaskFormValues } from '../model/task-form';

import { TaskForm } from './TaskForm';

import styles from './TaskDialog.module.scss';

type TaskDialogProps = {
  task: Task | null;
  title: string;
  submitLabel: string;
  onSubmit: (values: TaskFormValues) => void;
  onClose: () => void;
};

export function TaskDialog({ task, title, submitLabel, onSubmit, onClose }: TaskDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  function handleSubmit(values: TaskFormValues): void {
    onSubmit(values);
    dialogRef.current?.close();
  }

  function handleCancel(): void {
    dialogRef.current?.close();
  }

  return (
    <dialog
      className={styles.dialog}
      ref={dialogRef}
      aria-labelledby="task-dialog-title"
      onClose={onClose}
    >
      <header className={styles.header}>
        <h2 className={styles.title} id="task-dialog-title">
          {title}
        </h2>

        <button
          className={styles.closeButton}
          type="button"
          aria-label="Закрыть окно"
          onClick={handleCancel}
        >
          <span aria-hidden="true">×</span>
        </button>
      </header>

      <div className={styles.content}>
        <TaskForm
          task={task}
          submitLabel={submitLabel}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </div>
    </dialog>
  );
}
