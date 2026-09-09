import { useMemo, useState } from 'react';
import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import type { Board as BoardEntity } from '../../../entities/board/model/types';
import type { TaskIdsByColumn } from '../../../entities/board/model/task-order';
import type { Column } from '../../../entities/column/model/types';
import { BoardColumn } from '../../../entities/column/ui/BoardColumn';
import type { CreateTaskInput, Task } from '../../../entities/task/model/types';
import type { ColumnFormValues } from '../../../features/column-managment/model/column-form';
import { ColumnDialog } from '../../../features/column-managment/ui/ColumnDialog';
import {
  DEFAULT_TASK_FILTERS,
  filterAndSortTasks,
  getAvailableTaskTags,
  hasActiveTaskFilters,
  hasModifiedTaskView,
  type TaskFilterState,
} from '../../../features/task-filtering/model/task-filter';
import { TaskFilters } from '../../../features/task-filtering/ui/TaskFilters';
import { TaskArchive } from '../../../features/task-archive/ui/TaskArchive';
import { TaskDialog } from '../../../features/task-editor/ui/TaskDialog';
import type { ColumnId, TaskId } from '../../../shared/model/entity-ids';
import styles from './Board.module.scss';

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

type ColumnEditorState =
  | {
      mode: 'create';
    }
  | {
      mode: 'rename';
      columnId: ColumnId;
    }
  | null;

type BoardViewProps = {
  board: BoardEntity;
  columns: Record<ColumnId, Column>;
  tasks: Record<TaskId, Task>;
  isArchiveOpen: boolean;
  canEdit?: boolean;
  onCloseArchive: () => void;
  onCreateColumn: (title: string) => void;
  onRenameColumn: (columnId: ColumnId, title: string) => void;
  onDeleteColumn: (columnId: ColumnId) => void;
  onMoveColumn: (columnId: ColumnId, targetIndex: number) => void;
  onCreateTask: (columnId: ColumnId, input: CreateTaskInput) => void;
  onUpdateTask: (taskId: TaskId, input: CreateTaskInput) => void;
  onDeleteTask: (taskId: TaskId) => void;
  onArchiveTask: (taskId: TaskId) => void;
  onRestoreArchivedTask: (taskId: TaskId, columnId: ColumnId) => void;
  onDeleteArchivedTask: (taskId: TaskId) => void;
  onReplaceTaskOrder: (nextOrder: TaskIdsByColumn, previousOrder: TaskIdsByColumn) => void;
  onAddSubtask: (
    taskId: TaskId,
    input: Parameters<NonNullable<React.ComponentProps<typeof TaskDialog>['onAddSubtask']>>[0],
  ) => void;
  onUpdateSubtask: (
    taskId: TaskId,
    subtaskId: string,
    input: Parameters<NonNullable<React.ComponentProps<typeof TaskDialog>['onUpdateSubtask']>>[1],
  ) => void;
  onToggleSubtask: (taskId: TaskId, subtaskId: string) => void;
  onDeleteSubtask: (taskId: TaskId, subtaskId: string) => void;
  onAddComment: (
    taskId: TaskId,
    input: Parameters<NonNullable<React.ComponentProps<typeof TaskDialog>['onAddComment']>>[0],
  ) => void;
  onUpdateComment: (
    taskId: TaskId,
    commentId: string,
    input: Parameters<NonNullable<React.ComponentProps<typeof TaskDialog>['onUpdateComment']>>[1],
  ) => void;
  onDeleteComment: (taskId: TaskId, commentId: string) => void;
};

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

function createTaskOrder(columns: Column[]): TaskIdsByColumn {
  return Object.fromEntries(
    columns.map((column) => [column.id, [...column.taskIds]]),
  ) as TaskIdsByColumn;
}

