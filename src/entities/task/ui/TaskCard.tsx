import type { Task, TaskPriority } from '../model/types';

import styles from './TaskCard.module.scss';

type TaskCardProps = {
  task: Task;
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

export function TaskCard({ task }: TaskCardProps) {
  const updatedDate = new Date(task.updatedAt);

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{task.title}</h3>

        <span className={`${styles.priority} ${priorityClassNames[task.priority]}`}>
          {priorityLabels[task.priority]}
        </span>
      </div>

      {task.description && <p className={styles.description}>{task.description}</p>}

      {task.tags.length && (
        <ul className={styles.tags} aria-label="Теги задачи">
          {task.tags.map((tag) => (
            <li className={styles.tag} key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      )}

      <footer className={styles.footer}>
        <span>Обновлено</span>

        <time dateTime={task.updatedAt}>{dateFormatter.format(updatedDate)}</time>
      </footer>
    </article>
  );
}
