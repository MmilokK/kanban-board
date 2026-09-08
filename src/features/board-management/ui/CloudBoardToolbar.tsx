import type { ApiBoardListItem } from '../../../entities/board/api/board-api.types';

type CloudBoardToolbarProps = {
  boards: ApiBoardListItem[];
  activeBoardId: string | null;
  archivedTaskCount: number;
  canEdit: boolean;
  canDelete: boolean;
  canManageInvitations: boolean;
  onSelectBoard: (boardId: string) => void;
  onCreateBoard: () => void;
  onRenameBoard: () => void;
  onDeleteBoard: () => void;
  onOpenArchive: () => void;
  onOpenInvitations: () => void;
};

export function CloudBoardToolbar({
  boards,
  activeBoardId,
  archivedTaskCount,
  canEdit,
  canDelete,
  canManageInvitations,
  onSelectBoard,
  onCreateBoard,
  onRenameBoard,
  onDeleteBoard,
  onOpenArchive,
  onOpenInvitations,
}: CloudBoardToolbarProps) {
  const hasActiveBoard = activeBoardId !== null;

  return (
    <div>
      <label>
        Облачная доска
        <select
          value={activeBoardId ?? ''}
          onChange={(event) => {
            if (!event.target.value) return;

            onSelectBoard(event.target.value);
          }}
        >
          {!activeBoardId && (
            <option value="" disabled>
              Выберите доску
            </option>
          )}

          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.title}
            </option>
          ))}
        </select>
      </label>

      <button type="button" onClick={onCreateBoard}>
        Новая облачная доска
      </button>

      <button type="button" disabled={!hasActiveBoard || !canEdit} onClick={onRenameBoard}>
        Переименовать
      </button>

      <button type="button" disabled={!hasActiveBoard || !canDelete} onClick={onDeleteBoard}>
        Удалить
      </button>

      <button type="button" disabled={!hasActiveBoard} onClick={onOpenArchive}>
        Архив
        {archivedTaskCount > 0 ? ` (${archivedTaskCount})` : ''}
      </button>

      <button
        type="button"
        disabled={!hasActiveBoard || !canManageInvitations}
        onClick={onOpenInvitations}
      >
        Приглашения
      </button>
    </div>
  );
}
