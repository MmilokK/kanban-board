import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createCloudBoard,
  deleteCloudBoard,
  renameCloudBoard,
} from '../../../entities/board/api/board-api';
import { boardQueryKeys } from '../../../entities/board/api/board-query-keys';
import type {
  ApiBoard,
  ApiBoardListItem,
  ApiBoardResponse,
} from '../../../entities/board/api/board-api.types';
import { useCloudBoard } from '../../../entities/board/api/use-cloud-board';
import { useCloudBoards } from '../../../entities/board/api/use-cloud-boards';
import {
  canDeleteBoard,
  canEditBoard,
  canManageBoardMembers,
} from '../../../entities/board-member/model/board-member';
import { BoardDialog } from '../../../features/board-management/ui/BoardDialog';
import type { BoardFormValues } from '../../../features/board-management/model/board-form';
import { CloudBoardToolbar } from '../../../features/board-management/ui/CloudBoardToolbar';
import { BoardMembersButton } from '../../../features/board-members/ui/BoardMembersButton';
import { BoardInvitationsDialog } from '../../../features/board-invitations/ui/BoardInvitationsDialog';
import { CloudBoard } from './CloudBoard';

type BoardEditorState =
  | {
      mode: 'create';
    }
  | {
      mode: 'rename';
      boardId: string;
    }
  | null;

type CloudBoardsProps = {
  initialBoardId?: string | null;
};

function getArchiveTaskCount(board: ApiBoard | undefined) {
  if (!board) return 0;

  const archiveColumn = board.columns.find((column) => column.isArchive);

  if (!archiveColumn) return 0;

  return board.tasks.filter((task) => task.columnId === archiveColumn.id).length;
}

