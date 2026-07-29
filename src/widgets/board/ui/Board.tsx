import { useRef, useState } from 'react';

import { DragDropProvider, type DragEndEvent, type DragOverEvent } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import {
  selectTaskIdsByColumn,
  type TaskIdsByColumn,
} from '../../../entities/board/model/task-order';
import { useShallow } from 'zustand/react/shallow';

import { useBoardStore } from '../../../entities/board/model/board-store';
import type { ColumnId } from '../../../entities/column/model/types';
import { BoardColumn } from '../../../entities/column/ui/BoardColumn';
import type { CreateTaskInput, Task, TaskId } from '../../../entities/task/model/types';

import { parseTaskTags, type TaskFormValues } from '../../../features/task-editor/model/task-form';
import { TaskDialog } from '../../../features/task-editor/ui/TaskDialog';

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

export function Board() {
  const { tasks, columns, columnOrder, addTask, updateTask, deleteTask, replaceTaskOrder } =
    useBoardStore(
      useShallow((state) => ({
        tasks: state.tasks,
        columns: state.columns,
        columnOrder: state.columnOrder,
        addTask: state.addTask,
        updateTask: state.updateTask,
        deleteTask: state.deleteTask,
        replaceTaskOrder: state.replaceTaskOrder,
      })),
    );

  const [editorState, setEditorState] = useState<TaskEditorState>(null);
  const previousTaskOrderRef = useRef<TaskIdsByColumn | null>(null);

  const editedTask = editorState?.mode === 'edit' ? (tasks[editorState.taskId] ?? null) : null;

  function handleCreateTask(columnId: ColumnId): void {
    setEditorState({
      mode: 'create',
      columnId,
    });
  }

  function handleEditTask(taskId: TaskId): void {
    setEditorState({
      mode: 'edit',
      taskId,
    });
  }

  function handleCloseEditor(): void {
    setEditorState(null);
  }

  function handleSubmitTask(values: TaskFormValues): void {
    if (!editorState) {
      return;
    }

    const input = {
      ...values,
      tags: parseTaskTags(values.tags),
    } satisfies CreateTaskInput;

    if (editorState.mode === 'create') {
      addTask(input, editorState.columnId);
      return;
    }

    updateTask(editorState.taskId, input);
  }

  function handleDragStart(): void {
    previousTaskOrderRef.current = selectTaskIdsByColumn(useBoardStore.getState());
  }

  function handleDragOver(event: DragOverEvent): void {
    const currentTaskOrder = selectTaskIdsByColumn(useBoardStore.getState());

    const nextTaskOrder = move(currentTaskOrder, event);

    replaceTaskOrder(nextTaskOrder);
  }

  function handleDragEnd(event: DragEndEvent): void {
    if (event.canceled && previousTaskOrderRef.current) {
      replaceTaskOrder(previousTaskOrderRef.current);
    }

    previousTaskOrderRef.current = null;
  }

  return (
    <>
      <DragDropProvider
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <section className={styles.board} aria-label="Kanban-доска">
          {columnOrder.map((columnId) => {
            const column = columns[columnId];

            const columnTasks = column.taskIds
              .map((taskId) => tasks[taskId])
              .filter((task): task is Task => task !== undefined);

            return (
              <BoardColumn
                column={column}
                key={column.id}
                tasks={columnTasks}
                onCreateTask={handleCreateTask}
                onDeleteTask={deleteTask}
                onEditTask={handleEditTask}
              />
            );
          })}
        </section>
      </DragDropProvider>

      {editorState && (
        <TaskDialog
          task={editedTask}
          title={editorState.mode === 'create' ? 'Новая задача' : 'Редактирование задачи'}
          submitLabel={editorState.mode === 'create' ? 'Создать задачу' : 'Сохранить изменения'}
          onClose={handleCloseEditor}
          onSubmit={handleSubmitTask}
        />
      )}
    </>
  );
}
