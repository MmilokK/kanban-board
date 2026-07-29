import type { Column } from '../model/types';
import type { Task, TaskId } from '../../task/model/types';

import { TaskCard } from '../../task/ui/TaskCard';

import styles from './BoardColumn.module.scss';

type BoardColumnProps = {
  column: Column;
  tasks: Task[];
  onDeleteTask: (taskId: TaskId) => void;
};

export function BoardColumn({ column, tasks, onDeleteTask }: BoardColumnProps) {
  const titleId = `column-${column.id}-title`;

  return (
    <section className={styles.column} aria-labelledby={titleId}>
      <header className={styles.header}>
        <h2 className={styles.title} id={titleId}>
          {column.title}
        </h2>

        <span className={styles.counter} aria-label={`Количество задач: ${tasks.length}`}>
          {tasks.length}
        </span>
      </header>

      {tasks.length ? (
        <ul className={styles.taskList}>
          {tasks.map((task) => (
            <li className={styles.taskItem} key={task.id}>
              <TaskCard task={task} onDeleteTask={onDeleteTask} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyState}>В этой колонке пока нет задач</p>
      )}
    </section>
  );
}
