import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { TaskHistoryEvent } from '../../../entities/task/model/task-history';
import { TaskHistory } from './TaskHistory';

const events: TaskHistoryEvent[] = [
  {
    id: 'history-1',

    type: 'task-created',

    createdAt: '2026-08-13T10:00:00.000Z',
  },

  {
    id: 'history-2',

    type: 'subtask-added',

    subtaskId: 'subtask-1',

    title: 'Написать тесты',

    createdAt: '2026-08-13T11:00:00.000Z',
  },
];

describe('История изменений задачи', () => {
  it('показывает пустое состояние', () => {
    render(<TaskHistory events={[]} />);

    expect(screen.getByText('История изменений пока пуста.')).toBeInTheDocument();
  });

  it('показывает события истории', () => {
    render(<TaskHistory events={events} />);

    expect(screen.getByText('Задача создана')).toBeInTheDocument();

    expect(screen.getByText('Добавлена подзадача «Написать тесты»')).toBeInTheDocument();
  });

  it('показывает количество событий', () => {
    render(<TaskHistory events={events} />);

    expect(
      screen.getByText('2', {
        exact: true,
      }),
    ).toBeInTheDocument();
  });

  it('показывает новые события раньше старых', () => {
    render(<TaskHistory events={events} />);

    const items = screen.getAllByRole('listitem');

    expect(items[1]).toHaveTextContent('Добавлена подзадача');

    expect(items[0]).toHaveTextContent('Задача создана');
  });
});
