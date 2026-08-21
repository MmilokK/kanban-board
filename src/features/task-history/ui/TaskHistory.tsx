import { formatTaskHistoryEvent } from '../../../entities/task/model/format-task-history-event';
import type { TaskHistoryEvent } from '../../../entities/task/model/task-history';
import styles from './TaskHistory.module.scss';

type TaskHistoryProps = {
  events: TaskHistoryEvent[];
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function TaskHistory({ events }: TaskHistoryProps) {
  return (
    <section className={styles.container} aria-labelledby="task-history-title">
      <header className={styles.header}>
        <h3 id="task-history-title">История</h3>

        <span>{events.length}</span>
      </header>

      {events.length === 0 ? (
        <p className={styles.emptyState}>История изменений пока пуста.</p>
      ) : (
        <ol className={styles.list}>
          {events.map((event) => (
            <li key={event.id} className={styles.event}>
              <span className={styles.marker} aria-hidden="true" />

              <div className={styles.content}>
                <p>{formatTaskHistoryEvent(event)}</p>

                <time dateTime={event.createdAt}>{formatDate(event.createdAt)}</time>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
