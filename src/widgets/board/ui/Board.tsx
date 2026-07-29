import { useState } from 'react';
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
  const { tasks, columns, columnOrder, addTask, updateTask, deleteTask } = useBoardStore(
    useShallow((state) => ({
      tasks: state.tasks,
      columns: state.columns,
      columnOrder: state.columnOrder,
      addTask: state.addTask,
      updateTask: state.updateTask,
      deleteTask: state.deleteTask,
    })),
  );

  const [editorState, setEditorState] = useState<TaskEditorState>(null);

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

  return (
    <>
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
