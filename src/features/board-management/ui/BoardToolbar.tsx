import type { BoardId } from '../../../shared/model/entity-ids';
import type { Board } from '../../../entities/board/model/types';
import styles from './BoardToolbar.module.scss';
import type { Task } from '../../../entities/task/model/types';
import { SaveBoardToAccountButton } from '../../cloud-board/ui/SaveBoardToAccountButton';

type BoardToolbarProps = {
  boards: Board[];
  activeBoardId: BoardId | null;
  onSelectBoard: (boardId: BoardId) => void;
  onCreateBoard: () => void;
  onRenameBoard: () => void;
  onDeleteBoard: () => void;
  openArchive: () => void;
  archivedTasks: Task[];
};

export function BoardToolbar({
  boards,
  activeBoardId,
  onSelectBoard,
  onCreateBoard,
  onRenameBoard,
  onDeleteBoard,
  openArchive,
  archivedTasks,
}: BoardToolbarProps) {
  const hasActiveBoard = activeBoardId !== null;

  return (
    <div className={styles.toolbar} role="toolbar" aria-label="Управление досками">
      <div className={styles.selector}>
        <label htmlFor="board-select">Доска</label>

        <select
          id="board-select"
          value={activeBoardId ?? ''}
          disabled={boards.length === 0}
          onChange={(event) => {
            onSelectBoard(event.target.value);
          }}
        >
          {boards.length === 0 && <option value="">Нет досок</option>}

          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.title}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onCreateBoard}>
          Новая доска
        </button>

        <button type="button" disabled={!hasActiveBoard} onClick={onRenameBoard}>
          Переименовать
        </button>

        <button type="button" disabled={!hasActiveBoard} onClick={onDeleteBoard}>
          Удалить
        </button>

        <SaveBoardToAccountButton boardId={activeBoardId || ''} />

        <button type="button" onClick={openArchive} aria-controls="task-archive">
          Архив ({archivedTasks.length})
        </button>
      </div>
    </div>
  );
}
