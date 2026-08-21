import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { UndoSnackbar } from './UndoSnackbar';

describe('Уведомление об отмене удаления', () => {
  it('показывает название удалённой задачи', () => {
    render(<UndoSnackbar taskTitle="Подготовить отчёт" onUndo={vi.fn()} onDismiss={vi.fn()} />);

    expect(screen.getByText('Задача «Подготовить отчёт» удалена')).toBeInTheDocument();
  });

  it('вызывает восстановление задачи', async () => {
    const user = userEvent.setup();

    const onUndo = vi.fn();

    render(<UndoSnackbar taskTitle="Задача" onUndo={onUndo} onDismiss={vi.fn()} />);

    await user.click(
      screen.getByRole('button', {
        name: 'Отменить',
      }),
    );

    expect(onUndo).toHaveBeenCalledTimes(1);
  });

  it('закрывает уведомление', async () => {
    const user = userEvent.setup();

    const onDismiss = vi.fn();

    render(<UndoSnackbar taskTitle="Задача" onUndo={vi.fn()} onDismiss={onDismiss} />);

    await user.click(
      screen.getByRole('button', {
        name: 'Закрыть уведомление',
      }),
    );

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
