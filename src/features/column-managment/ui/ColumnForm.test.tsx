import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { COLUMN_TITLE_MAX_LENGTH } from '../../../entities/column/model/column-constants';
import type { ColumnFormValues } from '../model/column-form';

import { ColumnForm } from './ColumnForm';

type RenderColumnFormOptions = {
  defaultValues?: ColumnFormValues;
  submitLabel?: string;
};

function renderColumnForm({
  defaultValues = {
    title: '',
  },
  submitLabel = 'Создать',
}: RenderColumnFormOptions = {}) {
  const onSubmit = vi.fn();
  const onCancel = vi.fn();

  render(
    <ColumnForm
      defaultValues={defaultValues}
      submitLabel={submitLabel}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />,
  );

  return {
    onSubmit,
    onCancel,
  };
}

describe('Форма колонки', () => {
  it('показывает переданное начальное название', () => {
    renderColumnForm({
      defaultValues: {
        title: 'Проверка',
      },
      submitLabel: 'Сохранить',
    });

    expect(
      screen.getByRole('textbox', {
        name: 'Название',
      }),
    ).toHaveValue('Проверка');

    expect(
      screen.getByRole('button', {
        name: 'Сохранить',
      }),
    ).toBeInTheDocument();
  });

  it('показывает ошибку для пустого названия', async () => {
    const user = userEvent.setup();

    const { onSubmit } = renderColumnForm();

    await user.click(
      screen.getByRole('button', {
        name: 'Создать',
      }),
    );

    expect(await screen.findByRole('alert')).toHaveTextContent('Введите название колонки');

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('не принимает название, состоящее только из пробелов', async () => {
    const user = userEvent.setup();

    const { onSubmit } = renderColumnForm();

    const titleInput = screen.getByRole('textbox', {
      name: 'Название',
    });

    await user.type(titleInput, '   ');

    await user.click(
      screen.getByRole('button', {
        name: 'Создать',
      }),
    );

    expect(await screen.findByRole('alert')).toHaveTextContent('Введите название колонки');

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('не принимает слишком длинное название', async () => {
    const user = userEvent.setup();

    const { onSubmit } = renderColumnForm();

    const longTitle = 'А'.repeat(COLUMN_TITLE_MAX_LENGTH + 1);

    await user.type(
      screen.getByRole('textbox', {
        name: 'Название',
      }),
      longTitle,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Создать',
      }),
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(
      `Название не должно быть длиннее ${COLUMN_TITLE_MAX_LENGTH} символов`,
    );

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('принимает название максимальной длины', async () => {
    const user = userEvent.setup();

    const { onSubmit } = renderColumnForm();

    const title = 'А'.repeat(COLUMN_TITLE_MAX_LENGTH);

    await user.type(
      screen.getByRole('textbox', {
        name: 'Название',
      }),
      title,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Создать',
      }),
    );

    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(onSubmit.mock.calls[0]?.[0]).toEqual({
      title,
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('передаёт очищенное название', async () => {
    const user = userEvent.setup();

    const { onSubmit } = renderColumnForm();

    await user.type(
      screen.getByRole('textbox', {
        name: 'Название',
      }),
      '   Проверка   ',
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Создать',
      }),
    );

    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(onSubmit.mock.calls[0]?.[0]).toEqual({
      title: 'Проверка',
    });
  });

  it('передаёт изменённое название при редактировании', async () => {
    const user = userEvent.setup();

    const { onSubmit } = renderColumnForm({
      defaultValues: {
        title: 'Старое название',
      },
      submitLabel: 'Сохранить',
    });

    const titleInput = screen.getByRole('textbox', {
      name: 'Название',
    });

    await user.clear(titleInput);

    await user.type(titleInput, 'Новое название');

    await user.click(
      screen.getByRole('button', {
        name: 'Сохранить',
      }),
    );

    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(onSubmit.mock.calls[0]?.[0]).toEqual({
      title: 'Новое название',
    });
  });

  it('вызывает отмену', async () => {
    const user = userEvent.setup();

    const { onCancel, onSubmit } = renderColumnForm();

    await user.click(
      screen.getByRole('button', {
        name: 'Отмена',
      }),
    );

    expect(onCancel).toHaveBeenCalledTimes(1);

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('связывает сообщение об ошибке с полем названия', async () => {
    const user = userEvent.setup();

    renderColumnForm();

    const titleInput = screen.getByRole('textbox', {
      name: 'Название',
    });

    await user.click(
      screen.getByRole('button', {
        name: 'Создать',
      }),
    );

    const error = await screen.findByRole('alert');

    expect(titleInput).toHaveAttribute('aria-invalid', 'true');

    expect(titleInput).toHaveAttribute('aria-describedby', error.id);
  });

  it('не показывает ошибку до отправки формы', () => {
    renderColumnForm();

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    expect(
      screen.getByRole('textbox', {
        name: 'Название',
      }),
    ).toHaveAttribute('aria-invalid', 'false');
  });
});
