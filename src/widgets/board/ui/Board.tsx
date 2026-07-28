import type { BoardState } from '../../../entities/board/model/types';
import type { Task } from '../../../entities/task/model/types';

import { BoardColumn } from '../../../entities/column/ui/BoardColumn';

import styles from './Board.module.scss';

type BoardProps = {
  board: BoardState;
};

export function Board({ board }: BoardProps) {
  return (
    <section className={styles.board} aria-label="Kanban-доска">
      {board.columnOrder.map((columnId) => {
        const column = board.columns[columnId];

        const tasks = column.taskIds
          .map((taskId) => board.tasks[taskId])
          .filter((task): task is Task => task !== undefined);

        return <BoardColumn column={column} key={column.id} tasks={tasks} />;
      })}
    </section>
  );
}
