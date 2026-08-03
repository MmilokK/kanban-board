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

function isBoard(board: BoardEntity | undefined): board is BoardEntity {
  return board !== undefined;
}

function isColumn(column: Column | undefined): column is Column {
  return column !== undefined;
}

function isTask(task: Task | undefined): task is Task {
  return task !== undefined;
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

    addTask,
    updateTask,
    deleteTask,
    replaceTaskOrder,
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

      addTask: state.addTask,
      updateTask: state.updateTask,
      deleteTask: state.deleteTask,
      replaceTaskOrder: state.replaceTaskOrder,
    })),
  );

  const [taskEditorState, setTaskEditorState] = useState<TaskEditorState>(null);

  const [boardEditorState, setBoardEditorState] = useState<BoardEditorState>(null);

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

    return activeBoard.columnIds.map((columnId) => columns[columnId]).filter(isColumn);
  }, [activeBoard, columns]);

  const editingTask =
    taskEditorState?.mode === 'edit' ? (tasks[taskEditorState.taskId] ?? null) : null;

  const editingBoard =
    boardEditorState?.mode === 'rename' ? boards[boardEditorState.boardId] : undefined;

  function handleSelectBoard(boardId: BoardId) {
    setTaskEditorState(null);
    setBoardEditorState(null);
    setActiveBoard(boardId);
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

    deleteBoard(activeBoard.id);
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
    deleteTask(taskId);

    if (taskEditorState?.mode === 'edit' && taskEditorState.taskId === taskId) {
      setTaskEditorState(null);
    }
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
        />

        {activeBoard ? (
          <>
            <header className={styles.header}>
              <div>
                <h1 id="board-title">{activeBoard.title}</h1>
              </div>
            </header>

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
                if (event.canceled) {
                  replaceTaskOrder(taskOrderSnapshotRef.current);
                }

                taskOrderSnapshotRef.current = {};
              }}
            >
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
        />
      )}
    </>
  );
}
