import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import { createDemoAppState } from '../../../entities/board/model/demo-board';

import { DataTransfer } from './DataTransfer';
import { createExportData } from '../model/export-format';

describe('Импорт и экспорт данных', () => {
  it('вызывает экспорт данных', async () => {
    const user = userEvent.setup();

    const onExport = vi.fn();

    render(<DataTransfer onExport={onExport} onImport={vi.fn()} />);

    await user.click(
      screen.getByRole('button', {
        name: 'Экспорт JSON',
      }),
    );

    expect(onExport).toHaveBeenCalledTimes(1);
  });

  it('показывает ошибку для некорректного файла', async () => {
    const user = userEvent.setup();

    render(<DataTransfer onExport={vi.fn()} onImport={vi.fn()} />);

    const file = new File(['broken'], 'broken.json', {
      type: 'application/json',
    });

    await user.upload(screen.getByLabelText('Выбрать JSON-файл для импорта'), file);

    expect(await screen.findByRole('alert')).toHaveTextContent('Файл содержит некорректный JSON.');
  });

  it('импортирует корректный файл после подтверждения', async () => {
    const user = userEvent.setup();

    const onImport = vi.fn();

    vi.spyOn(window, 'confirm').mockReturnValue(true);

    const state = createDemoAppState();

    const file = new File([JSON.stringify(createExportData(state))], 'kanban.json', {
      type: 'application/json',
    });

    render(<DataTransfer onExport={vi.fn()} onImport={onImport} />);

    await user.upload(screen.getByLabelText('Выбрать JSON-файл для импорта'), file);

    expect(onImport).toHaveBeenCalledWith(state);

    expect(await screen.findByRole('status')).toHaveTextContent('Данные успешно импортированы.');
  });

  it('не импортирует данные при отмене подтверждения', async () => {
    const user = userEvent.setup();

    const onImport = vi.fn();

    vi.spyOn(window, 'confirm').mockReturnValue(false);

    const file = new File([JSON.stringify(createExportData(createDemoAppState()))], 'kanban.json', {
      type: 'application/json',
    });

    render(<DataTransfer onExport={vi.fn()} onImport={onImport} />);

    await user.upload(screen.getByLabelText('Выбрать JSON-файл для импорта'), file);

    expect(onImport).not.toHaveBeenCalled();
  });
});