export function CloudBoards({ initialBoardId = null }: CloudBoardsProps) {
  const queryClient = useQueryClient();
  const boardsQuery = useCloudBoards();

  const [activeBoardId, setActiveBoardId] = useState<string | null>(initialBoardId);
  const [boardEditorState, setBoardEditorState] = useState<BoardEditorState>(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isInvitationsOpen, setIsInvitationsOpen] = useState(false);

  const boards: ApiBoardListItem[] = boardsQuery.data ?? [];

  const effectiveActiveBoardId =
    activeBoardId && boards.some((board) => board.id === activeBoardId)
      ? activeBoardId
      : (boards[0]?.id ?? null);

  const activeBoardQuery = useCloudBoard(effectiveActiveBoardId ?? '');

  const createBoardMutation = useMutation({
    mutationFn: ({ title }: { title: string }) => createCloudBoard(title),

    onSuccess: async (response: ApiBoardResponse) => {
      queryClient.setQueryData(boardQueryKeys.detail(response.board.id), response);

      await queryClient.invalidateQueries({
        queryKey: boardQueryKeys.lists(),
      });

      setActiveBoardId(response.board.id);
      setBoardEditorState(null);
      setIsArchiveOpen(false);
      setIsInvitationsOpen(false);
    },
  });

  const renameBoardMutation = useMutation({
    mutationFn: ({ boardId, title }: { boardId: string; title: string }) =>
      renameCloudBoard(boardId, title),

    onSuccess: async (response: ApiBoardResponse) => {
      queryClient.setQueryData(boardQueryKeys.detail(response.board.id), response);

      await queryClient.invalidateQueries({
        queryKey: boardQueryKeys.lists(),
      });

      setBoardEditorState(null);
    },
  });

  const deleteBoardMutation = useMutation({
    mutationFn: ({ boardId }: { boardId: string }) => deleteCloudBoard(boardId),

    onSuccess: async (_response, variables) => {
      queryClient.removeQueries({
        queryKey: boardQueryKeys.detail(variables.boardId),
      });

      await queryClient.invalidateQueries({
        queryKey: boardQueryKeys.lists(),
      });

      setBoardEditorState(null);
      setIsArchiveOpen(false);
      setIsInvitationsOpen(false);
    },
  });

  const activeBoard = activeBoardQuery.data?.board;

  const archivedTaskCount = getArchiveTaskCount(activeBoard);

  const editingBoard =
    boardEditorState?.mode === 'rename'
      ? boards.find((board) => board.id === boardEditorState.boardId)
      : undefined;

  const canManageInvitations = canManageBoardMembers(activeBoard?.role ?? 'VIEWER');

  function handleSelectBoard(boardId: string) {
    if (boardId === effectiveActiveBoardId) {
      return;
    }

    setActiveBoardId(boardId);
    setBoardEditorState(null);
    setIsArchiveOpen(false);
    setIsInvitationsOpen(false);
  }

  function handleOpenCreateBoard() {
    setBoardEditorState({
      mode: 'create',
    });
  }

  function handleOpenRenameBoard() {
    if (!effectiveActiveBoardId || !activeBoard) return;
    if (!canEditBoard(activeBoard.role)) return;

    setBoardEditorState({
      mode: 'rename',
      boardId: effectiveActiveBoardId,
    });
  }

  function handleCloseBoardDialog() {
    setBoardEditorState(null);
  }

  function handleCreateBoard(values: BoardFormValues) {
    createBoardMutation.mutate({
      title: values.title,
    });
  }

  function handleRenameBoard(values: BoardFormValues) {
    if (boardEditorState?.mode !== 'rename') return;
    if (!activeBoard || !canEditBoard(activeBoard.role)) return;

    renameBoardMutation.mutate({
      boardId: boardEditorState.boardId,
      title: values.title,
    });
  }

  function handleDeleteBoard() {
    if (!effectiveActiveBoardId || !activeBoard) return;
    if (!canDeleteBoard(activeBoard.role)) return;

    const board = boards.find((currentBoard) => currentBoard.id === effectiveActiveBoardId);

    if (!board) return;

    const confirmed = window.confirm(
      `Удалить облачную доску «${board.title}» вместе со всеми её задачами?`,
    );

    if (!confirmed) return;

    deleteBoardMutation.mutate({
      boardId: effectiveActiveBoardId,
    });
  }

  function handleOpenInvitations() {
    if (!effectiveActiveBoardId || !activeBoard) return;
    if (!canManageBoardMembers(activeBoard.role)) return;

    setIsInvitationsOpen(true);
  }

  function handleCloseInvitations() {
    setIsInvitationsOpen(false);
  }

  if (boardsQuery.isPending) {
    return <p role="status">Загрузка облачных досок…</p>;
  }

  if (boardsQuery.isError && !boardsQuery.data) {
    return (
      <div role="alert">
        <p>Не удалось загрузить облачные доски.</p>
        <p>
          Проверь подключение к сети и доступность сервера. Для работы с облачными досками также
          требуется авторизация.
        </p>

        <button
          type="button"
          onClick={() => {
            void boardsQuery.refetch();
          }}
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <>
      {boardsQuery.isError && boardsQuery.data && (
        <div role="alert">
          <p>Не удалось обновить список облачных досок. Показаны последние загруженные данные.</p>

          <button
            type="button"
            onClick={() => {
              void boardsQuery.refetch();
            }}
          >
            Попробовать снова
          </button>
        </div>
      )}

      <section aria-label="Облачные доски">
        <CloudBoardToolbar
          boards={boards}
          canEdit={canEditBoard(activeBoard?.role ?? 'VIEWER')}
          canDelete={canDeleteBoard(activeBoard?.role ?? 'VIEWER')}
          canManageInvitations={canManageInvitations}
          activeBoardId={effectiveActiveBoardId}
          archivedTaskCount={archivedTaskCount}
          onSelectBoard={handleSelectBoard}
          onCreateBoard={handleOpenCreateBoard}
          onRenameBoard={handleOpenRenameBoard}
          onDeleteBoard={handleDeleteBoard}
          onOpenArchive={() => {
            setIsArchiveOpen((current) => !current);
          }}
          onOpenInvitations={handleOpenInvitations}
        />

        {effectiveActiveBoardId ? (
          <>
            {activeBoard ? (
              <BoardMembersButton boardId={activeBoard.id} currentUserRole={activeBoard.role} />
            ) : null}

            <CloudBoard
              key={effectiveActiveBoardId}
              boardId={effectiveActiveBoardId}
              isArchiveOpen={isArchiveOpen}
              onCloseArchive={() => {
                setIsArchiveOpen(false);
              }}
            />
          </>
        ) : (
          <div>
            <h2>Пока нет облачных досок</h2>
            <p>Создай первую облачную доску.</p>

            <button type="button" onClick={handleOpenCreateBoard}>
              Создать облачную доску
            </button>
          </div>
        )}
      </section>

      {boardEditorState?.mode === 'create' && (
        <BoardDialog
          title="Новая облачная доска"
          submitLabel="Создать"
          defaultValues={{ title: '' }}
          onSubmit={handleCreateBoard}
          onClose={handleCloseBoardDialog}
        />
      )}

      {boardEditorState?.mode === 'rename' &&
        editingBoard &&
        activeBoard &&
        canEditBoard(activeBoard.role) && (
          <BoardDialog
            key={editingBoard.id}
            title="Переименование облачной доски"
            submitLabel="Сохранить"
            defaultValues={{ title: editingBoard.title }}
            onSubmit={handleRenameBoard}
            onClose={handleCloseBoardDialog}
          />
        )}

      {effectiveActiveBoardId && canManageInvitations && (
        <BoardInvitationsDialog
          boardId={effectiveActiveBoardId}
          isOpen={isInvitationsOpen}
          onClose={handleCloseInvitations}
        />
      )}
    </>
  );
}
