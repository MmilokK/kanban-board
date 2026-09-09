import type { ReactNode } from 'react';
import clsx from 'clsx';
import type { Task, TaskPriority } from '../model/types';
import { formatTaskDueDate, getTaskDueStatus } from '../model/task-due-date';
import { getSubtaskProgress } from '../model/subtask-progress';
import type { TaskId } from '../../../shared/model/entity-ids';
import { SubtaskProgressIndicator } from './SubtaskProgressIndicator';
import styles from './TaskCard.module.scss';

type TaskCardProps = {
  task: Task;
  dragHandle?: ReactNode;
  isCompletedColumn: boolean;
  canEdit?: boolean;
  onDeleteTask: (taskId: TaskId) => void;
  onEditTask: (taskId: TaskId) => void;
  onArchive: () => void;
};

const priorityLabels: Record<TaskPriority, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
};

const priorityClassNames: Record<TaskPriority, string | undefined> = {
  low: styles.priorityLow,
  medium: styles.priorityMedium,
  high: styles.priorityHigh,
};

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export function TaskCard({
  task,
  dragHandle,
  isCompletedColumn,
  canEdit = true,
  onDeleteTask,
  onEditTask,
  onArchive,
}: TaskCardProps) {
  const updatedDate = new Date(task.updatedAt);
  const dueStatus = getTaskDueStatus(task.dueDate, isCompletedColumn);
  const subtaskProgress = getSubtaskProgress(task.subtasks);

  function handleDelete(): void {
    if (!canEdit) return;
    onDeleteTask(task.id);
  }

  function handleOpen(): void {
    onEditTask(task.id);
  }

  function handleArchive(): void {
    if (!canEdit) return;
    onArchive();
  }

  return (
    <article className={styles.card} data-due-status={dueStatus}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          {canEdit && dragHandle}

          <h3 className={styles.title}>{task.title}</h3>
        </div>

        <span className={clsx(styles.priority, priorityClassNames[task.priority])}>
          {priorityLabels[task.priority]}
        </span>
      </div>

      {task.description && <p className={styles.description}>{task.description}</p>}

      {task.subtasks.length > 0 && (
        <SubtaskProgressIndicator
          completed={subtaskProgress.completed}
          total={subtaskProgress.total}
          percentage={subtaskProgress.percentage}
          isCompleted={subtaskProgress.isCompleted}
        />
      )}

      {task.comments.length > 0 && (
        <span className={styles.commentCount} aria-label={`Комментариев: ${task.comments.length}`}>
          {task.comments.length} комм.
        </span>
      )}

      {!!task.tags.length && (
        <ul className={styles.tags} aria-label="Теги задачи">
          {task.tags.map((tag) => (
            <li className={styles.tag} key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      )}

      <footer className={styles.footer}>
        <div className={styles.dates}>
          <div className={styles.updatedAt}>
            <span>Обновлено</span>

            <time dateTime={task.updatedAt}>{dateFormatter.format(updatedDate)}</time>
          </div>

          {task.dueDate && (
            <p
              className={
                dueStatus === 'overdue'
                  ? styles.overdue
                  : dueStatus === 'today'
                    ? styles.dueToday
                    : styles.dueDate
              }
            >
              <span>Срок: {formatTaskDueDate(task.dueDate)}</span>

              {dueStatus === 'overdue' && <strong>Просрочено</strong>}

              {dueStatus === 'today' && <strong>Сегодня</strong>}
            </p>
          )}
        </div>

        <div className={styles.actions}>
          <button
            className={styles.editButton}
            type="button"
            onClick={handleOpen}
            aria-label={canEdit ? `Изменить задачу ${task.title}` : `Открыть задачу ${task.title}`}
          >
            {canEdit ? 'Изменить' : 'Открыть'}
          </button>

          {canEdit && (
            <>
              <button
                className={styles.deleteButton}
                type="button"
                onClick={handleDelete}
                aria-label={`Удалить задачу ${task.title}`}
              >
                Удалить
              </button>

              <button
                type="button"
                aria-label={`Архивировать задачу ${task.title}`}
                onClick={handleArchive}
              >
                В архив
              </button>
            </>
          )}
        </div>
      </footer>
    </article>
  );
}
