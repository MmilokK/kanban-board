import { useMemo } from 'react';
import type { ColumnId, TaskId } from '../../../shared/model/entity-ids';
import {
  archiveCloudTask,
  createCloudColumn,
  createCloudComment,
  createCloudSubtask,
  createCloudTask,
  deleteCloudColumn,
  deleteCloudComment,
  deleteCloudSubtask,
  deleteCloudTask,
  reorderCloudColumns,
  reorderCloudTasks,
  restoreCloudTask,
  updateCloudColumn,
  updateCloudComment,
  updateCloudSubtask,
  updateCloudTask,
} from '../../../entities/board/api/board-api';
import { mapCloudBoard } from '../../../entities/board/api/map-cloud-board';
import { useCloudBoard } from '../../../entities/board/api/use-cloud-board';
import { useCloudBoardMutation } from '../../../entities/board/api/use-cloud-board-mutation';
import type {
  CreateCloudCommentInput,
  CreateCloudSubtaskInput,
  CreateCloudTaskInput,
  UpdateCloudCommentInput,
  UpdateCloudSubtaskInput,
  UpdateCloudTaskInput,
} from '../../../entities/board/api/board-api.types';
import type { TaskIdsByColumn } from '../../../entities/board/model/task-order';
import { canEditBoard } from '../../../entities/board-member/model/board-member';
import { BoardView } from './BoardView';
import { useBoardRealtime } from '../../../entities/board/api/use-board-realtime';
import { ApiError } from '../../../shared/api/api-error';

type CloudBoardProps = {
  boardId: string;
  isArchiveOpen: boolean;
  onCloseArchive: () => void;
};

