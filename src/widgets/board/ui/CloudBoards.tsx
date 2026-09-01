import { useMemo, useState } from 'react';
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
import { BoardDialog } from '../../../features/board-management/ui/BoardDialog';
import type { BoardFormValues } from '../../../features/board-management/model/board-form';
import { CloudBoardToolbar } from '../../../features/board-management/ui/CloudBoardToolbar';

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

function getArchiveTaskCount(board: ApiBoard | undefined) {
  if (!board) return 0;

  const archiveColumn = board.columns.find((column) => column.isArchive);

  if (!archiveColumn) return 0;

  return board.tasks.filter((task) => task.columnId === archiveColumn.id).length;
}

export function CloudBoards() {
  const queryClient = useQueryClient();
  const boardsQuery = useCloudBoards();
  const [activeBoardId, setActiveBoardId] = useState<string | null>(null);
  const [boardEditorState, setBoardEditorState] = useState<BoardEditorState>(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const activeBoardQuery = useCloudBoard(activeBoardId ?? '');

  const boards = useMemo<ApiBoardListItem[]>(() => {
    return boardsQuery.data?.boards ?? [];
  }, [boardsQuery.data]);

  const effectiveActiveBoardId = useMemo(() => {
    if (activeBoardId && boards.some((board) => board.id === activeBoardId)) {
      return activeBoardId;
    }

    return boards[0]?.id ?? null;
  }, [boards, activeBoardId]);

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
    },
  });

  const activeBoard = activeBoardQuery.data?.board;
  const archivedTaskCount = getArchiveTaskCount(activeBoard);
  const editingBoard =
    boardEditorState?.mode === 'rename'
      ? boards.find((board) => board.id === boardEditorState.boardId)
      : undefined;

  function handleSelectBoard(boardId: string) {
    if (boardId === activeBoardId) return;

    setActiveBoardId(boardId);
    setBoardEditorState(null);
    setIsArchiveOpen(false);
  }

  function handleOpenCreateBoard() {
    setBoardEditorState({
      mode: 'create',
    });
  }

  function handleOpenRenameBoard() {
    if (!effectiveActiveBoardId) return;

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

    renameBoardMutation.mutate({
      boardId: boardEditorState.boardId,

      title: values.title,
    });
  }

  function handleDeleteBoard() {
    if (!effectiveActiveBoardId) return;

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

  if (boardsQuery.isPending) {
    return <p role="status">Загрузка облачных досок…</p>;
  }

  if (boardsQuery.isError) {
    return (
      <div role="alert">
        <p>Не удалось загрузить облачные доски.</p>
        <p>Если ты работаешь без авторизации, войди в аккаунт для доступа к облачным доскам.</p>
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
      <section aria-label="Облачные доски">
        <CloudBoardToolbar
          boards={boards}
          activeBoardId={effectiveActiveBoardId}
          archivedTaskCount={archivedTaskCount}
          onSelectBoard={handleSelectBoard}
          onCreateBoard={handleOpenCreateBoard}
          onRenameBoard={handleOpenRenameBoard}
          onDeleteBoard={handleDeleteBoard}
          onOpenArchive={() => {
            setIsArchiveOpen((current) => !current);
          }}
        />

        {effectiveActiveBoardId ? (
          <CloudBoard
            key={effectiveActiveBoardId}
            boardId={effectiveActiveBoardId}
            isArchiveOpen={isArchiveOpen}
            onCloseArchive={() => {
              setIsArchiveOpen(false);
            }}
          />
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

      {boardEditorState?.mode === 'rename' && editingBoard && (
        <BoardDialog
          key={editingBoard.id}
          title="Переименование облачной доски"
          submitLabel="Сохранить"
          defaultValues={{ title: editingBoard.title }}
          onSubmit={handleRenameBoard}
          onClose={handleCloseBoardDialog}
        />
      )}
    </>
  );
}
