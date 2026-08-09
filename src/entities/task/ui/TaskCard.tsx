import type { ReactNode } from 'react';

import clsx from 'clsx';

import type { Task, TaskPriority } from '../model/types';

import styles from './TaskCard.module.scss';
import type { TaskId } from '../../../shared/model/entity-ids';
import { formatTaskDueDate, getTaskDueStatus } from '../model/task-due-date';

type TaskCardProps = {
  task: Task;
  dragHandle?: ReactNode;
  isCompletedColumn: boolean;
  onDeleteTask: (taskId: TaskId) => void;
  onEditTask: (taskId: TaskId) => void;
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
  onDeleteTask,
  onEditTask,
}: TaskCardProps) {
  const updatedDate = new Date(task.updatedAt);
  const dueStatus = getTaskDueStatus(task.dueDate, isCompletedColumn);

  function handleDelete(): void {
    onDeleteTask(task.id);
  }

  function handleEdit(): void {
    onEditTask(task.id);
  }

  return (
    <article className={styles.card} data-due-status={dueStatus}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          {dragHandle}

          <h3 className={styles.title}>{task.title}</h3>
        </div>

        <span className={clsx(styles.priority, priorityClassNames[task.priority])}>
          {priorityLabels[task.priority]}
        </span>
      </div>

      {task.description && <p className={styles.description}>{task.description}</p>}

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
            onClick={handleEdit}
            aria-label={`Изменить задачу ${task.title}`}
          >
            Изменить
          </button>

          <button
            className={styles.deleteButton}
            type="button"
            onClick={handleDelete}
            aria-label={`Удалить задачу ${task.title}`}
          >
            Удалить
          </button>
        </div>
      </footer>
    </article>
  );
}
