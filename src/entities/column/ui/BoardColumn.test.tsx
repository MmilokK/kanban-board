import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DragDropProvider } from '@dnd-kit/react';
import { describe, expect, it, vi } from 'vitest';

import type { ColumnId, TaskId } from '../../../shared/model/entity-ids';
import type { Task } from '../../task/model/types';
import type { Column } from '../model/types';

import { BoardColumn } from './BoardColumn';

const COLUMN_ID: ColumnId = 'column-backlog';
const TASK_ID: TaskId = '00000000-0000-4000-8000-000000000001';

const column: Column = {
  id: COLUMN_ID,
  boardId: 'board-default',
  title: 'Backlog',
  taskIds: [],
  isCompleted: false,
};

const task: Task = {
  id: TASK_ID,
  title: 'Подготовить отчёт',
  description: 'Собрать данные за месяц',
  priority: 'high',
  tags: ['работа', 'отчёт'],
  createdAt: '2026-08-04T10:00:00.000Z',
  updatedAt: '2026-08-04T10:00:00.000Z',
};

type RenderBoardColumnOptions = {
  columnValue?: Column;
  tasks?: Task[];
  emptyMessage?: string;
  isTaskDragDisabled?: boolean;
  canMoveColumnLeft?: boolean;
  canMoveColumnRight?: boolean;
};

function renderBoardColumn({
  columnValue = column,
  tasks = [],
  emptyMessage = '',
  isTaskDragDisabled = false,

  canMoveColumnLeft = true,
  canMoveColumnRight = true,
}: RenderBoardColumnOptions = {}) {
  const onCreateTask = vi.fn();
  const onEditTask = vi.fn();
  const onDeleteTask = vi.fn();

  const onRenameColumn = vi.fn();
  const onDeleteColumn = vi.fn();
  const onMoveColumnLeft = vi.fn();
  const onMoveColumnRight = vi.fn();

  render(
    <DragDropProvider>
      <BoardColumn
        column={columnValue}
        tasks={tasks}
        emptyMessage={emptyMessage}
        isTaskDragDisabled={isTaskDragDisabled}
        onCreateTask={onCreateTask}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
        onRenameColumn={onRenameColumn}
        onDeleteColumn={onDeleteColumn}
        onMoveColumnLeft={onMoveColumnLeft}
        onMoveColumnRight={onMoveColumnRight}
        canMoveColumnLeft={canMoveColumnLeft}
        canMoveColumnRight={canMoveColumnRight}
      />
    </DragDropProvider>,
  );

  return {
    onCreateTask,
    onEditTask,
    onDeleteTask,
    onRenameColumn,
    onDeleteColumn,
    onMoveColumnLeft,
    onMoveColumnRight,
  };
}

