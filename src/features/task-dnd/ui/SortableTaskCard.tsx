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
  isCompletedColumn: boolean;
  canEdit?: boolean;
  isDragDisabled?: boolean;
  onArchive: () => void;
  onDeleteTask: (taskId: TaskId) => void;
  onEditTask: (taskId: TaskId) => void;
};

export function SortableTaskCard({
  task,
  index,
  columnId,
  isCompletedColumn,
  canEdit = true,
  isDragDisabled = false,
  onArchive,
  onDeleteTask,
  onEditTask,
}: SortableTaskCardProps) {
  const dragDisabled = !canEdit || isDragDisabled;

  const { ref, handleRef, isDragging, isDropTarget } = useSortable({
    id: task.id,
    index,
    group: columnId,
    type: 'task',
    accept: 'task',
    disabled: dragDisabled,
  });

  const dragHandle = canEdit ? (
    <button
      className={styles.dragHandle}
      ref={handleRef}
      type="button"
      aria-label={`Переместить задачу «${task.title}»`}
      disabled={dragDisabled}
    >
      <span aria-hidden="true">⠿</span>
    </button>
  ) : undefined;

  return (
    <li
      className={clsx(
        styles.item,
        isDragging && styles.dragging,
        isDropTarget && canEdit && styles.dropTarget,
      )}
      ref={ref}
    >
      <TaskCard
        dragHandle={dragHandle}
        task={task}
        canEdit={canEdit}
        isCompletedColumn={isCompletedColumn}
        onDeleteTask={onDeleteTask}
        onEditTask={onEditTask}
        onArchive={onArchive}
      />
    </li>
  );
}
