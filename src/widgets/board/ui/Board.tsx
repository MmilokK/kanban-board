import { useMemo, useRef, useState } from 'react';

import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import { useShallow } from 'zustand/react/shallow';

import type { Column } from '../../../entities/column/model/types';
import { BoardColumn } from '../../../entities/column/ui/BoardColumn';
import { useBoardStore } from '../../../entities/board/model/board-store';
import {
  selectTaskIdsByColumn,
  type TaskIdsByColumn,
} from '../../../entities/board/model/task-order';
import type { ColumnId, TaskId } from '../../../shared/model/entity-ids';
import type { Task } from '../../../entities/task/model/types';
import { TaskDialog } from '../../../features/task-editor/ui/TaskDialog';

import styles from './Board.module.scss';
import { parseTaskTags, type TaskFormValues } from '../../../features/task-editor/model/task-form';

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

function isColumn(column: Column | undefined): column is Column {
  return column !== undefined;
}

function isTask(task: Task | undefined): task is Task {
  return task !== undefined;
}

export function Board() {
  const {
    activeBoardId,
    boards,
    columns,
    tasks,
    addTask,
    updateTask,
    deleteTask,
    replaceTaskOrder,
  } = useBoardStore(
    useShallow((state) => ({
      activeBoardId: state.activeBoardId,
      boards: state.boards,
      columns: state.columns,
      tasks: state.tasks,
      addTask: state.addTask,
      updateTask: state.updateTask,
      deleteTask: state.deleteTask,
      replaceTaskOrder: state.replaceTaskOrder,
    })),
  );

  const [editorState, setEditorState] = useState<TaskEditorState>(null);

  const taskOrderSnapshotRef = useRef<TaskIdsByColumn>({});

  const activeBoard = activeBoardId ? boards[activeBoardId] : undefined;

  const orderedColumns = useMemo(() => {
    if (!activeBoard) {
      return [];
    }

    return activeBoard.columnIds.map((columnId) => columns[columnId]).filter(isColumn);
  }, [activeBoard, columns]);

  const editingTask = editorState?.mode === 'edit' ? (tasks[editorState.taskId] ?? null) : null;

  function handleOpenCreateTask(columnId: ColumnId) {
    setEditorState({
      mode: 'create',
      columnId,
    });
  }

  function handleOpenEditTask(taskId: TaskId) {
    const task = tasks[taskId];

    if (!task) {
      return;
    }

    setEditorState({
      mode: 'edit',
      taskId,
    });
  }

  function handleCloseTaskDialog() {
    setEditorState(null);
  }

  function handleTaskSubmit(input: TaskFormValues) {
    if (!editorState) {
      return;
    }
    const values = { ...input, tags: parseTaskTags(input.tags) };

    if (editorState.mode === 'create') {
      addTask(editorState.columnId, values);
    } else {
      updateTask(editorState.taskId, values);
    }

    setEditorState(null);
  }

  function handleDeleteTask(taskId: TaskId) {
    deleteTask(taskId);

    if (editorState?.mode === 'edit' && editorState.taskId === taskId) {
      setEditorState(null);
    }
  }

  if (!activeBoard) {
    return (
      <section className={styles.board} aria-labelledby="empty-board-title">
        <div className={styles.emptyState}>
          <h1 id="empty-board-title">Доска не найдена</h1>

          <p>Создай новую доску, чтобы начать работу с задачами.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <DragDropProvider
        onDragStart={() => {
          taskOrderSnapshotRef.current = selectTaskIdsByColumn(useBoardStore.getState());
        }}
        onDragOver={(event) => {
          const currentTaskOrder = selectTaskIdsByColumn(useBoardStore.getState());

          const nextTaskOrder = move(currentTaskOrder, event);

          replaceTaskOrder(nextTaskOrder);
        }}
        onDragEnd={(event) => {
          if (!event.canceled) {
            return;
          }

          replaceTaskOrder(taskOrderSnapshotRef.current);
        }}
      >
        <section className={styles.board} aria-label="Kanban-доска" aria-labelledby="board-title">
          <header className={styles.header}>
            <div>
              <h1 id="board-title">{activeBoard.title}</h1>
            </div>
          </header>

          <div className={styles.columns}>
            {orderedColumns.map((column) => {
              const columnTasks = column.taskIds.map((taskId) => tasks[taskId]).filter(isTask);

              return (
                <BoardColumn
                  key={column.id}
                  column={column}
                  tasks={columnTasks}
                  onCreateTask={() => {
                    handleOpenCreateTask(column.id);
                  }}
                  onEditTask={handleOpenEditTask}
                  onDeleteTask={handleDeleteTask}
                />
              );
            })}
          </div>
        </section>
      </DragDropProvider>

      {editorState && (
        <TaskDialog
          task={editingTask}
          title={editorState.mode === 'create' ? 'Новая задача' : 'Редактирование задачи'}
          submitLabel={editorState.mode === 'create' ? 'Создать задачу' : 'Сохранить изменения'}
          onClose={handleCloseTaskDialog}
          onSubmit={handleTaskSubmit}
        />
      )}
    </>
  );
}
