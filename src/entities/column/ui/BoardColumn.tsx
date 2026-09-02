import type { Column } from '../model/types';
import type { Task } from '../../task/model/types';
import { CollisionPriority } from '@dnd-kit/abstract';
import { useDroppable } from '@dnd-kit/react';
import clsx from 'clsx';
import { SortableTaskCard } from '../../../features/task-dnd/ui/SortableTaskCard';
import styles from './BoardColumn.module.scss';
import type { TaskId } from '../../../shared/model/entity-ids';

type BoardColumnProps = {
  column: Column;
  tasks: Task[];
  canEdit?: boolean;
  emptyMessage?: string;
  isTaskDragDisabled?: boolean;

  onCreateTask: (taskId: TaskId) => void;
  onEditTask: (taskId: TaskId) => void;
  onDeleteTask: (taskId: TaskId) => void;
  onArchiveTask: (taskId: TaskId) => void;

  onRenameColumn: () => void;
  onDeleteColumn: () => void;
  onMoveColumnLeft: () => void;
  onMoveColumnRight: () => void;

  canMoveColumnLeft: boolean;
  canMoveColumnRight: boolean;
};

export function BoardColumn({
  column,
  tasks,
  canEdit = true,
  emptyMessage = 'В колонке пока нет задач',
  isTaskDragDisabled = false,
  onCreateTask,
  onDeleteTask,
  onEditTask,
  onArchiveTask,
  onRenameColumn,
  onDeleteColumn,
  onMoveColumnLeft,
  onMoveColumnRight,
  canMoveColumnLeft,
  canMoveColumnRight,
}: BoardColumnProps) {
  const titleId = `column-${column.id}-title`;

  const { ref: droppableRef, isDropTarget } = useDroppable({
    id: column.id,
    accept: 'task',
    collisionPriority: CollisionPriority.Low,
  });

  function handleCreateTask(): void {
    if (!canEdit) return;
    onCreateTask(column.id);
  }

  return (
    <section
      className={clsx(styles.column, isDropTarget && canEdit && styles.dropTarget)}
      ref={droppableRef}
      aria-labelledby={titleId}
    >
      <header className={styles.header}>
        <div className={styles.title}>
          <h2 id={titleId}>{column.title}</h2>

          <span className={styles.counter} aria-label={`Количество задач: ${tasks.length}`}>
            {tasks.length}
          </span>
        </div>

        {canEdit && (
          <div className={styles.columnActions} aria-label={`Управление колонкой ${column.title}`}>
            <button
              type="button"
              aria-label={`Переместить колонку ${column.title} влево`}
              disabled={!canMoveColumnLeft}
              onClick={onMoveColumnLeft}
            >
              ←
            </button>

            <button
              type="button"
              aria-label={`Переместить колонку ${column.title} вправо`}
              disabled={!canMoveColumnRight}
              onClick={onMoveColumnRight}
            >
              →
            </button>

            <button
              type="button"
              aria-label={`Переименовать колонку ${column.title}`}
              onClick={onRenameColumn}
            >
              Переименовать
            </button>

            <button
              type="button"
              aria-label={`Удалить колонку ${column.title}`}
              onClick={onDeleteColumn}
            >
              Удалить
            </button>
          </div>
        )}
      </header>

      {canEdit && (
        <button className={styles.addButton} type="button" onClick={handleCreateTask}>
          Добавить задачу
        </button>
      )}

      {tasks.length ? (
        <ul className={styles.taskList}>
          {tasks.map((task, index) => (
            <SortableTaskCard
              columnId={column.id}
              index={index}
              key={task.id}
              task={task}
              canEdit={canEdit}
              isCompletedColumn={column.isCompleted}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
              onArchive={() => {
                if (!canEdit) return;
                onArchiveTask(task.id);
              }}
              isDragDisabled={!canEdit || isTaskDragDisabled}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.emptyState}>{emptyMessage}</p>
      )}
    </section>
  );
}
