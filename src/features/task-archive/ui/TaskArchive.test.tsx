import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import type { Column } from '../../../entities/column/model/types';
import type { Task } from '../../../entities/task/model/types';

import { TaskArchive } from './TaskArchive';

const columns: Column[] = [
  {
    id: 'backlog',
    boardId: 'board-1',
    title: 'Backlog',
    taskIds: [],
    isCompleted: false,
    isArchive: false,
  },
  {
    id: 'done',
    boardId: 'board-1',
    title: 'Done',
    taskIds: [],
    isCompleted: true,
    isArchive: false,
  },
];

const task: Task = {
  id: 'task-1',
  title: 'Архивированная задача',
  description: 'Описание задачи',
  priority: 'medium',
  tags: ['Работа'],
  subtasks: [],
  comments: [],
  history: [],
  dueDate: null,
  archivedAt: '2026-08-10T10:00:00.000Z',
  createdAt: '2026-08-01T10:00:00.000Z',
  updatedAt: '2026-08-10T10:00:00.000Z',
};

describe('Архив задач', () => {
  it('показывает пустое состояние', () => {
    render(
      <TaskArchive
        tasks={[]}
        columns={columns}
        onRestore={vi.fn()}
        onDelete={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByText('В архиве пока нет задач.')).toBeInTheDocument();
  });

  it('показывает архивированную задачу', () => {
    render(
      <TaskArchive
        tasks={[task]}
        columns={columns}
        onRestore={vi.fn()}
        onDelete={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByText(task.title)).toBeInTheDocument();

    expect(screen.getByText(task.description)).toBeInTheDocument();
  });

  it('показывает количество архивированных задач', () => {
    render(
      <TaskArchive
        tasks={[task]}
        columns={columns}
        onRestore={vi.fn()}
        onDelete={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByText('Архивировано: 1')).toBeInTheDocument();
  });

  it('показывает доступные колонки для восстановления', () => {
    render(
      <TaskArchive
        tasks={[task]}
        columns={columns}
        onRestore={vi.fn()}
        onDelete={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    const select = screen.getByRole('combobox', {
      name: 'Восстановить в',
    });

    expect(select).toHaveValue('backlog');

    expect(
      screen.getByRole('option', {
        name: 'Backlog',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('option', {
        name: 'Done',
      }),
    ).toBeInTheDocument();
  });

  it('восстанавливает задачу в выбранную колонку', async () => {
    const user = userEvent.setup();

    const onRestore = vi.fn();

    render(
      <TaskArchive
        tasks={[task]}
        columns={columns}
        onRestore={onRestore}
        onDelete={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    await user.selectOptions(
      screen.getByRole('combobox', {
        name: 'Восстановить в',
      }),
      'done',
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Восстановить',
      }),
    );

    expect(onRestore).toHaveBeenCalledWith(task.id, 'done');
  });

  it('удаляет задачу из архива', async () => {
    const user = userEvent.setup();

    const onDelete = vi.fn();

    render(
      <TaskArchive
        tasks={[task]}
        columns={columns}
        onRestore={vi.fn()}
        onDelete={onDelete}
        onClose={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: `Удалить из архива задачу ${task.title}`,
      }),
    );

    expect(onDelete).toHaveBeenCalledWith(task.id);
  });

  it('закрывает архив', async () => {
    const user = userEvent.setup();

    const onClose = vi.fn();

    render(
      <TaskArchive
        tasks={[task]}
        columns={columns}
        onRestore={vi.fn()}
        onDelete={vi.fn()}
        onClose={onClose}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Закрыть архив',
      }),
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