export function CloudBoard({ boardId, isArchiveOpen, onCloseArchive }: CloudBoardProps) {
  const boardQuery = useCloudBoard(boardId);
  useBoardRealtime(boardId);

  const createColumnMutation = useCloudBoardMutation(
    ({ boardId, title }: { boardId: string; title: string }) => createCloudColumn(boardId, title),
  );

  const updateColumnMutation = useCloudBoardMutation(
    ({ boardId, columnId, title }: { boardId: string; columnId: string; title: string }) =>
      updateCloudColumn(boardId, columnId, title),
  );

  const deleteColumnMutation = useCloudBoardMutation(
    ({ boardId, columnId }: { boardId: string; columnId: string }) =>
      deleteCloudColumn(boardId, columnId),
  );

  const reorderColumnsMutation = useCloudBoardMutation(
    ({ boardId, columnIds }: { boardId: string; columnIds: string[] }) =>
      reorderCloudColumns(boardId, columnIds),
  );

  const createTaskMutation = useCloudBoardMutation(
    ({
      boardId,
      columnId,
      input,
    }: {
      boardId: string;
      columnId: string;
      input: CreateCloudTaskInput;
    }) => createCloudTask(boardId, columnId, input),
  );

  const updateTaskMutation = useCloudBoardMutation(
    ({
      boardId,
      taskId,
      input,
    }: {
      boardId: string;
      taskId: string;
      input: UpdateCloudTaskInput;
    }) => updateCloudTask(boardId, taskId, input),
  );

  const deleteTaskMutation = useCloudBoardMutation(
    ({ boardId, taskId }: { boardId: string; taskId: string }) => deleteCloudTask(boardId, taskId),
  );

  const reorderTasksMutation = useCloudBoardMutation(
    ({
      boardId,
      columns,
    }: {
      boardId: string;
      columns: Array<{
        columnId: string;
        taskIds: string[];
      }>;
    }) => reorderCloudTasks(boardId, columns),
  );

  const archiveTaskMutation = useCloudBoardMutation(
    ({ boardId, taskId }: { boardId: string; taskId: string }) => archiveCloudTask(boardId, taskId),
  );

  const restoreTaskMutation = useCloudBoardMutation(
    ({ boardId, taskId, columnId }: { boardId: string; taskId: string; columnId: string }) =>
      restoreCloudTask(boardId, taskId, columnId),
  );

  const createSubtaskMutation = useCloudBoardMutation(
    ({
      boardId,
      taskId,
      input,
    }: {
      boardId: string;
      taskId: string;
      input: CreateCloudSubtaskInput;
    }) => createCloudSubtask(boardId, taskId, input),
  );

  const updateSubtaskMutation = useCloudBoardMutation(
    ({
      boardId,
      taskId,
      subtaskId,
      input,
    }: {
      boardId: string;
      taskId: string;
      subtaskId: string;
      input: UpdateCloudSubtaskInput;
    }) => updateCloudSubtask(boardId, taskId, subtaskId, input),
  );

  const deleteSubtaskMutation = useCloudBoardMutation(
    ({ boardId, taskId, subtaskId }: { boardId: string; taskId: string; subtaskId: string }) =>
      deleteCloudSubtask(boardId, taskId, subtaskId),
  );

  const createCommentMutation = useCloudBoardMutation(
    ({
      boardId,
      taskId,
      input,
    }: {
      boardId: string;
      taskId: string;
      input: CreateCloudCommentInput;
    }) => createCloudComment(boardId, taskId, input),
  );

  const updateCommentMutation = useCloudBoardMutation(
    ({
      boardId,
      taskId,
      commentId,
      input,
    }: {
      boardId: string;
      taskId: string;
      commentId: string;
      input: UpdateCloudCommentInput;
    }) => updateCloudComment(boardId, taskId, commentId, input),
  );

  const deleteCommentMutation = useCloudBoardMutation(
    ({ boardId, taskId, commentId }: { boardId: string; taskId: string; commentId: string }) =>
      deleteCloudComment(boardId, taskId, commentId),
  );

  const mappedBoard = useMemo(() => {
    if (!boardQuery.data) {
      return null;
    }

    return mapCloudBoard(boardQuery.data.board);
  }, [boardQuery.data]);

  if (boardQuery.isPending && !boardQuery.data) {
    return <p role="status">Загрузка доски…</p>;
  }

  if (
    boardQuery.isError &&
    !boardQuery.data &&
    boardQuery.error instanceof ApiError &&
    boardQuery.error.status === 404 &&
    boardQuery.error.code === 'BOARD_NOT_FOUND'
  ) {
    return <p role="alert">Доска не найдена или доступ к ней был удалён.</p>;
  }

  if (boardQuery.isError && !boardQuery.data) {
    return (
      <div role="alert">
        <p>Не удалось загрузить доску.</p>
        <p>Проверь подключение к сети и доступность сервера.</p>

        <button
          type="button"
          onClick={() => {
            void boardQuery.refetch();
          }}
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  if (!mappedBoard || !boardQuery.data) {
    return <p role="alert">Доска не найдена.</p>;
  }

  const { board, columns, tasks } = mappedBoard;
  const canEdit = canEditBoard(boardQuery.data.board.role);

  function handleCreateColumn(title: string) {
    if (!canEdit) return;

    createColumnMutation.mutate({
      boardId,
      title,
    });
  }

  function handleRenameColumn(columnId: ColumnId, title: string) {
    if (!canEdit) return;

    updateColumnMutation.mutate({
      boardId,
      columnId,
      title,
    });
  }

  function handleDeleteColumn(columnId: ColumnId) {
    if (!canEdit) return;

    deleteColumnMutation.mutate({
      boardId,
      columnId,
    });
  }

  function handleMoveColumn(columnId: ColumnId, targetIndex: number) {
    if (!canEdit) return;

    const regularColumnIds = board.columnIds.filter(
      (currentColumnId) => !columns[currentColumnId]?.isArchive,
    );

    const currentIndex = regularColumnIds.indexOf(columnId);

    if (currentIndex === -1) return;
    if (targetIndex < 0 || targetIndex >= regularColumnIds.length) {
      return;
    }
    if (currentIndex === targetIndex) return;

    const nextColumnIds = [...regularColumnIds];
    const [movedColumnId] = nextColumnIds.splice(currentIndex, 1);

    if (!movedColumnId) return;

    nextColumnIds.splice(targetIndex, 0, movedColumnId);

    reorderColumnsMutation.mutate({
      boardId,
      columnIds: nextColumnIds,
    });
  }

  function handleCreateTask(
    columnId: ColumnId,
    input: Parameters<React.ComponentProps<typeof BoardView>['onCreateTask']>[1],
  ) {
    if (!canEdit) return;

    const cloudInput: CreateCloudTaskInput = {
      title: input.title,
      description: input.description,
      priority: input.priority,
      tags: input.tags,
      dueDate: input.dueDate || null,
    };

    createTaskMutation.mutate({
      boardId,
      columnId,
      input: cloudInput,
    });
  }

  function handleUpdateTask(
    taskId: TaskId,
    input: Parameters<React.ComponentProps<typeof BoardView>['onUpdateTask']>[1],
  ) {
    if (!canEdit) return;

    const cloudInput: UpdateCloudTaskInput = {
      title: input.title,
      description: input.description,
      priority: input.priority,
      tags: input.tags,
      dueDate: input.dueDate || null,
    };

    updateTaskMutation.mutate({
      boardId,
      taskId,
      input: cloudInput,
    });
  }

  function handleDeleteTask(taskId: TaskId) {
    if (!canEdit) return;

    deleteTaskMutation.mutate({
      boardId,
      taskId,
    });
  }

  function handleArchiveTask(taskId: TaskId) {
    if (!canEdit) return;

    archiveTaskMutation.mutate({
      boardId,
      taskId,
    });
  }

  function handleRestoreArchivedTask(taskId: TaskId, columnId: ColumnId) {
    if (!canEdit) return;

    restoreTaskMutation.mutate({
      boardId,
      taskId,
      columnId,
    });
  }

  function handleDeleteArchivedTask(taskId: TaskId) {
    if (!canEdit) return;

    deleteTaskMutation.mutate({
      boardId,
      taskId,
    });
  }

  function handleReplaceTaskOrder(nextOrder: TaskIdsByColumn, previousOrder: TaskIdsByColumn) {
    if (!canEdit) return;

    const hasChanges = Object.keys(nextOrder).some((columnId) => {
      const typedColumnId = columnId as ColumnId;
      const nextTaskIds = nextOrder[typedColumnId] ?? [];
      const previousTaskIds = previousOrder[typedColumnId] ?? [];

      if (nextTaskIds.length !== previousTaskIds.length) {
        return true;
      }

      return nextTaskIds.some((taskId, index) => taskId !== previousTaskIds[index]);
    });

    if (!hasChanges) return;

    const regularColumns = board.columnIds
      .map((columnId) => columns[columnId])
      .filter(
        (column): column is NonNullable<typeof column> => column !== undefined && !column.isArchive,
      );

    const payloadColumns = regularColumns.map((column) => ({
      columnId: column.id,
      taskIds: [...(nextOrder[column.id] ?? column.taskIds)],
    }));

    reorderTasksMutation.mutate({
      boardId,
      columns: payloadColumns,
    });
  }

  function handleAddSubtask(
    taskId: TaskId,
    input: Parameters<React.ComponentProps<typeof BoardView>['onAddSubtask']>[1],
  ) {
    if (!canEdit) return;

    createSubtaskMutation.mutate({
      boardId,
      taskId,
      input,
    });
  }

  function handleUpdateSubtask(
    taskId: TaskId,
    subtaskId: string,
    input: Parameters<React.ComponentProps<typeof BoardView>['onUpdateSubtask']>[2],
  ) {
    if (!canEdit) return;

    updateSubtaskMutation.mutate({
      boardId,
      taskId,
      subtaskId,
      input,
    });
  }

  function handleToggleSubtask(taskId: TaskId, subtaskId: string) {
    if (!canEdit) return;

    const task = tasks[taskId];

    if (!task) return;

    const subtask = task.subtasks.find((currentSubtask) => currentSubtask.id === subtaskId);

    if (!subtask) return;

    updateSubtaskMutation.mutate({
      boardId,
      taskId,
      subtaskId,
      input: {
        isCompleted: !subtask.isCompleted,
      },
    });
  }

  function handleDeleteSubtask(taskId: TaskId, subtaskId: string) {
    if (!canEdit) return;

    deleteSubtaskMutation.mutate({
      boardId,
      taskId,
      subtaskId,
    });
  }

  function handleAddComment(
    taskId: TaskId,
    input: Parameters<React.ComponentProps<typeof BoardView>['onAddComment']>[1],
  ) {
    if (!canEdit) return;

    createCommentMutation.mutate({
      boardId,
      taskId,
      input,
    });
  }

  function handleUpdateComment(
    taskId: TaskId,
    commentId: string,
    input: Parameters<React.ComponentProps<typeof BoardView>['onUpdateComment']>[2],
  ) {
    if (!canEdit) return;

    updateCommentMutation.mutate({
      boardId,
      taskId,
      commentId,
      input,
    });
  }

  function handleDeleteComment(taskId: TaskId, commentId: string) {
    if (!canEdit) return;

    deleteCommentMutation.mutate({
      boardId,
      taskId,
      commentId,
    });
  }

  return (
    <>
      {boardQuery.isError && boardQuery.data && (
        <div role="alert">
          <p>Не удалось обновить доску. Показаны последние загруженные данные.</p>

          <button
            type="button"
            onClick={() => {
              void boardQuery.refetch();
            }}
          >
            Попробовать снова
          </button>
        </div>
      )}

      <BoardView
        key={board.id}
        board={board}
        columns={columns}
        tasks={tasks}
        isArchiveOpen={isArchiveOpen}
        canEdit={canEdit}
        onCloseArchive={onCloseArchive}
        onCreateColumn={handleCreateColumn}
        onRenameColumn={handleRenameColumn}
        onDeleteColumn={handleDeleteColumn}
        onMoveColumn={handleMoveColumn}
        onCreateTask={handleCreateTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        onArchiveTask={handleArchiveTask}
        onRestoreArchivedTask={handleRestoreArchivedTask}
        onDeleteArchivedTask={handleDeleteArchivedTask}
        onReplaceTaskOrder={handleReplaceTaskOrder}
        onAddSubtask={handleAddSubtask}
        onUpdateSubtask={handleUpdateSubtask}
        onToggleSubtask={handleToggleSubtask}
        onDeleteSubtask={handleDeleteSubtask}
        onAddComment={handleAddComment}
        onUpdateComment={handleUpdateComment}
        onDeleteComment={handleDeleteComment}
      />
    </>
  );
}
