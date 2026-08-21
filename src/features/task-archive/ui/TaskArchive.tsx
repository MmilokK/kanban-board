import { useState } from 'react';
import type { Column } from '../../../entities/column/model/types';
import type { Task } from '../../../entities/task/model/types';
import type { ColumnId, TaskId } from '../../../shared/model/entity-ids';
import styles from './TaskArchive.module.scss';

type TaskArchiveProps = {
  tasks: Task[];

  columns: Column[];

  onRestore: (taskId: TaskId, columnId: ColumnId) => void;

  onDelete: (taskId: TaskId) => void;

  onClose: () => void;
};

export function TaskArchive({ tasks, columns, onRestore, onDelete, onClose }: TaskArchiveProps) {
  const [restoreColumnByTask, setRestoreColumnByTask] = useState<Record<string, ColumnId>>({});

  function getSelectedColumnId(taskId: TaskId): ColumnId | undefined {
    return restoreColumnByTask[taskId] ?? columns[0]?.id;
  }

  return (
    <section className={styles.archive} id="task-archive" aria-labelledby="task-archive-title">
      <header className={styles.header}>
        <div>
          <h2 id="task-archive-title">Архив задач</h2>

          <p>Архивировано: {tasks.length}</p>
        </div>

        <button type="button" onClick={onClose}>
          Закрыть архив
        </button>
      </header>

      {tasks.length === 0 ? (
        <div className={styles.emptyState}>
          <p>В архиве пока нет задач.</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {tasks.map((task) => {
            const selectedColumnId = getSelectedColumnId(task.id);

            return (
              <li key={task.id} className={styles.item}>
                <div className={styles.content}>
                  <strong>{task.title}</strong>

                  {task.description && <p>{task.description}</p>}

                  {task.archivedAt && (
                    <time dateTime={task.archivedAt}>
                      Архивировано: {new Date(task.archivedAt).toLocaleString('ru-RU')}
                    </time>
                  )}
                </div>

                <div className={styles.restore}>
                  <label htmlFor={`restore-column-${task.id}`}>Восстановить в</label>

                  <select
                    id={`restore-column-${task.id}`}
                    value={selectedColumnId ?? ''}
                    disabled={columns.length === 0}
                    onChange={(event) => {
                      console.log({ event, restoreColumnByTask });
                      setRestoreColumnByTask((current) => ({
                        ...current,

                        [task.id]: event.target.value as ColumnId,
                      }));
                    }}
                  >
                    {columns.map((column) => (
                      <option key={column.id} value={column.id}>
                        {column.title}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    disabled={!selectedColumnId}
                    onClick={() => {
                      if (!selectedColumnId) {
                        return;
                      }

                      onRestore(task.id, selectedColumnId);
                    }}
                  >
                    Восстановить
                  </button>

                  <button
                    type="button"
                    aria-label={`Удалить из архива задачу ${task.title}`}
                    onClick={() => {
                      onDelete(task.id);
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
