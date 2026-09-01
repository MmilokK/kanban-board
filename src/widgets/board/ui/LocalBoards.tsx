import { useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useBoardStore } from '../../../entities/board/model/board-store';
import type { TaskIdsByColumn } from '../../../entities/board/model/task-order';
import type { Board as BoardEntity } from '../../../entities/board/model/types';
import type { Column } from '../../../entities/column/model/types';
import { createDeletedTaskSnapshot } from '../../../entities/task/model/deleted-task-snapshot';
import type { Task } from '../../../entities/task/model/types';
import type { AppState } from '../../../entities/board/model/app-state';
import { selectAppState } from '../../../entities/board/model/select-app-state';
import type { BoardFormValues } from '../../../features/board-management/model/board-form';
import { BoardDialog } from '../../../features/board-management/ui/BoardDialog';
import { BoardToolbar } from '../../../features/board-management/ui/BoardToolbar';
import { DataTransfer } from '../../../features/data-transfer/ui/DataTransfer';
import { exportAppData } from '../../../features/data-transfer/model/export-format';
import { useTaskDeleteUndo } from '../../../features/task-undo/model/use-task-delete-undo';
import { UndoSnackbar } from '../../../features/task-undo/ui/UndoSnackbar';
import type { BoardId, ColumnId, TaskId } from '../../../shared/model/entity-ids';
import { BoardView } from './BoardView';
import styles from './Board.module.scss';

type BoardEditorState =
  | {
      mode: 'create';
    }
  | {
      mode: 'rename';
      boardId: BoardId;
    }
  | null;

function isBoard(board: BoardEntity | undefined): board is BoardEntity {
  return board !== undefined;
}

function isColumn(column: Column | undefined): column is Column {
  return column !== undefined;
}

function isTask(task: Task | undefined): task is Task {
  return task !== undefined;
}

function findTaskColumnId(taskOrder: TaskIdsByColumn, taskId: TaskId): ColumnId | undefined {
  const entry = Object.entries(taskOrder).find(([, taskIds]) => taskIds.includes(taskId));
  return entry?.[0] as ColumnId | undefined;
}

