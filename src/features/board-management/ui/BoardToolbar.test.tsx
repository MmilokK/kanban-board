import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Board } from '../../../entities/board/model/types';
import type { BoardId } from '../../../shared/model/entity-ids';
import { BoardToolbar } from './BoardToolbar';

const FIRST_BOARD_ID: BoardId = 'board-1';
const SECOND_BOARD_ID: BoardId = 'board-2';

const boards: Board[] = [
  {
    id: FIRST_BOARD_ID,
    title: 'Рабочая доска',
    columnIds: ['board-1-backlog', 'board-1-todo', 'board-1-in-progress', 'board-1-done'],
    createdAt: '2026-08-03T10:00:00.000Z',
    updatedAt: '2026-08-03T10:00:00.000Z',
  },
  {
    id: SECOND_BOARD_ID,
    title: 'Личные задачи',
    columnIds: ['board-2-backlog', 'board-2-todo', 'board-2-in-progress', 'board-2-done'],
    createdAt: '2026-08-03T11:00:00.000Z',
    updatedAt: '2026-08-03T11:00:00.000Z',
  },
];

type RenderBoardToolbarOptions = {
  boardItems?: Board[];
  activeBoardId?: BoardId | null;
};

function renderBoardToolbar({
  boardItems = boards,
  activeBoardId = FIRST_BOARD_ID,
}: RenderBoardToolbarOptions = {}) {
  const onSelectBoard = vi.fn();
  const onCreateBoard = vi.fn();
  const onRenameBoard = vi.fn();
  const onDeleteBoard = vi.fn();
  const openArchive = vi.fn();

  render(
    <BoardToolbar
      boards={boardItems}
      activeBoardId={activeBoardId}
      onSelectBoard={onSelectBoard}
      onCreateBoard={onCreateBoard}
      onRenameBoard={onRenameBoard}
      onDeleteBoard={onDeleteBoard}
      openArchive={openArchive}
      archivedTasks={[]}
    />,
  );

  return {
    onSelectBoard,
    onCreateBoard,
    onRenameBoard,
    onDeleteBoard,
  };
}

describe('Панель управления досками', () => {
  it('показывает доски в переданном порядке', () => {
    renderBoardToolbar();

    const select = screen.getByRole('combobox', {
      name: 'Доска',
    });

    const options = screen.getAllByRole('option');

    expect(select).toHaveValue(FIRST_BOARD_ID);

    expect(options).toHaveLength(2);

    expect(options[0]).toHaveValue(FIRST_BOARD_ID);
    expect(options[0]).toHaveTextContent('Рабочая доска');

    expect(options[1]).toHaveValue(SECOND_BOARD_ID);
    expect(options[1]).toHaveTextContent('Личные задачи');
  });

  it('вызывает переключение при выборе другой доски', async () => {
    const user = userEvent.setup();

    const { onSelectBoard } = renderBoardToolbar();

    const select = screen.getByRole('combobox', {
      name: 'Доска',
    });

    await user.selectOptions(select, SECOND_BOARD_ID);

    expect(onSelectBoard).toHaveBeenCalledTimes(1);
    expect(onSelectBoard).toHaveBeenCalledWith(SECOND_BOARD_ID);
  });

  it('вызывает создание новой доски', async () => {
    const user = userEvent.setup();

    const { onCreateBoard } = renderBoardToolbar();

    await user.click(
      screen.getByRole('button', {
        name: 'Новая доска',
      }),
    );

    expect(onCreateBoard).toHaveBeenCalledTimes(1);
  });

  it('вызывает переименование активной доски', async () => {
    const user = userEvent.setup();

    const { onRenameBoard } = renderBoardToolbar();

    await user.click(
      screen.getByRole('button', {
        name: 'Переименовать',
      }),
    );

    expect(onRenameBoard).toHaveBeenCalledTimes(1);
  });

  it('вызывает удаление активной доски', async () => {
    const user = userEvent.setup();

    const { onDeleteBoard } = renderBoardToolbar();

    await user.click(
      screen.getByRole('button', {
        name: 'Удалить',
      }),
    );

    expect(onDeleteBoard).toHaveBeenCalledTimes(1);
  });

  it('отключает выбор доски при отсутствии досок', () => {
    renderBoardToolbar({
      boardItems: [],
      activeBoardId: null,
    });

    expect(
      screen.getByRole('combobox', {
        name: 'Доска',
      }),
    ).toBeDisabled();
  });

  it('показывает сообщение при отсутствии досок', () => {
    renderBoardToolbar({
      boardItems: [],
      activeBoardId: null,
    });

    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(1);
    expect(options[0]).toHaveValue('');
    expect(options[0]).toHaveTextContent('Нет досок');
  });

  it('оставляет кнопку создания доступной без активной доски', () => {
    renderBoardToolbar({
      boardItems: [],
      activeBoardId: null,
    });

    expect(
      screen.getByRole('button', {
        name: 'Новая доска',
      }),
    ).toBeEnabled();
  });

  it('отключает переименование и удаление без активной доски', () => {
    renderBoardToolbar({
      boardItems: [],
      activeBoardId: null,
    });

    expect(
      screen.getByRole('button', {
        name: 'Переименовать',
      }),
    ).toBeDisabled();

    expect(
      screen.getByRole('button', {
        name: 'Удалить',
      }),
    ).toBeDisabled();
  });

  it('не вызывает отключённые действия без активной доски', async () => {
    const user = userEvent.setup();

    const { onRenameBoard, onDeleteBoard } = renderBoardToolbar({
      boardItems: [],
      activeBoardId: null,
    });

    await user.click(
      screen.getByRole('button', {
        name: 'Переименовать',
      }),
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Удалить',
      }),
    );

    expect(onRenameBoard).not.toHaveBeenCalled();
    expect(onDeleteBoard).not.toHaveBeenCalled();
  });

  it('показывает переданную активную доску', () => {
    renderBoardToolbar({
      activeBoardId: SECOND_BOARD_ID,
    });

    expect(
      screen.getByRole('combobox', {
        name: 'Доска',
      }),
    ).toHaveValue(SECOND_BOARD_ID);
  });
});

it('имеет доступное имя панели управления', () => {
  renderBoardToolbar();

  expect(
    screen.getByRole('toolbar', {
      name: 'Управление досками',
    }),
  ).toBeInTheDocument();
});
