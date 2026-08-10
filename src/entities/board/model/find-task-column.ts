import type { ColumnId, TaskId } from '../../../shared/model/entity-ids';

import type { Column } from '../../column/model/types';

export function findTaskColumn(
  columns: Record<ColumnId, Column>,
  taskId: TaskId,
): Column | undefined {
  return Object.values(columns).find((column) => column.taskIds.includes(taskId));
}
