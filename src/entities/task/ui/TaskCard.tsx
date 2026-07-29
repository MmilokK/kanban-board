import type { ReactNode } from 'react';

import clsx from 'clsx';

import type { Task, TaskId, TaskPriority } from '../model/types';

import styles from './TaskCard.module.scss';

type TaskCardProps = {
  task: Task;
  dragHandle?: ReactNode;
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

export function TaskCard({ task, dragHandle, onDeleteTask, onEditTask }: TaskCardProps) {
  const updatedDate = new Date(task.updatedAt);

  function handleDelete(): void {
    onDeleteTask(task.id);
  }

  function handleEdit(): void {
    onEditTask(task.id);
  }

  return (
    <article className={styles.card}>
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
        <div className={styles.updatedAt}>
          <span>Обновлено</span>

          <time dateTime={task.updatedAt}>{dateFormatter.format(updatedDate)}</time>
        </div>

        <div className={styles.actions}>
          <button className={styles.editButton} type="button" onClick={handleEdit}>
            Изменить
          </button>

          <button className={styles.deleteButton} type="button" onClick={handleDelete}>
            Удалить
          </button>
        </div>
      </footer>
    </article>
  );
}