describe('Колонка доски', () => {
  it('показывает название колонки', () => {
    renderBoardColumn();

    expect(
      screen.getByRole('heading', {
        name: 'Backlog',
      }),
    ).toBeInTheDocument();
  });

  it('показывает количество задач', () => {
    renderBoardColumn({
      columnValue: {
        ...column,
        taskIds: [TASK_ID],
      },
      tasks: [task],
    });

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('показывает задачи колонки', () => {
    renderBoardColumn({
      columnValue: {
        ...column,
        taskIds: [TASK_ID],
      },
      tasks: [task],
    });

    expect(screen.getByText('Подготовить отчёт')).toBeInTheDocument();

    expect(screen.getByText('Собрать данные за месяц')).toBeInTheDocument();
  });

  it('вызывает создание задачи', async () => {
    const user = userEvent.setup();

    const { onCreateTask } = renderBoardColumn();

    await user.click(
      screen.getByRole('button', {
        name: /создать задачу|добавить задачу/i,
      }),
    );

    expect(onCreateTask).toHaveBeenCalledTimes(1);
  });

  it('вызывает переименование колонки', async () => {
    const user = userEvent.setup();

    const { onRenameColumn } = renderBoardColumn();

    await user.click(
      screen.getByRole('button', {
        name: 'Переименовать колонку Backlog',
      }),
    );

    expect(onRenameColumn).toHaveBeenCalledTimes(1);
  });

  it('вызывает удаление колонки', async () => {
    const user = userEvent.setup();

    const { onDeleteColumn } = renderBoardColumn();

    await user.click(
      screen.getByRole('button', {
        name: 'Удалить колонку Backlog',
      }),
    );

    expect(onDeleteColumn).toHaveBeenCalledTimes(1);
  });

  it('перемещает колонку влево', async () => {
    const user = userEvent.setup();

    const { onMoveColumnLeft } = renderBoardColumn();

    await user.click(
      screen.getByRole('button', {
        name: 'Переместить колонку Backlog влево',
      }),
    );

    expect(onMoveColumnLeft).toHaveBeenCalledTimes(1);
  });

  it('перемещает колонку вправо', async () => {
    const user = userEvent.setup();

    const { onMoveColumnRight } = renderBoardColumn();

    await user.click(
      screen.getByRole('button', {
        name: 'Переместить колонку Backlog вправо',
      }),
    );

    expect(onMoveColumnRight).toHaveBeenCalledTimes(1);
  });

  it('отключает перемещение влево для первой колонки', () => {
    renderBoardColumn({
      canMoveColumnLeft: false,
    });

    expect(
      screen.getByRole('button', {
        name: 'Переместить колонку Backlog влево',
      }),
    ).toBeDisabled();
  });

  it('отключает перемещение вправо для последней колонки', () => {
    renderBoardColumn({
      canMoveColumnRight: false,
    });

    expect(
      screen.getByRole('button', {
        name: 'Переместить колонку Backlog вправо',
      }),
    ).toBeDisabled();
  });

  it('оставляет перемещение доступным для средней колонки', () => {
    renderBoardColumn({
      canMoveColumnLeft: true,
      canMoveColumnRight: true,
    });

    expect(
      screen.getByRole('button', {
        name: 'Переместить колонку Backlog влево',
      }),
    ).toBeEnabled();

    expect(
      screen.getByRole('button', {
        name: 'Переместить колонку Backlog вправо',
      }),
    ).toBeEnabled();
  });

  it('не вызывает перемещение при нажатии на отключённую кнопку', async () => {
    const user = userEvent.setup();

    const { onMoveColumnLeft, onMoveColumnRight } = renderBoardColumn({
      canMoveColumnLeft: false,
      canMoveColumnRight: false,
    });

    await user.click(
      screen.getByRole('button', {
        name: 'Переместить колонку Backlog влево',
      }),
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Переместить колонку Backlog вправо',
      }),
    );

    expect(onMoveColumnLeft).not.toHaveBeenCalled();

    expect(onMoveColumnRight).not.toHaveBeenCalled();
  });

  it('передаёт идентификатор задачи при редактировании', async () => {
    const user = userEvent.setup();

    const { onEditTask } = renderBoardColumn({
      columnValue: {
        ...column,
        taskIds: [TASK_ID],
      },
      tasks: [task],
    });

    await user.click(
      screen.getByRole('button', {
        name: `Изменить задачу ${task.title}`,
      }),
    );

    expect(onEditTask).toHaveBeenCalledTimes(1);

    expect(onEditTask).toHaveBeenCalledWith(TASK_ID);
  });

  it('передаёт идентификатор задачи при удалении', async () => {
    const user = userEvent.setup();

    const { onDeleteTask } = renderBoardColumn({
      columnValue: {
        ...column,
        taskIds: [TASK_ID],
      },
      tasks: [task],
    });

    await user.click(
      screen.getByRole('button', {
        name: `Удалить задачу ${task.title}`,
      }),
    );

    expect(onDeleteTask).toHaveBeenCalledTimes(1);

    expect(onDeleteTask).toHaveBeenCalledWith(TASK_ID);
  });

  it('показывает сообщение об отсутствии подходящих задач', () => {
    renderBoardColumn({
      tasks: [],
      emptyMessage: 'Нет подходящих задач',
    });

    expect(screen.getByText('Нет подходящих задач')).toBeInTheDocument();
  });

  it('отключает перемещение задачи при изменённом представлении', () => {
    renderBoardColumn({
      columnValue: {
        ...column,
        taskIds: [TASK_ID],
      },
      tasks: [task],
      isTaskDragDisabled: true,
    });

    expect(
      screen.getByRole('button', {
        name: `Переместить задачу «${task.title}»`,
      }),
    ).toBeDisabled();
  });
});
