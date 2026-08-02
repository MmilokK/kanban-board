import type { Column } from '../model/types';
import type { Task } from '../../task/model/types';

import { CollisionPriority } from '@dnd-kit/abstract';
import { useDroppable } from '@dnd-kit/react';
import clsx from 'clsx';

import { SortableTaskCard } from '../../../features/task-dnd/ui/SortableTaskCard';

import styles from './BoardColumn.module.scss';
import type { ColumnId, TaskId } from '../../../shared/model/entity-ids';

type BoardColumnProps = {
  column: Column;
  tasks: Task[];
  onCreateTask: (columnId: ColumnId) => void;
  onDeleteTask: (taskId: TaskId) => void;
  onEditTask: (taskId: TaskId) => void;
};

export function BoardColumn({
  column,
  tasks,
  onCreateTask,
  onDeleteTask,
  onEditTask,
}: BoardColumnProps) {
  const titleId = `column-${column.id}-title`;

  const { ref: droppableRef, isDropTarget } = useDroppable({
    id: column.id,
    accept: 'task',
    collisionPriority: CollisionPriority.Low,
  });

  function handleCreateTask(): void {
    onCreateTask(column.id);
  }

  return (
    <section
      className={clsx(styles.column, isDropTarget && styles.dropTarget)}
      ref={droppableRef}
      aria-labelledby={titleId}
    >
      <header className={styles.header}>
        <h2 className={styles.title} id={titleId}>
          {column.title}
        </h2>

        <span className={styles.counter} aria-label={`Количество задач: ${tasks.length}`}>
          {tasks.length}
        </span>
      </header>

      <button className={styles.addButton} type="button" onClick={handleCreateTask}>
        Добавить задачу
      </button>

      {tasks.length > 0 ? (
        <ul className={styles.taskList}>
          {tasks.map((task, index) => (
            <SortableTaskCard
              columnId={column.id}
              index={index}
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.emptyState}>Перетащи задачу сюда</p>
      )}
    </section>
  );
}
