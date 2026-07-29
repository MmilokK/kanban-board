import { useShallow } from 'zustand/react/shallow';
import { useBoardStore } from '../../../entities/board/model/board-store';
import styles from './Board.module.scss';
import type { Task } from '../../../entities/task/model/types';
import { BoardColumn } from '../../../entities/column/ui/BoardColumn';

export function Board() {
  const { tasks, columns, columnOrder, deleteTask } = useBoardStore(
    useShallow((state) => ({
      tasks: state.tasks,
      columns: state.columns,
      columnOrder: state.columnOrder,
      deleteTask: state.deleteTask,
    })),
  );

  return (
    <section className={styles.board} aria-label="Kanban-доска">
      {columnOrder.map((columnId) => {
        const column = columns[columnId];

        const columnTasks = column.taskIds
          .map((taskId) => tasks[taskId])
          .filter((task): task is Task => task !== undefined);

        return (
          <BoardColumn
            key={column.id}
            column={column}
            tasks={columnTasks}
            onDeleteTask={deleteTask}
          />
        );
      })}
    </section>
  );
}
