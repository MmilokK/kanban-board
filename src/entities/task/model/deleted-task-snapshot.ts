import type { ColumnId } from '../../../shared/model/entity-ids';
import type { Column } from '../../column/model/types';

import type { Task } from './types';

export type DeletedTaskSnapshot = {
  task: Task;
  columnId: ColumnId;
  index: number;
};

export function createDeletedTaskSnapshot(task: Task, column: Column): DeletedTaskSnapshot | null {
  const index = column.taskIds.indexOf(task.id);

  if (index === -1) {
    return null;
  }

  return {
    task,
    columnId: column.id,
    index,
  };
}
