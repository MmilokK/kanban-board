import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { BOARD_TITLE_MAX_LENGTH, type BoardFormValues } from '../model/board-form';

import { BoardForm } from './BoardForm';

type RenderBoardFormOptions = {
  defaultValues?: BoardFormValues;
  submitLabel?: string;
};

function renderBoardForm({
  defaultValues = {
    title: '',
  },
  submitLabel = 'Создать',
}: RenderBoardFormOptions = {}) {
  const onSubmit = vi.fn();
  const onCancel = vi.fn();

  render(
    <BoardForm
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

describe('Форма доски', () => {
  it('показывает переданное начальное название', () => {
    renderBoardForm({
      defaultValues: {
        title: 'Рабочая доска',
      },
      submitLabel: 'Сохранить',
    });

    expect(
      screen.getByRole('textbox', {
        name: 'Название',
      }),
    ).toHaveValue('Рабочая доска');

    expect(
      screen.getByRole('button', {
        name: 'Сохранить',
      }),
    ).toBeInTheDocument();
  });

  it('показывает ошибку для пустого названия', async () => {
    const user = userEvent.setup();

    const { onSubmit } = renderBoardForm();

    await user.click(
      screen.getByRole('button', {
        name: 'Создать',
      }),
    );

    expect(await screen.findByRole('alert')).toHaveTextContent('Введите название доски');

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('не принимает название, состоящее только из пробелов', async () => {
    const user = userEvent.setup();

    const { onSubmit } = renderBoardForm();

    const titleInput = screen.getByRole('textbox', {
      name: 'Название',
    });

    await user.type(titleInput, '   ');

    await user.click(
      screen.getByRole('button', {
        name: 'Создать',
      }),
    );

    expect(await screen.findByRole('alert')).toHaveTextContent('Введите название доски');

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('не принимает слишком длинное название', async () => {
    const user = userEvent.setup();

    const { onSubmit } = renderBoardForm();

    const longTitle = 'А'.repeat(BOARD_TITLE_MAX_LENGTH + 1);

    const titleInput = screen.getByRole('textbox', {
      name: 'Название',
    });

    await user.type(titleInput, longTitle);

    await user.click(
      screen.getByRole('button', {
        name: 'Создать',
      }),
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(
      `Название не должно быть длиннее ${BOARD_TITLE_MAX_LENGTH} символов`,
    );

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('принимает название максимальной длины', async () => {
    const user = userEvent.setup();

    const { onSubmit } = renderBoardForm();

    const title = 'А'.repeat(BOARD_TITLE_MAX_LENGTH);

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

    expect(onSubmit).toHaveBeenCalledWith(
      {
        title,
      },
      expect.anything(),
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('передаёт очищенное название', async () => {
    const user = userEvent.setup();

    const { onSubmit } = renderBoardForm();

    const titleInput = screen.getByRole('textbox', {
      name: 'Название',
    });

    await user.type(titleInput, '   Рабочая доска   ');

    await user.click(
      screen.getByRole('button', {
        name: 'Создать',
      }),
    );

    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(onSubmit).toHaveBeenCalledWith(
      {
        title: 'Рабочая доска',
      },
      expect.anything(),
    );
  });

  it('передаёт изменённое название при редактировании', async () => {
    const user = userEvent.setup();

    const { onSubmit } = renderBoardForm({
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

    expect(onSubmit).toHaveBeenCalledWith(
      {
        title: 'Новое название',
      },
      expect.anything(),
    );
  });

  it('вызывает отмену', async () => {
    const user = userEvent.setup();

    const { onCancel, onSubmit } = renderBoardForm();

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

    renderBoardForm();

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
});
