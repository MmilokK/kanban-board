import { useMemo, useRef, useState } from 'react';

import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import { useShallow } from 'zustand/react/shallow';

import { useBoardStore } from '../../../entities/board/model/board-store';
import {
  selectTaskIdsByColumn,
  type TaskIdsByColumn,
} from '../../../entities/board/model/task-order';
import type { Board as BoardEntity } from '../../../entities/board/model/types';
import type { Column } from '../../../entities/column/model/types';
import { BoardColumn } from '../../../entities/column/ui/BoardColumn';
import type { CreateTaskInput, Task } from '../../../entities/task/model/types';
import type { BoardFormValues } from '../../../features/board-management/model/board-form';
import { BoardDialog } from '../../../features/board-management/ui/BoardDialog';
import { BoardToolbar } from '../../../features/board-management/ui/BoardToolbar';
import { TaskDialog } from '../../../features/task-editor/ui/TaskDialog';
import type { BoardId, ColumnId, TaskId } from '../../../shared/model/entity-ids';

import styles from './Board.module.scss';
import { ColumnDialog } from '../../../features/column-managment/ui/ColumnDialog';
import type { ColumnFormValues } from '../../../features/column-managment/model/column-form';
import {
  DEFAULT_TASK_FILTERS,
  filterAndSortTasks,
  getAvailableTaskTags,
  hasActiveTaskFilters,
  hasModifiedTaskView,
  type TaskFilterState,
} from '../../../features/task-filtering/model/task-filter';
import { TaskFilters } from '../../../features/task-filtering/ui/TaskFilters';
import { createDeletedTaskSnapshot } from '../../../entities/task/model/deleted-task-snapshot';
import { UndoSnackbar } from '../../../features/task-undo/ui/UndoSnackbar';
import { useTaskDeleteUndo } from '../../../features/task-undo/model/use-task-delete-undo';
import { selectAppState } from '../../../entities/board/model/select-app-state';
import { exportAppData } from '../../../features/data-transfer/model/export-format';
import type { AppState } from '../../../entities/board/model/app-state';
import { DataTransfer } from '../../../features/data-transfer/ui/DataTransfer';
import { TaskArchive } from '../../../features/task-archive/ui/TaskArchive';

type TaskEditorState =
  | {
      mode: 'create';
      columnId: ColumnId;
    }
  | {
      mode: 'edit';
      taskId: TaskId;
    }
  | null;

type BoardEditorState =
  | {
      mode: 'create';
    }
  | {
      mode: 'rename';
      boardId: BoardId;
    }
  | null;

