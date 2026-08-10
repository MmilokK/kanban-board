import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { DeletedTaskSnapshot } from '../../../entities/task/model/deleted-task-snapshot';

import { useTaskDeleteUndo } from './use-task-delete-undo';
import { act } from 'react';

const snapshot: DeletedTaskSnapshot = {
  task: {
    id: 'task-1',
    title: 'Задача',
    description: '',
    priority: 'medium',
    tags: [],
    dueDate: null,
    createdAt: '2026-08-08T10:00:00.000Z',
    updatedAt: '2026-08-08T10:00:00.000Z',
    archivedAt: null,
  },

  columnId: 'column-1',

  index: 2,
};

function TestComponent({ onRestore }: { onRestore: (value: DeletedTaskSnapshot) => void }) {
  const { deletedTask, registerDeletion, undo } = useTaskDeleteUndo({
    onRestore,
  });

  return (
    <>
      <button
        onClick={() => {
          registerDeletion(snapshot);
        }}
      >
        Удалить
      </button>

      <button onClick={undo}>Отменить</button>

      {deletedTask && <span>{deletedTask.task.title}</span>}
    </>
  );
}

describe('Undo удаления задачи', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      shouldAdvanceTime: true,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('сохраняет последнее удаление', async () => {
    const user = userEvent.setup({
      advanceTimers: vi.advanceTimersByTime,
    });

    render(<TestComponent onRestore={vi.fn()} />);

    await user.click(
      screen.getByRole('button', {
        name: 'Удалить',
      }),
    );

    expect(screen.getByText('Задача')).toBeInTheDocument();
  });

  it('восстанавливает задачу', async () => {
    const onRestore = vi.fn();

    const user = userEvent.setup({
      advanceTimers: vi.advanceTimersByTime,
    });

    render(<TestComponent onRestore={onRestore} />);

    await user.click(
      screen.getByRole('button', {
        name: 'Удалить',
      }),
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Отменить',
      }),
    );

    expect(onRestore).toHaveBeenCalledWith(snapshot);
  });

  it('скрывает возможность отмены после таймаута', async () => {
    const user = userEvent.setup({
      advanceTimers: vi.advanceTimersByTime,
    });

    render(<TestComponent onRestore={vi.fn()} />);

    await user.click(
      screen.getByRole('button', {
        name: 'Удалить',
      }),
    );

    expect(screen.getByText('Задача')).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000);
    });

    expect(screen.queryByText('Задача')).not.toBeInTheDocument();
  });
});