export function BoardView({
  board,
  columns,
  tasks,
  isArchiveOpen,
  canEdit = true,
  onCloseArchive,
  onCreateColumn,
  onRenameColumn,
  onDeleteColumn,
  onMoveColumn,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onArchiveTask,
  onRestoreArchivedTask,
  onDeleteArchivedTask,
  onReplaceTaskOrder,
  onAddSubtask,
  onUpdateSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
}: BoardViewProps) {
  const [taskEditorState, setTaskEditorState] = useState<TaskEditorState>(null);
  const [columnEditorState, setColumnEditorState] = useState<ColumnEditorState>(null);
  const [taskFilters, setTaskFilters] = useState<TaskFilterState>(createDefaultTaskFilters);
  const [dragTaskOrder, setDragTaskOrder] = useState<TaskIdsByColumn | null>(null);

  const orderedColumns = useMemo(() => {
    return board.columnIds
      .map((columnId) => columns[columnId])
      .filter(isColumn)
      .filter((column) => !column.isArchive);
  }, [board, columns]);

  const regularTaskOrder = useMemo(() => createTaskOrder(orderedColumns), [orderedColumns]);
  const effectiveTaskOrder = dragTaskOrder ?? regularTaskOrder;

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
        const taskIds = effectiveTaskOrder[column.id] ?? [];
        const columnTasks = taskIds.map((taskId) => tasks[taskId]).filter(isTask);

        return [
          column.id,

          filterAndSortTasks(columnTasks, taskFilters, {
            isCompletedColumn: column.isCompleted,
          }),
        ];
      }),
    ) as Record<ColumnId, Task[]>;
  }, [orderedColumns, effectiveTaskOrder, tasks, taskFilters]);

  const archiveColumn = useMemo(() => {
    return board.columnIds.map((columnId) => columns[columnId]).find((column) => column?.isArchive);
  }, [board, columns]);
  const archivedTasks = useMemo(() => {
    if (!archiveColumn) return [];

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
  const isTaskViewModified = hasModifiedTaskView(taskFilters);
  const isTaskFilterActive = hasActiveTaskFilters(taskFilters);

  function resetTaskFilters() {
    setTaskFilters(createDefaultTaskFilters());
  }

  function handleOpenCreateColumn() {
    if (!canEdit) return;
    setColumnEditorState({
      mode: 'create',
    });
  }

  function handleOpenRenameColumn(columnId: ColumnId) {
    if (!canEdit) return;
    if (!columns[columnId]) return;
    setColumnEditorState({
      mode: 'rename',
      columnId,
    });
  }

  function handleCloseColumnDialog() {
    setColumnEditorState(null);
  }

  function handleCreateColumn(values: ColumnFormValues) {
    if (!canEdit) return;
    if (columnEditorState?.mode !== 'create') return;
    onCreateColumn(values.title);
    setColumnEditorState(null);
  }

  function handleRenameColumn(values: ColumnFormValues) {
    if (!canEdit) return;
    if (columnEditorState?.mode !== 'rename') return;
    onRenameColumn(columnEditorState.columnId, values.title);
    setColumnEditorState(null);
  }

  function handleDeleteColumn(columnId: ColumnId) {
    if (!canEdit) return;
    const column = columns[columnId];
    if (!column) return;
    const taskCount = column.taskIds.length;
    const message =
      taskCount === 0
        ? `Удалить колонку «${column.title}»?`
        : `Удалить колонку «${column.title}» вместе с задачами: ${taskCount}?`;
    const confirmed = window.confirm(message);
    if (!confirmed) return;
    setTaskEditorState(null);
    setColumnEditorState(null);
    onDeleteColumn(columnId);
  }

  function handleOpenCreateTask(columnId: ColumnId) {
    if (!canEdit) return;
    setTaskEditorState({
      mode: 'create',
      columnId,
    });
  }

  function handleOpenEditTask(taskId: TaskId) {
    if (!tasks[taskId]) return;
    setTaskEditorState({
      mode: 'edit',
      taskId,
    });
  }

  function handleCloseTaskDialog() {
    setTaskEditorState(null);
  }

  function handleTaskSubmit(input: CreateTaskInput) {
    if (!canEdit) return;
    if (!taskEditorState) return;
    if (taskEditorState.mode === 'create') {
      onCreateTask(taskEditorState.columnId, input);
    } else {
      onUpdateTask(taskEditorState.taskId, input);
    }
    setTaskEditorState(null);
  }

  function handleDeleteTask(taskId: TaskId) {
    if (!canEdit) return;
    onDeleteTask(taskId);
    if (taskEditorState?.mode === 'edit' && taskEditorState.taskId === taskId) {
      setTaskEditorState(null);
    }
  }

  function handleDeleteArchivedTask(taskId: TaskId) {
    if (!canEdit) return;
    const task = tasks[taskId];
    if (!task) return;
    const confirmed = window.confirm(`Окончательно удалить задачу «${task.title}» из архива?`);
    if (!confirmed) return;
    onDeleteArchivedTask(taskId);
  }

  function handleDragStart() {
    if (!canEdit) return;
    if (isTaskViewModified) return;
    setDragTaskOrder(regularTaskOrder);
  }

  function handleDragOver(
    event: Parameters<NonNullable<React.ComponentProps<typeof DragDropProvider>['onDragOver']>>[0],
  ) {
    if (!canEdit || isTaskViewModified) return;
    setDragTaskOrder((currentOrder) => {
      const order = currentOrder ?? regularTaskOrder;
      return move(order, event);
    });
  }

  function handleDragEnd(
    event: Parameters<NonNullable<React.ComponentProps<typeof DragDropProvider>['onDragEnd']>>[0],
  ) {
    if (!canEdit || isTaskViewModified) return;
    const nextOrder = dragTaskOrder ?? regularTaskOrder;
    if (!event.canceled) {
      onReplaceTaskOrder(nextOrder, regularTaskOrder);
    }
    setDragTaskOrder(null);
  }

  return (
    <>
      <TaskFilters
        value={taskFilters}
        availableTags={availableTaskTags}
        visibleTaskCount={visibleTaskCount}
        totalTaskCount={activeBoardTasks.length}
        onChange={setTaskFilters}
        onReset={resetTaskFilters}
      />

      {!canEdit && (
        <p className={styles.dragNotice} role="status">
          Доска открыта в режиме просмотра.
        </p>
      )}

      {canEdit && isTaskViewModified && (
        <p className={styles.dragNotice} role="status">
          Перетаскивание задач доступно только при ручном порядке без активных фильтров.
        </p>
      )}

      <header className={styles.header}>
        <h1 id="board-title">{board.title}</h1>
        {canEdit && (
          <button type="button" onClick={handleOpenCreateColumn}>
            Новая колонка
          </button>
        )}
      </header>

      <DragDropProvider
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
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
                  canEdit={canEdit}
                  isTaskDragDisabled={!canEdit || isTaskViewModified}
                  onCreateTask={() => {
                    handleOpenCreateTask(column.id);
                  }}
                  onEditTask={handleOpenEditTask}
                  onDeleteTask={handleDeleteTask}
                  onArchiveTask={onArchiveTask}
                  onRenameColumn={() => {
                    handleOpenRenameColumn(column.id);
                  }}
                  onDeleteColumn={() => {
                    handleDeleteColumn(column.id);
                  }}
                  onMoveColumnLeft={() => {
                    onMoveColumn(column.id, columnIndex - 1);
                  }}
                  onMoveColumnRight={() => {
                    onMoveColumn(column.id, columnIndex + 1);
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
            {canEdit && (
              <button type="button" onClick={handleOpenCreateColumn}>
                Создать колонку
              </button>
            )}
          </div>
        )}
      </DragDropProvider>

      {taskEditorState && (
        <TaskDialog
          task={editingTask}
          columns={columns}
          title={taskEditorState.mode === 'create' ? 'Новая задача' : 'Редактирование задачи'}
          submitLabel={taskEditorState.mode === 'create' ? 'Создать задачу' : 'Сохранить изменения'}
          onClose={handleCloseTaskDialog}
          onSubmit={handleTaskSubmit}
          {...(editingTask
            ? {
                onAddSubtask: (input) => {
                  onAddSubtask(editingTask.id, input);
                },
                onUpdateSubtask: (subtaskId, input) => {
                  onUpdateSubtask(editingTask.id, subtaskId, input);
                },
                onToggleSubtask: (subtaskId) => {
                  onToggleSubtask(editingTask.id, subtaskId);
                },
                onDeleteSubtask: (subtaskId) => {
                  onDeleteSubtask(editingTask.id, subtaskId);
                },
                onAddComment: (input) => {
                  onAddComment(editingTask.id, input);
                },
                onUpdateComment: (commentId, input) => {
                  onUpdateComment(editingTask.id, commentId, input);
                },
                onDeleteComment: (commentId) => {
                  onDeleteComment(editingTask.id, commentId);
                },
              }
            : {})}
        />
      )}

      {canEdit && columnEditorState?.mode === 'create' && (
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

      {canEdit && columnEditorState?.mode === 'rename' && editingColumn && (
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

      {isArchiveOpen && (
        <TaskArchive
          tasks={archivedTasks}
          columns={orderedColumns}
          canEdit={canEdit}
          onRestore={(taskId, columnId) => {
            if (!canEdit) return;
            onRestoreArchivedTask(taskId, columnId);
          }}
          onDelete={handleDeleteArchivedTask}
          onClose={onCloseArchive}
        />
      )}
    </>
  );
}