type ColumnEditorState =
  | {
      mode: 'create';
      boardId: BoardId;
    }
  | {
      mode: 'rename';
      columnId: ColumnId;
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

function createDefaultTaskFilters(): TaskFilterState {
  return {
    ...DEFAULT_TASK_FILTERS,
  };
}

export function Board() {
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

    addSubtask,
    updateSubtask,
    toggleSubtask,
    deleteSubtask,

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

      addSubtask: state.addSubtask,
      updateSubtask: state.updateSubtask,
      toggleSubtask: state.toggleSubtask,
      deleteSubtask: state.deleteSubtask,

      replaceAppState: state.replaceAppState,
    })),
  );

  const { deletedTask, registerDeletion, undo, dismiss } = useTaskDeleteUndo({
    onRestore: restoreTask,
  });

  const [taskEditorState, setTaskEditorState] = useState<TaskEditorState>(null);

  const [boardEditorState, setBoardEditorState] = useState<BoardEditorState>(null);

  const [columnEditorState, setColumnEditorState] = useState<ColumnEditorState>(null);

  const [taskFilters, setTaskFilters] = useState<TaskFilterState>(createDefaultTaskFilters);

  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  const taskOrderSnapshotRef = useRef<TaskIdsByColumn>({});

  const orderedBoards = useMemo(
    () => boardOrder.map((boardId) => boards[boardId]).filter(isBoard),
    [boardOrder, boards],
  );

  const activeBoard = activeBoardId ? boards[activeBoardId] : undefined;

  const orderedColumns = useMemo(() => {
    if (!activeBoard) {
      return [];
    }

    return activeBoard.columnIds
      .map((columnId) => columns[columnId])
      .filter(isColumn)
      .filter((column) => !column.isArchive);
  }, [activeBoard, columns]);

  const activeBoardTasks = useMemo(() => {
    return orderedColumns.flatMap((column) =>
      column.taskIds.map((taskId) => tasks[taskId]).filter(isTask),
    );
  }, [orderedColumns, tasks]);

  const availableTaskTags = useMemo(
    () => getAvailableTaskTags(activeBoardTasks),
    [activeBoardTasks],
  );

  const visibleTasksByColumn = useMemo(() => {
    return Object.fromEntries(
      orderedColumns.map((column) => {
        const columnTasks = column.taskIds.map((taskId) => tasks[taskId]).filter(isTask);

        return [
          column.id,
          filterAndSortTasks(columnTasks, taskFilters, {
            isCompletedColumn: column.isCompleted,
          }),
        ];
      }),
    ) as Record<ColumnId, Task[]>;
  }, [orderedColumns, tasks, taskFilters]);

  const archiveColumn = useMemo(() => {
    console.log(activeBoard);
    if (!activeBoard) {
      return undefined;
    }

    return activeBoard.columnIds
      .map((columnId) => columns[columnId])
      .find((column) => column?.isArchive);
  }, [activeBoard, columns]);

  const archivedTasks = useMemo(() => {
    console.log(archiveColumn);
    if (!archiveColumn) {
      return [];
    }

    return archiveColumn.taskIds
      .map((taskId) => tasks[taskId])
      .filter(isTask)
      .sort((firstTask, secondTask) =>
        (secondTask.archivedAt ?? '').localeCompare(firstTask.archivedAt ?? ''),
      );
  }, [archiveColumn, tasks]);

  const visibleTaskCount = Object.values(visibleTasksByColumn).reduce(
    (total, columnTasks) => total + columnTasks.length,
    0,
  );

  const editingTask =
    taskEditorState?.mode === 'edit' ? (tasks[taskEditorState.taskId] ?? null) : null;

  const editingColumn =
    columnEditorState?.mode === 'rename' ? columns[columnEditorState.columnId] : undefined;

  const editingBoard =
    boardEditorState?.mode === 'rename' ? boards[boardEditorState.boardId] : undefined;

  const isTaskViewModified = hasModifiedTaskView(taskFilters);

  const isTaskFilterActive = hasActiveTaskFilters(taskFilters);

  function resetTaskFilters() {
    setTaskFilters(createDefaultTaskFilters());
  }

  function handleSelectBoard(boardId: BoardId) {
    if (boardId === activeBoardId) {
      return;
    }
    setTaskEditorState(null);
    setBoardEditorState(null);
    setActiveBoard(boardId);
    resetTaskFilters();
    dismiss();
    setIsArchiveOpen(false);
  }

  function handleOpenCreateBoard() {
    setBoardEditorState({
      mode: 'create',
    });
  }

  function handleOpenRenameBoard() {
    if (!activeBoard) {
      return;
    }

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

    if (!createdBoardId) {
      return;
    }

    setTaskEditorState(null);
    setBoardEditorState(null);
    resetTaskFilters();
    setIsArchiveOpen(false);
  }

  function handleRenameBoard(values: BoardFormValues) {
    if (boardEditorState?.mode !== 'rename') {
      return;
    }

    renameBoard(boardEditorState.boardId, values.title);

    setBoardEditorState(null);
  }

  function handleDeleteBoard() {
    if (!activeBoard) {
      return;
    }

    const confirmed = window.confirm(
      `Удалить доску «${activeBoard.title}» вместе со всеми её задачами?`,
    );

    if (!confirmed) {
      return;
    }

    setTaskEditorState(null);
    setBoardEditorState(null);
    resetTaskFilters();
    dismiss();
    deleteBoard(activeBoard.id);
    setIsArchiveOpen(false);
  }

  function handleOpenCreateColumn() {
    if (!activeBoard) {
      return;
    }

    setColumnEditorState({
      mode: 'create',
      boardId: activeBoard.id,
    });
  }

  function handleOpenRenameColumn(columnId: ColumnId) {
    if (!columns[columnId]) {
      return;
    }

    setColumnEditorState({
      mode: 'rename',
      columnId,
    });
  }

  function handleCloseColumnDialog() {
    setColumnEditorState(null);
  }

  function handleCreateColumn(values: ColumnFormValues) {
    if (columnEditorState?.mode !== 'create') {
      return;
    }

    const columnId = createColumn(columnEditorState.boardId, values.title);

    if (!columnId) {
      return;
    }

    setColumnEditorState(null);
  }

  function handleRenameColumn(values: ColumnFormValues) {
    if (columnEditorState?.mode !== 'rename') {
      return;
    }

    renameColumn(columnEditorState.columnId, values.title);

    setColumnEditorState(null);
  }

  function handleDeleteColumn(columnId: ColumnId) {
    const column = columns[columnId];

    if (!column) {
      return;
    }

    const taskCount = column.taskIds.length;

    const message =
      taskCount === 0
        ? `Удалить колонку «${column.title}»?`
        : `Удалить колонку «${column.title}» вместе с задачами: ${taskCount}?`;

    const confirmed = window.confirm(message);

    if (!confirmed) {
      return;
    }

    setTaskEditorState(null);
    setColumnEditorState(null);
    dismiss();
    deleteColumn(columnId);
  }

  function handleOpenCreateTask(columnId: ColumnId) {
    setTaskEditorState({
      mode: 'create',
      columnId,
    });
  }

  function handleOpenEditTask(taskId: TaskId) {
    const task = tasks[taskId];

    if (!task) {
      return;
    }

    setTaskEditorState({
      mode: 'edit',
      taskId,
    });
  }

  function handleCloseTaskDialog() {
    setTaskEditorState(null);
  }

  function handleTaskSubmit(input: CreateTaskInput) {
    if (!taskEditorState) {
      return;
    }

    if (taskEditorState.mode === 'create') {
      addTask(taskEditorState.columnId, input);
    } else {
      updateTask(taskEditorState.taskId, input);
    }

    setTaskEditorState(null);
  }

  function handleDeleteTask(taskId: TaskId) {
    const task = tasks[taskId];

    if (!task) {
      return;
    }

    const column = orderedColumns.find((currentColumn) => currentColumn.taskIds.includes(taskId));

    if (!column) {
      return;
    }

    const snapshot = createDeletedTaskSnapshot(task, column);

    if (!snapshot) {
      return;
    }

    deleteTask(taskId);

    registerDeletion(snapshot);

    if (taskEditorState?.mode === 'edit' && taskEditorState.taskId === taskId) {
      setTaskEditorState(null);
    }
  }

  function handleExportData() {
    const state = selectAppState(useBoardStore.getState());

    exportAppData(state);
  }

  function handleImportData(state: AppState) {
    dismiss();

    setTaskEditorState(null);
    setBoardEditorState(null);
    setColumnEditorState(null);
    setIsArchiveOpen(false);

    resetTaskFilters();

    replaceAppState(state);
  }

  function handleOpenArchive() {
    setIsArchiveOpen((current) => !current);
  }

  function handleDeleteArchivedTask(taskId: string) {
    const task = tasks[taskId];

    if (!task) {
      return;
    }

    const confirmed = window.confirm(`Окончательно удалить задачу «${task.title}» из архива?`);

    if (!confirmed) {
      return;
    }

    deleteTask(taskId);
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
          openArchive={handleOpenArchive}
          archivedTasks={archivedTasks}
        />

        <DataTransfer onExport={handleExportData} onImport={handleImportData} />

        <TaskFilters
          value={taskFilters}
          availableTags={availableTaskTags}
          visibleTaskCount={visibleTaskCount}
          totalTaskCount={activeBoardTasks.length}
          onChange={setTaskFilters}
          onReset={resetTaskFilters}
        />
        {isTaskViewModified && (
          <p className={styles.dragNotice} role="status">
            Перетаскивание задач доступно только при ручном порядке без активных фильтров.
          </p>
        )}

        {activeBoard ? (
          <>
            <header className={styles.header}>
              <h1 id="board-title">{activeBoard.title}</h1>

              <button type="button" onClick={handleOpenCreateColumn}>
                Новая колонка
              </button>
            </header>

            <DragDropProvider
              onDragStart={() => {
                if (isTaskViewModified) {
                  return;
                }

                taskOrderSnapshotRef.current = selectTaskIdsByColumn(useBoardStore.getState());
              }}
              onDragOver={(event) => {
                if (isTaskViewModified) {
                  return;
                }

                const currentTaskOrder = selectTaskIdsByColumn(useBoardStore.getState());

                replaceTaskOrder(move(currentTaskOrder, event));
              }}
              onDragEnd={(event) => {
                if (isTaskViewModified) {
                  return;
                }

                if (event.canceled) {
                  replaceTaskOrder(taskOrderSnapshotRef.current);
                }

                taskOrderSnapshotRef.current = {};
              }}
            >
              {orderedColumns.length ? (
                <div className={styles.columns}>
                  {orderedColumns.map((column, columnIndex) => {
                    const columnTasks = visibleTasksByColumn[column.id] ?? [];

                    return (
                      <BoardColumn
                        key={column.id}
                        column={column}
                        tasks={columnTasks}
                        emptyMessage={
                          isTaskFilterActive ? 'Нет подходящих задач' : 'В колонке пока нет задач'
                        }
                        isTaskDragDisabled={isTaskViewModified}
                        onCreateTask={() => {
                          handleOpenCreateTask(column.id);
                        }}
                        onEditTask={handleOpenEditTask}
                        onDeleteTask={handleDeleteTask}
                        onArchiveTask={archiveTask}
                        onRenameColumn={() => {
                          handleOpenRenameColumn(column.id);
                        }}
                        onDeleteColumn={() => {
                          handleDeleteColumn(column.id);
                        }}
                        onMoveColumnLeft={() => {
                          moveColumn(column.id, columnIndex - 1);
                        }}
                        onMoveColumnRight={() => {
                          moveColumn(column.id, columnIndex + 1);
                        }}
                        canMoveColumnLeft={columnIndex > 0}
                        canMoveColumnRight={columnIndex < orderedColumns.length - 1}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className={styles.emptyColumns}>
                  <h2>Пока нет колонок</h2>

                  <p>Добавь первую колонку, чтобы создавать задачи.</p>

                  <button type="button" onClick={handleOpenCreateColumn}>
                    Создать колонку
                  </button>
                </div>
              )}
            </DragDropProvider>
          </>
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

      {taskEditorState && (
        <TaskDialog
          task={editingTask}
          title={taskEditorState.mode === 'create' ? 'Новая задача' : 'Редактирование задачи'}
          submitLabel={taskEditorState.mode === 'create' ? 'Создать задачу' : 'Сохранить изменения'}
          onClose={handleCloseTaskDialog}
          onSubmit={handleTaskSubmit}
          {...(editingTask
            ? {
                onAddSubtask: (input) => {
                  addSubtask(editingTask.id, input);
                },
                onUpdateSubtask: (subtaskId, input) => {
                  updateSubtask(editingTask.id, subtaskId, input);
                },
                onToggleSubtask: (subtaskId) => {
                  toggleSubtask(editingTask.id, subtaskId);
                },
                onDeleteSubtask: (subtaskId) => {
                  deleteSubtask(editingTask.id, subtaskId);
                },
              }
            : {})}
        />
      )}

      {columnEditorState?.mode === 'create' && (
        <ColumnDialog
          title="Новая колонка"
          submitLabel="Создать"
          defaultValues={{
            title: '',
          }}
          onSubmit={handleCreateColumn}
          onClose={handleCloseColumnDialog}
        />
      )}

      {columnEditorState?.mode === 'rename' && editingColumn && (
        <ColumnDialog
          key={editingColumn.id}
          title="Переименование колонки"
          submitLabel="Сохранить"
          defaultValues={{
            title: editingColumn.title,
          }}
          onSubmit={handleRenameColumn}
          onClose={handleCloseColumnDialog}
        />
      )}

      {deletedTask && (
        <UndoSnackbar taskTitle={deletedTask.task.title} onUndo={undo} onDismiss={dismiss} />
      )}

      {isArchiveOpen && (
        <TaskArchive
          tasks={archivedTasks}
          columns={orderedColumns}
          onRestore={restoreArchivedTask}
          onDelete={handleDeleteArchivedTask}
          onClose={() => {
            setIsArchiveOpen(false);
          }}
        />
      )}
    </>
  );
}
