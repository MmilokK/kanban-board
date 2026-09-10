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

  it('обновляет значения из сервера, если форма не была изменена локально', async () => {
    const { rerender } = render(
      <TaskForm
        task={task}
        submitLabel="Сохранить изменения"
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    rerender(
      <TaskForm
        task={{
          ...task,
          title: 'Обновлённая задача',
          description: 'Новое описание',
          priority: 'high',
        }}
        submitLabel="Сохранить изменения"
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Название')).toHaveValue('Обновлённая задача');
    });

    expect(screen.getByLabelText('Описание')).toHaveValue('Новое описание');
    expect(screen.getByLabelText('Приоритет')).toHaveValue('high');
  });

  it('не перезаписывает локальные изменения при обновлении задачи с сервера', async () => {
    const user = userEvent.setup();

    const { rerender } = render(
      <TaskForm
        task={task}
        submitLabel="Сохранить изменения"
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    const titleInput = screen.getByLabelText('Название');

    await user.clear(titleInput);
    await user.type(titleInput, 'Мои локальные изменения');

    rerender(
      <TaskForm
        task={{
          ...task,
          title: 'Изменение другого пользователя',
        }}
        submitLabel="Сохранить изменения"
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('Название')).toHaveValue('Мои локальные изменения');

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Задача была изменена другим пользователем.',
    );
  });

  it('загружает серверные изменения по запросу пользователя', async () => {
    const user = userEvent.setup();

    const { rerender } = render(
      <TaskForm
        task={task}
        submitLabel="Сохранить изменения"
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    const titleInput = screen.getByLabelText('Название');

    await user.clear(titleInput);
    await user.type(titleInput, 'Мои локальные изменения');

    rerender(
      <TaskForm
        task={{
          ...task,
          title: 'Свежая версия с сервера',
        }}
        submitLabel="Сохранить изменения"
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Загрузить изменения',
      }),
    );

    expect(screen.getByLabelText('Название')).toHaveValue('Свежая версия с сервера');

    expect(
      screen.queryByText('Задача была изменена другим пользователем.'),
    ).not.toBeInTheDocument();
  });

  it('сохраняет локальные значения после выбора продолжить редактирование', async () => {
    const user = userEvent.setup();

    const { rerender } = render(
      <TaskForm
        task={task}
        submitLabel="Сохранить изменения"
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    const titleInput = screen.getByLabelText('Название');

    await user.clear(titleInput);
    await user.type(titleInput, 'Локальная версия');

    rerender(
      <TaskForm
        task={{
          ...task,
          title: 'Серверная версия',
        }}
        submitLabel="Сохранить изменения"
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Продолжить редактирование',
      }),
    );

    expect(screen.getByLabelText('Название')).toHaveValue('Локальная версия');

    expect(
      screen.queryByText('Задача была изменена другим пользователем.'),
    ).not.toBeInTheDocument();
  });

  it('сбрасывает локальные изменения при потере права редактирования', async () => {
    const user = userEvent.setup();

    const { rerender } = render(
      <TaskForm
        task={task}
        submitLabel="Сохранить изменения"
        canEdit
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    const titleInput = screen.getByLabelText('Название');

    await user.clear(titleInput);
    await user.type(titleInput, 'Несохранённое изменение');

    rerender(
      <TaskForm
        task={{
          ...task,
          title: 'Актуальное название с сервера',
        }}
        submitLabel="Сохранить изменения"
        canEdit={false}
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Название')).toHaveValue('Актуальное название с сервера');
    });

    expect(screen.getByLabelText('Название')).toHaveAttribute('readonly');

    expect(
      screen.queryByRole('button', {
        name: 'Сохранить изменения',
      }),
    ).not.toBeInTheDocument();
  });
});
