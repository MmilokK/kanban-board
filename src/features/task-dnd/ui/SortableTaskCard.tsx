import { useSortable } from '@dnd-kit/react/sortable';
import clsx from 'clsx';

import type { Task } from '../../../entities/task/model/types';
import { TaskCard } from '../../../entities/task/ui/TaskCard';

import styles from './SortableTaskCard.module.scss';
import type { ColumnId, TaskId } from '../../../shared/model/entity-ids';

type SortableTaskCardProps = {
  task: Task;
  index: number;
  columnId: ColumnId;
  onDeleteTask: (taskId: TaskId) => void;
  onEditTask: (taskId: TaskId) => void;
};

export function SortableTaskCard({
  task,
  index,
  columnId,
  onDeleteTask,
  onEditTask,
}: SortableTaskCardProps) {
  const { ref, handleRef, isDragging, isDropTarget } = useSortable({
    id: task.id,
    index,
    group: columnId,
    type: 'task',
    accept: 'task',
  });

  const dragHandle = (
    <button
      className={styles.dragHandle}
      ref={handleRef}
      type="button"
      aria-label={`Переместить задачу «${task.title}»`}
    >
      <span aria-hidden="true">⠿</span>
    </button>
  );

  return (
    <li
      className={clsx(
        styles.item,
        isDragging && styles.dragging,
        isDropTarget && styles.dropTarget,
      )}
      ref={ref}
    >
      <TaskCard
        dragHandle={dragHandle}
        task={task}
        onDeleteTask={onDeleteTask}
        onEditTask={onEditTask}
      />
    </li>
  );
}
