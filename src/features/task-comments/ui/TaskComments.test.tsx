import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { TaskComment } from '../../../entities/task/model/types';
import { TaskComments } from './TaskComments';

const comments: TaskComment[] = [
  {
    id: 'comment-1',

    text: 'Первый комментарий',

    createdAt: '2026-08-10T10:00:00.000Z',

    updatedAt: '2026-08-10T10:00:00.000Z',
  },

  {
    id: 'comment-2',

    text: 'Второй комментарий',

    createdAt: '2026-08-11T10:00:00.000Z',

    updatedAt: '2026-08-11T12:00:00.000Z',
  },
];

describe('Комментарии задачи', () => {
  it('показывает пустое состояние', () => {
    render(<TaskComments comments={[]} onAdd={vi.fn()} onUpdate={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('Комментариев пока нет.')).toBeInTheDocument();
  });

  it('показывает комментарии', () => {
    render(
      <TaskComments comments={comments} onAdd={vi.fn()} onUpdate={vi.fn()} onDelete={vi.fn()} />,
    );

    expect(screen.getByText('Первый комментарий')).toBeInTheDocument();

    expect(screen.getByText('Второй комментарий')).toBeInTheDocument();
  });

  it('показывает количество комментариев', () => {
    render(
      <TaskComments comments={comments} onAdd={vi.fn()} onUpdate={vi.fn()} onDelete={vi.fn()} />,
    );

    expect(
      screen.getByRole('heading', {
        name: 'Комментарии',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText('2', {
        exact: true,
      }),
    ).toBeInTheDocument();
  });

  it('добавляет комментарий', async () => {
    const user = userEvent.setup();

    const onAdd = vi.fn();

    render(<TaskComments comments={[]} onAdd={onAdd} onUpdate={vi.fn()} onDelete={vi.fn()} />);

    await user.type(
      screen.getByRole('textbox', {
        name: 'Новый комментарий',
      }),
      'Новый комментарий',
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Добавить комментарий',
      }),
    );

    expect(onAdd).toHaveBeenCalledWith({
      text: 'Новый комментарий',
    });
  });

  it('не позволяет добавить пустой комментарий', () => {
    render(<TaskComments comments={[]} onAdd={vi.fn()} onUpdate={vi.fn()} onDelete={vi.fn()} />);

    expect(
      screen.getByRole('button', {
        name: 'Добавить комментарий',
      }),
    ).toBeDisabled();
  });

  it('редактирует комментарий', async () => {
    const user = userEvent.setup();

    const onUpdate = vi.fn();

    render(
      <TaskComments comments={comments} onAdd={vi.fn()} onUpdate={onUpdate} onDelete={vi.fn()} />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Изменить комментарий Первый комментарий',
      }),
    );

    const textbox = screen.getByRole('textbox', {
      name: 'Комментарий',
    });

    await user.clear(textbox);

    await user.type(textbox, 'Обновлённый комментарий');

    await user.click(
      screen.getByRole('button', {
        name: 'Сохранить',
      }),
    );

    expect(onUpdate).toHaveBeenCalledWith('comment-1', {
      text: 'Обновлённый комментарий',
    });
  });

  it('удаляет комментарий', async () => {
    const user = userEvent.setup();

    const onDelete = vi.fn();

    render(
      <TaskComments comments={comments} onAdd={vi.fn()} onUpdate={vi.fn()} onDelete={onDelete} />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Удалить комментарий Первый комментарий',
      }),
    );

    expect(onDelete).toHaveBeenCalledWith('comment-1');
  });

  it('показывает отметку изменения комментария', () => {
    render(
      <TaskComments comments={comments} onAdd={vi.fn()} onUpdate={vi.fn()} onDelete={vi.fn()} />,
    );

    expect(screen.getByText('изменён')).toBeInTheDocument();
  });
});
