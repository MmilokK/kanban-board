import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Subtask } from '../../../entities/task/model/types';
import { SubtaskList } from './SubtaskList';

const subtasks: Subtask[] = [
  {
    id: 'subtask-1',
    title: 'Написать код',
    description: 'Реализовать store',
    isCompleted: true,
  },
  {
    id: 'subtask-2',
    title: 'Написать тесты',
    description: 'Проверить UI',
    isCompleted: false,
  },
];

describe('Список подзадач', () => {
  it('показывает название и описание подзадач', () => {
    render(
      <SubtaskList
        subtasks={subtasks}
        onAdd={vi.fn()}
        onUpdate={vi.fn()}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText('Написать код')).toBeInTheDocument();
    expect(screen.getByText('Реализовать store')).toBeInTheDocument();
  });

  it('показывает прогресс', () => {
    render(
      <SubtaskList
        subtasks={subtasks}
        onAdd={vi.fn()}
        onUpdate={vi.fn()}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText('1 из 2')).toBeInTheDocument();
  });

  it('добавляет подзадачу с описанием', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    render(
      <SubtaskList
        subtasks={[]}
        onAdd={onAdd}
        onUpdate={vi.fn()}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    const textboxes = screen.getAllByRole('textbox');

    await user.type(textboxes[0]!, 'Написать E2E');
    await user.type(textboxes[1]!, 'Проверить сценарии');

    await user.click(
      screen.getByRole('button', {
        name: 'Добавить подзадачу',
      }),
    );

    expect(onAdd).toHaveBeenCalledWith({
      title: 'Написать E2E',
      description: 'Проверить сценарии',
    });
  });

  it('отмечает подзадачу выполненной', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(
      <SubtaskList
        subtasks={subtasks}
        onAdd={vi.fn()}
        onUpdate={vi.fn()}
        onToggle={onToggle}
        onDelete={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole('checkbox', {
        name: /Написать тесты/i,
      }),
    );

    expect(onToggle).toHaveBeenCalledWith('subtask-2');
  });

  it('показывает выполненную подзадачу отмеченной', () => {
    render(
      <SubtaskList
        subtasks={subtasks}
        onAdd={vi.fn()}
        onUpdate={vi.fn()}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('checkbox', {
        name: /Написать код/i,
      }),
    ).toBeChecked();
  });

  it('редактирует название и описание подзадачи', async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();

    render(
      <SubtaskList
        subtasks={subtasks}
        onAdd={vi.fn()}
        onUpdate={onUpdate}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Редактировать подзадачу Написать тесты',
      }),
    );

    const textboxes = screen.getAllByRole('textbox');
    const titleInput = textboxes[0]!;
    const descriptionInput = textboxes[1]!;

    await user.clear(titleInput);
    await user.type(titleInput, 'Проверить тесты');

    await user.clear(descriptionInput);
    await user.type(descriptionInput, 'Vitest и Playwright');

    await user.click(
      screen.getByRole('button', {
        name: 'Сохранить',
      }),
    );

    expect(onUpdate).toHaveBeenCalledWith('subtask-2', {
      title: 'Проверить тесты',
      description: 'Vitest и Playwright',
    });
  });

  it('удаляет подзадачу', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <SubtaskList
        subtasks={subtasks}
        onAdd={vi.fn()}
        onUpdate={vi.fn()}
        onToggle={vi.fn()}
        onDelete={onDelete}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Удалить подзадачу Написать тесты',
      }),
    );

    expect(onDelete).toHaveBeenCalledWith('subtask-2');
  });

  it('показывает подзадачи без права редактирования', () => {
    render(
      <SubtaskList
        subtasks={subtasks}
        canEdit={false}
        onAdd={vi.fn()}
        onUpdate={vi.fn()}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText('Написать код')).toBeInTheDocument();
    expect(screen.getByText('Реализовать store')).toBeInTheDocument();
    expect(screen.getByText('Написать тесты')).toBeInTheDocument();
    expect(screen.getByText('Проверить UI')).toBeInTheDocument();
  });

  it('отключает переключение подзадач без права редактирования', () => {
    render(
      <SubtaskList
        subtasks={subtasks}
        canEdit={false}
        onAdd={vi.fn()}
        onUpdate={vi.fn()}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('checkbox', {
        name: /Написать код/i,
      }),
    ).toBeDisabled();

    expect(
      screen.getByRole('checkbox', {
        name: /Написать тесты/i,
      }),
    ).toBeDisabled();
  });

  it('скрывает изменение и удаление подзадач без права редактирования', () => {
    render(
      <SubtaskList
        subtasks={subtasks}
        canEdit={false}
        onAdd={vi.fn()}
        onUpdate={vi.fn()}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole('button', {
        name: 'Редактировать подзадачу Написать тесты',
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('button', {
        name: 'Удалить подзадачу Написать тесты',
      }),
    ).not.toBeInTheDocument();
  });

  it('скрывает создание подзадачи без права редактирования', () => {
    render(
      <SubtaskList
        subtasks={subtasks}
        canEdit={false}
        onAdd={vi.fn()}
        onUpdate={vi.fn()}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole('heading', {
        name: 'Новая подзадача',
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('button', {
        name: 'Добавить подзадачу',
      }),
    ).not.toBeInTheDocument();
  });
});
