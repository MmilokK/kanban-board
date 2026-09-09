import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TaskForm } from './TaskForm';

const task = {
  id: 'task-1',
  title: 'Существующая задача',
  description: 'Описание задачи',
  priority: 'low' as const,
  tags: ['React', 'CSS'],
  subtasks: [],
  comments: [],
  history: [],
  dueDate: '2026-07-10',
  createdAt: '2026-07-01T10:00:00.000Z',
  updatedAt: '2026-07-01T10:00:00.000Z',
  archivedAt: null,
};

describe('Форма задачи', () => {
  it('показывает ошибку для пустого названия', async () => {
    const user = userEvent.setup();

    render(
      <TaskForm task={null} submitLabel="Создать задачу" onCancel={vi.fn()} onSubmit={vi.fn()} />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Создать задачу',
      }),
    );

    expect(await screen.findByRole('alert')).toHaveTextContent('Введите название задачи');
  });

  it('отправляет заполненные данные', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TaskForm task={null} submitLabel="Создать задачу" onCancel={vi.fn()} onSubmit={onSubmit} />,
    );

    await user.type(screen.getByLabelText('Название'), 'Изучить Playwright');

    await user.type(screen.getByLabelText('Описание'), 'Добавить E2E-тест');

    await user.selectOptions(screen.getByLabelText('Приоритет'), 'high');

    await user.type(screen.getByLabelText('Теги'), 'React, Testing');

    await user.click(
      screen.getByRole('button', {
        name: 'Создать задачу',
      }),
    );

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit.mock.calls[0]?.[0]).toEqual({
      title: 'Изучить Playwright',
      dueDate: '',
      description: 'Добавить E2E-тест',
      priority: 'high',
      tags: 'React, Testing',
    });
  });

  it('показывает значения редактируемой задачи', () => {
    render(
      <TaskForm
        task={task}
        submitLabel="Сохранить изменения"
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('Название')).toHaveValue('Существующая задача');

    expect(screen.getByLabelText('Описание')).toHaveValue('Описание задачи');

    expect(screen.getByLabelText('Приоритет')).toHaveValue('low');

    expect(screen.getByLabelText('Теги')).toHaveValue('React, CSS');

    expect(screen.getByLabelText('Срок выполнения')).toHaveValue('2026-07-10');
  });

  it('переводит поля в режим только для чтения без права редактирования', () => {
    render(
      <TaskForm
        task={task}
        submitLabel="Сохранить изменения"
        canEdit={false}
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('Название')).toHaveAttribute('readonly');

    expect(screen.getByLabelText('Описание')).toHaveAttribute('readonly');

    expect(screen.getByLabelText('Теги')).toHaveAttribute('readonly');

    expect(screen.getByLabelText('Приоритет')).toBeDisabled();

    expect(screen.getByLabelText('Срок выполнения')).toBeDisabled();
  });

  it('скрывает сохранение без права редактирования', () => {
    render(
      <TaskForm
        task={task}
        submitLabel="Сохранить изменения"
        canEdit={false}
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole('button', {
        name: 'Сохранить изменения',
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Закрыть',
      }),
    ).toBeInTheDocument();
  });

  it('закрывает форму в режиме просмотра', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(
      <TaskForm
        task={task}
        submitLabel="Сохранить изменения"
        canEdit={false}
        onCancel={onCancel}
        onSubmit={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Закрыть',
      }),
    );

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
