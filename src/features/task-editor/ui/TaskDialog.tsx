import { useEffect, useRef } from 'react';

import type {
  CreateSubtaskInput,
  CreateTaskCommentInput,
  CreateTaskInput,
  Task,
  UpdateSubtaskInput,
  UpdateTaskCommentInput,
} from '../../../entities/task/model/types';

import { parseTaskTags, type TaskFormValues } from '../model/task-form';

import { TaskForm } from './TaskForm';

import styles from './TaskDialog.module.scss';
import type { ColumnId, CommentId, SubtaskId } from '../../../shared/model/entity-ids';
import { SubtaskList } from '../../subtask-management/ui/SubtaskList';
import { TaskComments } from '../../task-comments/ui/TaskComments';
import type { Column } from '../../../entities/column/model/types';
import { TaskHistory } from '../../task-history/ui/TaskHistory';

type TaskDialogProps = {
  task: Task | null;
  columns?: Record<ColumnId, Column>;
  title: string;
  submitLabel: string;
  onSubmit: (values: CreateTaskInput) => void;
  onClose: () => void;
  onAddSubtask?: (input: CreateSubtaskInput) => void;
  onUpdateSubtask?: (subtaskId: SubtaskId, input: UpdateSubtaskInput) => void;
  onToggleSubtask?: (subtaskId: SubtaskId) => void;
  onDeleteSubtask?: (subtaskId: SubtaskId) => void;
  onAddComment?: (input: CreateTaskCommentInput) => void;
  onUpdateComment?: (commentId: CommentId, input: UpdateTaskCommentInput) => void;
  onDeleteComment?: (commentId: CommentId) => void;
};

export function TaskDialog({
  task,
  columns,
  title,
  submitLabel,
  onSubmit,
  onClose,
  onAddSubtask,
  onUpdateSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
}: TaskDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  function handleSubmit(values: TaskFormValues): void {
    const input: CreateTaskInput = {
      ...values,
      tags: parseTaskTags(values.tags),
      dueDate: values.dueDate || null,
    };
    onSubmit(input);
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
        {task && onAddSubtask && onUpdateSubtask && onToggleSubtask && onDeleteSubtask && (
          <SubtaskList
            subtasks={task.subtasks}
            onAdd={onAddSubtask}
            onUpdate={onUpdateSubtask}
            onToggle={onToggleSubtask}
            onDelete={onDeleteSubtask}
          />
        )}

        {task && onAddComment && onUpdateComment && onDeleteComment && (
          <TaskComments
            comments={task.comments}
            onAdd={onAddComment}
            onUpdate={onUpdateComment}
            onDelete={onDeleteComment}
          />
        )}
        {task && columns && <TaskHistory events={task.history} />}
      </div>
    </dialog>
  );
}
