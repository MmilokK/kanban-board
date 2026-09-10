import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError } from '../../../shared/api/api-error';
import { CloudBoard } from './CloudBoard';

const { useCloudBoardMock, useBoardRealtimeMock, refetchMock, mutateMock, mapCloudBoardMock } =
  vi.hoisted(() => ({
    useCloudBoardMock: vi.fn(),
    useBoardRealtimeMock: vi.fn(),
    refetchMock: vi.fn(),
    mutateMock: vi.fn(),
    mapCloudBoardMock: vi.fn(),
  }));

vi.mock('../../../entities/board/api/use-cloud-board', () => ({
  useCloudBoard: useCloudBoardMock,
}));

vi.mock('../../../entities/board/api/use-board-realtime', () => ({
  useBoardRealtime: useBoardRealtimeMock,
}));

vi.mock('../../../entities/board/api/use-cloud-board-mutation', () => ({
  useCloudBoardMutation: () => ({
    mutate: mutateMock,
  }),
}));

vi.mock('../../../entities/board/api/map-cloud-board', () => ({
  mapCloudBoard: mapCloudBoardMock,
}));

vi.mock('./BoardView', () => ({
  BoardView: ({
    board,
    canEdit,
  }: {
    board: {
      id: string;
      title: string;
    };
    canEdit: boolean;
  }) => (
    <div data-testid="board-view">
      <span>{board.title}</span>
      <span>{canEdit ? 'Редактирование доступно' : 'Только просмотр'}</span>
    </div>
  ),
}));

const mappedBoard = {
  board: {
    id: 'board-1',
    title: 'Cloud-доска',
    columnIds: [],
    createdAt: '2026-09-01T10:00:00.000Z',
    updatedAt: '2026-09-01T10:00:00.000Z',
  },
  columns: {},
  tasks: {},
};

function createBoardQuery({
  role = 'OWNER',
  isPending = false,
  isError = false,
  withData = true,
  error = null,
}: {
  role?: 'OWNER' | 'EDITOR' | 'VIEWER';
  isPending?: boolean;
  isError?: boolean;
  withData?: boolean;
  error?: Error | null;
} = {}) {
  return {
    data: withData
      ? {
          board: {
            id: 'board-1',
            title: 'Cloud-доска',
            role,
          },
        }
      : undefined,
    isPending,
    isError,
    error,
    refetch: refetchMock,
  };
}

describe('Cloud-доска', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mapCloudBoardMock.mockReturnValue(mappedBoard);

    useCloudBoardMock.mockReturnValue(createBoardQuery());
  });

  it('подключает realtime для текущей доски', () => {
    render(<CloudBoard boardId="board-1" isArchiveOpen={false} onCloseArchive={vi.fn()} />);

    expect(useBoardRealtimeMock).toHaveBeenCalledWith('board-1');
  });

  it('показывает загрузку, пока данные доски ещё не получены', () => {
    useCloudBoardMock.mockReturnValue(
      createBoardQuery({
        isPending: true,
        withData: false,
      }),
    );

    render(<CloudBoard boardId="board-1" isArchiveOpen={false} onCloseArchive={vi.fn()} />);

    expect(screen.getByRole('status')).toHaveTextContent('Загрузка доски…');

    expect(screen.queryByTestId('board-view')).not.toBeInTheDocument();
  });

  it('показывает ошибку загрузки, если данных доски нет', () => {
    useCloudBoardMock.mockReturnValue(
      createBoardQuery({
        isError: true,
        withData: false,
        error: new Error('Network error'),
      }),
    );

    render(<CloudBoard boardId="board-1" isArchiveOpen={false} onCloseArchive={vi.fn()} />);

    expect(screen.getByRole('alert')).toHaveTextContent('Не удалось загрузить доску.');

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Проверь подключение к сети и доступность сервера.',
    );

    expect(screen.queryByTestId('board-view')).not.toBeInTheDocument();
  });

  it('показывает отсутствие доски при BOARD_NOT_FOUND', () => {
    useCloudBoardMock.mockReturnValue(
      createBoardQuery({
        isError: true,
        withData: false,
        error: new ApiError('Доска не найдена', {
          status: 404,
          code: 'BOARD_NOT_FOUND',
        }),
      }),
    );

    render(<CloudBoard boardId="board-1" isArchiveOpen={false} onCloseArchive={vi.fn()} />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Доска не найдена или доступ к ней был удалён.',
    );

    expect(
      screen.queryByRole('button', {
        name: 'Попробовать снова',
      }),
    ).not.toBeInTheDocument();

    expect(screen.queryByTestId('board-view')).not.toBeInTheDocument();
  });

  it('повторяет загрузку после ошибки', async () => {
    const user = userEvent.setup();

    useCloudBoardMock.mockReturnValue(
      createBoardQuery({
        isError: true,
        withData: false,
        error: new Error('Network error'),
      }),
    );

    render(<CloudBoard boardId="board-1" isArchiveOpen={false} onCloseArchive={vi.fn()} />);

    await user.click(
      screen.getByRole('button', {
        name: 'Попробовать снова',
      }),
    );

    expect(refetchMock).toHaveBeenCalledTimes(1);
  });

  it('оставляет последние загруженные данные видимыми при ошибке обновления', () => {
    useCloudBoardMock.mockReturnValue(
      createBoardQuery({
        isError: true,
        error: new Error('Network error'),
      }),
    );

    render(<CloudBoard boardId="board-1" isArchiveOpen={false} onCloseArchive={vi.fn()} />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Не удалось обновить доску. Показаны последние загруженные данные.',
    );

    expect(screen.getByTestId('board-view')).toBeInTheDocument();

    expect(screen.getByText('Cloud-доска')).toBeInTheDocument();
  });

  it('повторяет обновление при ошибке фонового запроса', async () => {
    const user = userEvent.setup();

    useCloudBoardMock.mockReturnValue(
      createBoardQuery({
        isError: true,
        error: new Error('Network error'),
      }),
    );

    render(<CloudBoard boardId="board-1" isArchiveOpen={false} onCloseArchive={vi.fn()} />);

    await user.click(
      screen.getByRole('button', {
        name: 'Попробовать снова',
      }),
    );

    expect(refetchMock).toHaveBeenCalledTimes(1);

    expect(screen.getByTestId('board-view')).toBeInTheDocument();
  });

  it('разрешает редактирование владельцу доски', () => {
    useCloudBoardMock.mockReturnValue(
      createBoardQuery({
        role: 'OWNER',
      }),
    );

    render(<CloudBoard boardId="board-1" isArchiveOpen={false} onCloseArchive={vi.fn()} />);

    expect(screen.getByText('Редактирование доступно')).toBeInTheDocument();
  });

  it('разрешает редактирование редактору доски', () => {
    useCloudBoardMock.mockReturnValue(
      createBoardQuery({
        role: 'EDITOR',
      }),
    );

    render(<CloudBoard boardId="board-1" isArchiveOpen={false} onCloseArchive={vi.fn()} />);

    expect(screen.getByText('Редактирование доступно')).toBeInTheDocument();
  });

  it('переводит доску в режим просмотра для наблюдателя', () => {
    useCloudBoardMock.mockReturnValue(
      createBoardQuery({
        role: 'VIEWER',
      }),
    );

    render(<CloudBoard boardId="board-1" isArchiveOpen={false} onCloseArchive={vi.fn()} />);

    expect(screen.getByText('Только просмотр')).toBeInTheDocument();
  });
});
