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
  renameCloudColumn,
  reorderCloudColumns,
  reorderCloudTasks,
  restoreCloudTask,
  updateCloudComment,
  updateCloudSubtask,
  updateCloudTask,
} from './cloud-board-mutations';
import { useCloudBoardMutation } from './use-cloud-board-mutation';

export function useCreateCloudColumn() {
  return useCloudBoardMutation(({ boardId, title }: { boardId: string; title: string }) =>
    createCloudColumn(boardId, title),
  );
}

export function useRenameCloudColumn() {
  return useCloudBoardMutation(
    ({ boardId, columnId, title }: { boardId: string; columnId: string; title: string }) =>
      renameCloudColumn(boardId, columnId, title),
  );
}

export function useDeleteCloudColumn() {
  return useCloudBoardMutation(({ boardId, columnId }: { boardId: string; columnId: string }) =>
    deleteCloudColumn(boardId, columnId),
  );
}

export function useReorderCloudColumns() {
  return useCloudBoardMutation(({ boardId, columnIds }: { boardId: string; columnIds: string[] }) =>
    reorderCloudColumns(boardId, columnIds),
  );
}

export function useCreateCloudTask() {
  return useCloudBoardMutation(
    ({
      boardId,
      columnId,
      input,
    }: {
      boardId: string;
      columnId: string;
      input: Parameters<typeof createCloudTask>[2];
    }) => createCloudTask(boardId, columnId, input),
  );
}

export function useUpdateCloudTask() {
  return useCloudBoardMutation(
    ({
      boardId,
      taskId,
      input,
    }: {
      boardId: string;
      taskId: string;
      input: Parameters<typeof updateCloudTask>[2];
    }) => updateCloudTask(boardId, taskId, input),
  );
}

export function useDeleteCloudTask() {
  return useCloudBoardMutation(({ boardId, taskId }: { boardId: string; taskId: string }) =>
    deleteCloudTask(boardId, taskId),
  );
}

export function useReorderCloudTasks() {
  return useCloudBoardMutation(
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
}

export function useArchiveCloudTask() {
  return useCloudBoardMutation(({ boardId, taskId }: { boardId: string; taskId: string }) =>
    archiveCloudTask(boardId, taskId),
  );
}

export function useRestoreCloudTask() {
  return useCloudBoardMutation(
    ({ boardId, taskId, columnId }: { boardId: string; taskId: string; columnId: string }) =>
      restoreCloudTask(boardId, taskId, columnId),
  );
}

export function useCreateCloudSubtask() {
  return useCloudBoardMutation(
    ({
      boardId,
      taskId,
      input,
    }: {
      boardId: string;
      taskId: string;
      input: {
        title: string;
        description: string;
      };
    }) => createCloudSubtask(boardId, taskId, input),
  );
}

export function useUpdateCloudSubtask() {
  return useCloudBoardMutation(
    ({
      boardId,
      taskId,
      subtaskId,
      input,
    }: {
      boardId: string;
      taskId: string;
      subtaskId: string;
      input: {
        title?: string;
        description?: string;
        isCompleted?: boolean;
      };
    }) => updateCloudSubtask(boardId, taskId, subtaskId, input),
  );
}

export function useDeleteCloudSubtask() {
  return useCloudBoardMutation(
    ({ boardId, taskId, subtaskId }: { boardId: string; taskId: string; subtaskId: string }) =>
      deleteCloudSubtask(boardId, taskId, subtaskId),
  );
}

export function useCreateCloudComment() {
  return useCloudBoardMutation(
    ({ boardId, taskId, text }: { boardId: string; taskId: string; text: string }) =>
      createCloudComment(boardId, taskId, text),
  );
}

export function useUpdateCloudComment() {
  return useCloudBoardMutation(
    ({
      boardId,
      taskId,
      commentId,
      text,
    }: {
      boardId: string;
      taskId: string;
      commentId: string;
      text: string;
    }) => updateCloudComment(boardId, taskId, commentId, text),
  );
}

export function useDeleteCloudComment() {
  return useCloudBoardMutation(
    ({ boardId, taskId, commentId }: { boardId: string; taskId: string; commentId: string }) =>
      deleteCloudComment(boardId, taskId, commentId),
  );
}