export function LocalBoards() {
  const {
    boards,
    boardOrder,
    activeBoardId,
    columns,
    tasks,

    createBoard,
    setActiveBoard,
    renameBoard,
    deleteBoard,

    createColumn,
    renameColumn,
    deleteColumn,
    moveColumn,

    addTask,
    updateTask,
    deleteTask,
    replaceTaskOrder,
    restoreTask,
    archiveTask,
    restoreArchivedTask,
    recordTaskMove,

    addSubtask,
    updateSubtask,
    toggleSubtask,
    deleteSubtask,

    addTaskComment,
    updateTaskComment,
    deleteTaskComment,

    replaceAppState,
  } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      boardOrder: state.boardOrder,
      activeBoardId: state.activeBoardId,
      columns: state.columns,
      tasks: state.tasks,

      createBoard: state.createBoard,
      setActiveBoard: state.setActiveBoard,
      renameBoard: state.renameBoard,
      deleteBoard: state.deleteBoard,

      createColumn: state.createColumn,
      renameColumn: state.renameColumn,
      deleteColumn: state.deleteColumn,
      moveColumn: state.moveColumn,

      addTask: state.addTask,
      updateTask: state.updateTask,
      deleteTask: state.deleteTask,
      replaceTaskOrder: state.replaceTaskOrder,
      restoreTask: state.restoreTask,
      archiveTask: state.archiveTask,
      restoreArchivedTask: state.restoreArchivedTask,
      recordTaskMove: state.recordTaskMove,

      addSubtask: state.addSubtask,
      updateSubtask: state.updateSubtask,
      toggleSubtask: state.toggleSubtask,
      deleteSubtask: state.deleteSubtask,

      addTaskComment: state.addTaskComment,
      updateTaskComment: state.updateTaskComment,
      deleteTaskComment: state.deleteTaskComment,

      replaceAppState: state.replaceAppState,
    })),
  );

  const { deletedTask, registerDeletion, undo, dismiss } = useTaskDeleteUndo({
    onRestore: restoreTask,
  });

  const [boardEditorState, setBoardEditorState] = useState<BoardEditorState>(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  const orderedBoards = useMemo(
    () => boardOrder.map((boardId) => boards[boardId]).filter(isBoard),
    [boardOrder, boards],
  );

  const activeBoard = activeBoardId ? boards[activeBoardId] : undefined;

  const orderedColumns = useMemo(() => {
    if (!activeBoard) return [];
    return activeBoard.columnIds
      .map((columnId) => columns[columnId])
      .filter(isColumn)
      .filter((column) => !column.isArchive);
  }, [activeBoard, columns]);

  const archiveColumn = useMemo(() => {
    if (!activeBoard) return undefined;

    return activeBoard.columnIds
      .map((columnId) => columns[columnId])
      .find((column) => column?.isArchive);
  }, [activeBoard, columns]);

  const archivedTasks = useMemo(() => {
    if (!archiveColumn) return [];
    return archiveColumn.taskIds
      .map((taskId) => tasks[taskId])
      .filter(isTask)
      .sort((firstTask, secondTask) =>
        (secondTask.archivedAt ?? '').localeCompare(firstTask.archivedAt ?? ''),
      );
  }, [archiveColumn, tasks]);

  const editingBoard =
    boardEditorState?.mode === 'rename' ? boards[boardEditorState.boardId] : undefined;

  function handleSelectBoard(boardId: BoardId) {
    if (boardId === activeBoardId) return;
    setBoardEditorState(null);
    setActiveBoard(boardId);
    dismiss();
    setIsArchiveOpen(false);
  }

  function handleOpenCreateBoard() {
    setBoardEditorState({
      mode: 'create',
    });
  }

  function handleOpenRenameBoard() {
    if (!activeBoard) return;
    setBoardEditorState({
      mode: 'rename',
      boardId: activeBoard.id,
    });
  }

  function handleCloseBoardDialog() {
    setBoardEditorState(null);
  }

  function handleCreateBoard(values: BoardFormValues) {
    const createdBoardId = createBoard(values.title);
    if (!createdBoardId) return;
    setBoardEditorState(null);
    dismiss();
    setIsArchiveOpen(false);
  }

  function handleRenameBoard(values: BoardFormValues) {
    if (boardEditorState?.mode !== 'rename') return;
    renameBoard(boardEditorState.boardId, values.title);
    setBoardEditorState(null);
  }

  function handleDeleteBoard() {
    if (!activeBoard) return;
    const confirmed = window.confirm(
      `Удалить доску «${activeBoard.title}» вместе со всеми её задачами?`,
    );
    if (!confirmed) return;

    setBoardEditorState(null);
    dismiss();
    deleteBoard(activeBoard.id);
    setIsArchiveOpen(false);
  }

  function handleDeleteTask(taskId: TaskId) {
    const task = tasks[taskId];
    if (!task) return;
    const column = orderedColumns.find((currentColumn) => currentColumn.taskIds.includes(taskId));
    if (!column) return;
    const snapshot = createDeletedTaskSnapshot(task, column);
    if (!snapshot) return;
    deleteTask(taskId);
    registerDeletion(snapshot);
  }

  function handleDeleteArchivedTask(taskId: TaskId) {
    deleteTask(taskId);
  }

  function handleReplaceTaskOrder(nextOrder: TaskIdsByColumn, previousOrder: TaskIdsByColumn) {
    replaceTaskOrder(nextOrder);
    const taskIds = new Set<TaskId>();

    for (const ids of Object.values(nextOrder)) {
      for (const taskId of ids) {
        taskIds.add(taskId);
      }
    }

    for (const taskId of taskIds) {
      const previousColumnId = findTaskColumnId(previousOrder, taskId);
      const currentColumnId = findTaskColumnId(nextOrder, taskId);
      if (!previousColumnId || !currentColumnId || previousColumnId === currentColumnId) {
        continue;
      }
      recordTaskMove(taskId, previousColumnId, currentColumnId);
      break;
    }
  }

  function handleExportData() {
    const state = selectAppState(useBoardStore.getState());
    exportAppData(state);
  }

  function handleImportData(state: AppState) {
    dismiss();
    setBoardEditorState(null);
    setIsArchiveOpen(false);
    replaceAppState(state);
  }

  return (
    <>
      <section
        className={styles.board}
        aria-label="Kanban-доска"
        aria-labelledby={activeBoard ? 'board-title' : 'empty-board-title'}
      >
        <BoardToolbar
          boards={orderedBoards}
          activeBoardId={activeBoardId}
          onSelectBoard={handleSelectBoard}
          onCreateBoard={handleOpenCreateBoard}
          onRenameBoard={handleOpenRenameBoard}
          onDeleteBoard={handleDeleteBoard}
          openArchive={() => {
            setIsArchiveOpen((current) => !current);
          }}
          archivedTasks={archivedTasks}
        />

        <DataTransfer onExport={handleExportData} onImport={handleImportData} />

        {activeBoard ? (
          <BoardView
            key={activeBoard.id}
            board={activeBoard}
            columns={columns}
            tasks={tasks}
            isArchiveOpen={isArchiveOpen}
            onCloseArchive={() => {
              setIsArchiveOpen(false);
            }}
            onCreateColumn={(title) => {
              createColumn(activeBoard.id, title);
            }}
            onRenameColumn={(columnId, title) => {
              renameColumn(columnId, title);
            }}
            onDeleteColumn={deleteColumn}
            onMoveColumn={moveColumn}
            onCreateTask={(columnId, input) => {
              addTask(columnId, input);
            }}
            onUpdateTask={(taskId, input) => {
              updateTask(taskId, input);
            }}
            onDeleteTask={handleDeleteTask}
            onArchiveTask={archiveTask}
            onRestoreArchivedTask={restoreArchivedTask}
            onDeleteArchivedTask={handleDeleteArchivedTask}
            onReplaceTaskOrder={handleReplaceTaskOrder}
            onAddSubtask={(taskId, input) => {
              addSubtask(taskId, input);
            }}
            onUpdateSubtask={(taskId, subtaskId, input) => {
              updateSubtask(taskId, subtaskId, input);
            }}
            onToggleSubtask={(taskId, subtaskId) => {
              toggleSubtask(taskId, subtaskId);
            }}
            onDeleteSubtask={(taskId, subtaskId) => {
              deleteSubtask(taskId, subtaskId);
            }}
            onAddComment={(taskId, input) => {
              addTaskComment(taskId, input);
            }}
            onUpdateComment={(taskId, commentId, input) => {
              updateTaskComment(taskId, commentId, input);
            }}
            onDeleteComment={(taskId, commentId) => {
              deleteTaskComment(taskId, commentId);
            }}
          />
        ) : (
          <div className={styles.emptyState}>
            <h1 id="empty-board-title">Пока нет досок</h1>
            <p>Создай первую доску, чтобы начать работу с задачами.</p>
            <button type="button" onClick={handleOpenCreateBoard}>
              Создать доску
            </button>
          </div>
        )}
      </section>

      {boardEditorState?.mode === 'create' && (
        <BoardDialog
          title="Новая доска"
          submitLabel="Создать"
          defaultValues={{
            title: '',
          }}
          onSubmit={handleCreateBoard}
          onClose={handleCloseBoardDialog}
        />
      )}

      {boardEditorState?.mode === 'rename' && editingBoard && (
        <BoardDialog
          key={editingBoard.id}
          title="Переименование доски"
          submitLabel="Сохранить"
          defaultValues={{
            title: editingBoard.title,
          }}
          onSubmit={handleRenameBoard}
          onClose={handleCloseBoardDialog}
        />
      )}

      {deletedTask && (
        <UndoSnackbar taskTitle={deletedTask.task.title} onUndo={undo} onDismiss={dismiss} />
      )}
    </>
  );
}
