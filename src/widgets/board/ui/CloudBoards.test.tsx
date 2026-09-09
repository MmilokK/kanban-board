import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CloudBoards } from './CloudBoards';

const { useCloudBoardsMock, useCloudBoardMock, refetchBoardsMock } = vi.hoisted(() => ({
  useCloudBoardsMock: vi.fn(),
  useCloudBoardMock: vi.fn(),
  refetchBoardsMock: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({
    setQueryData: vi.fn(),
    invalidateQueries: vi.fn(),
    removeQueries: vi.fn(),
  }),
  useMutation: () => ({
    mutate: vi.fn(),
  }),
}));

vi.mock('../../../entities/board/api/use-cloud-boards', () => ({
  useCloudBoards: useCloudBoardsMock,
}));

vi.mock('../../../entities/board/api/use-cloud-board', () => ({
  useCloudBoard: useCloudBoardMock,
}));

vi.mock('../../../features/board-management/ui/BoardDialog', () => ({
  BoardDialog: () => <div data-testid="board-dialog" />,
}));

vi.mock('../../../features/board-management/ui/CloudBoardToolbar', () => ({
  CloudBoardToolbar: ({
    boards,
    activeBoardId,
    canEdit,
    canDelete,
    canManageInvitations,
    onSelectBoard,
  }: {
    boards: Array<{
      id: string;
      title: string;
    }>;
    activeBoardId: string | null;
    canEdit: boolean;
    canDelete: boolean;
    canManageInvitations: boolean;
    onSelectBoard: (boardId: string) => void;
  }) => (
    <div data-testid="cloud-board-toolbar">
      <span data-testid="active-board-id">{activeBoardId ?? 'нет активной доски'}</span>

      <span data-testid="can-edit">{canEdit ? 'можно редактировать' : 'нельзя редактировать'}</span>

      <span data-testid="can-delete">{canDelete ? 'можно удалить' : 'нельзя удалить'}</span>

      <span data-testid="can-manage-invitations">
        {canManageInvitations ? 'можно управлять приглашениями' : 'нельзя управлять приглашениями'}
      </span>

      {boards.map((board) => (
        <button
          key={board.id}
          type="button"
          onClick={() => {
            onSelectBoard(board.id);
          }}
        >
          {board.title}
        </button>
      ))}
    </div>
  ),
}));

vi.mock('../../../features/board-members/ui/BoardMembersButton', () => ({
  BoardMembersButton: ({ boardId }: { boardId: string }) => (
    <div data-testid="board-members">Участники {boardId}</div>
  ),
}));

vi.mock('../../../features/board-invitations/ui/BoardInvitationsDialog', () => ({
  BoardInvitationsDialog: ({ boardId }: { boardId: string }) => (
    <div data-testid="board-invitations">Приглашения {boardId}</div>
  ),
}));

vi.mock('./CloudBoard', () => ({
  CloudBoard: ({ boardId }: { boardId: string }) => (
    <div data-testid="cloud-board">CloudBoard {boardId}</div>
  ),
}));

const boards = [
  {
    id: 'board-1',
    title: 'Первая доска',
    role: 'OWNER' as const,
  },
  {
    id: 'board-2',
    title: 'Вторая доска',
    role: 'VIEWER' as const,
  },
];

function createBoardsQuery({
  data,
  isPending = false,
  isError = false,
  withData = true,
}: {
  data?: typeof boards;
  isPending?: boolean;
  isError?: boolean;
  withData?: boolean;
} = {}) {
  return {
    data: withData ? (data ?? boards) : undefined,
    isPending,
    isError,
    refetch: refetchBoardsMock,
  };
}

function createBoardQuery(boardId: string, role: 'OWNER' | 'EDITOR' | 'VIEWER' = 'OWNER') {
  return {
    data: boardId
      ? {
          board: {
            id: boardId,
            title: boardId === 'board-2' ? 'Вторая доска' : 'Первая доска',
            role,
            columns: [],
            tasks: [],
          },
        }
      : undefined,
    isPending: false,
    isError: false,
    refetch: vi.fn(),
  };
}

describe('Список облачных досок', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useCloudBoardsMock.mockReturnValue(createBoardsQuery());

    useCloudBoardMock.mockImplementation((boardId: string) => {
      if (boardId === 'board-2') {
        return createBoardQuery('board-2', 'VIEWER');
      }

      if (boardId === 'board-1') {
        return createBoardQuery('board-1', 'OWNER');
      }

      return createBoardQuery('');
    });
  });

  it('показывает загрузку до получения списка досок', () => {
    useCloudBoardsMock.mockReturnValue(
      createBoardsQuery({
        withData: false,
        isPending: true,
      }),
    );

    render(<CloudBoards />);

    expect(screen.getByRole('status')).toHaveTextContent('Загрузка облачных досок…');

    expect(screen.queryByTestId('cloud-board')).not.toBeInTheDocument();
  });

  it('показывает ошибку, если список досок не был загружен', () => {
    useCloudBoardsMock.mockReturnValue(
      createBoardsQuery({
        withData: false,
        isError: true,
      }),
    );

    render(<CloudBoards />);

    expect(screen.getByRole('alert')).toHaveTextContent('Не удалось загрузить облачные доски.');

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Проверь подключение к сети и доступность сервера.',
    );

    expect(screen.queryByTestId('cloud-board')).not.toBeInTheDocument();
  });

  it('повторяет загрузку списка досок после ошибки', async () => {
    const user = userEvent.setup();

    useCloudBoardsMock.mockReturnValue(
      createBoardsQuery({
        withData: false,
        isError: true,
      }),
    );

    render(<CloudBoards />);

    await user.click(
      screen.getByRole('button', {
        name: 'Попробовать снова',
      }),
    );

    expect(refetchBoardsMock).toHaveBeenCalledTimes(1);
  });

  it('оставляет сохранённый список досок видимым при ошибке обновления', () => {
    useCloudBoardsMock.mockReturnValue(
      createBoardsQuery({
        isError: true,
      }),
    );

    render(<CloudBoards />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Не удалось обновить список облачных досок. Показаны последние загруженные данные.',
    );

    expect(screen.getByTestId('cloud-board-toolbar')).toBeInTheDocument();

    expect(screen.getByTestId('cloud-board')).toHaveTextContent('CloudBoard board-1');
  });

  it('повторяет фоновое обновление списка досок', async () => {
    const user = userEvent.setup();

    useCloudBoardsMock.mockReturnValue(
      createBoardsQuery({
        isError: true,
      }),
    );

    render(<CloudBoards />);

    await user.click(
      screen.getByRole('button', {
        name: 'Попробовать снова',
      }),
    );

    expect(refetchBoardsMock).toHaveBeenCalledTimes(1);

    expect(screen.getByTestId('cloud-board')).toBeInTheDocument();
  });

  it('выбирает первую доску, если активная доска не задана', () => {
    render(<CloudBoards />);

    expect(screen.getByTestId('active-board-id')).toHaveTextContent('board-1');

    expect(screen.getByTestId('cloud-board')).toHaveTextContent('CloudBoard board-1');

    expect(useCloudBoardMock).toHaveBeenCalledWith('board-1');
  });

  it('использует начальную доску, если она присутствует в списке', () => {
    render(<CloudBoards initialBoardId="board-2" />);

    expect(screen.getByTestId('active-board-id')).toHaveTextContent('board-2');

    expect(screen.getByTestId('cloud-board')).toHaveTextContent('CloudBoard board-2');

    expect(useCloudBoardMock).toHaveBeenCalledWith('board-2');
  });

  it('выбирает первую доступную доску, если начальной доски больше нет', () => {
    render(<CloudBoards initialBoardId="deleted-board" />);

    expect(screen.getByTestId('active-board-id')).toHaveTextContent('board-1');

    expect(screen.getByTestId('cloud-board')).toHaveTextContent('CloudBoard board-1');

    expect(useCloudBoardMock).toHaveBeenCalledWith('board-1');
  });

  it('переключает активную доску', async () => {
    const user = userEvent.setup();

    render(<CloudBoards />);

    await user.click(
      screen.getByRole('button', {
        name: 'Вторая доска',
      }),
    );

    expect(screen.getByTestId('active-board-id')).toHaveTextContent('board-2');

    expect(screen.getByTestId('cloud-board')).toHaveTextContent('CloudBoard board-2');
  });

  it('разрешает владельцу редактирование, удаление и управление приглашениями', () => {
    render(<CloudBoards initialBoardId="board-1" />);

    expect(screen.getByTestId('can-edit')).toHaveTextContent('можно редактировать');

    expect(screen.getByTestId('can-delete')).toHaveTextContent('можно удалить');

    expect(screen.getByTestId('can-manage-invitations')).toHaveTextContent(
      'можно управлять приглашениями',
    );

    expect(screen.getByTestId('board-invitations')).toHaveTextContent('Приглашения board-1');
  });

  it('ограничивает права наблюдателя', () => {
    render(<CloudBoards initialBoardId="board-2" />);

    expect(screen.getByTestId('can-edit')).toHaveTextContent('нельзя редактировать');

    expect(screen.getByTestId('can-delete')).toHaveTextContent('нельзя удалить');

    expect(screen.getByTestId('can-manage-invitations')).toHaveTextContent(
      'нельзя управлять приглашениями',
    );

    expect(screen.queryByTestId('board-invitations')).not.toBeInTheDocument();

    expect(screen.getByTestId('board-members')).toHaveTextContent('Участники board-2');
  });

  it('показывает пустое состояние, если облачных досок нет', () => {
    useCloudBoardsMock.mockReturnValue(
      createBoardsQuery({
        data: [],
      }),
    );

    render(<CloudBoards />);

    expect(
      screen.getByRole('heading', {
        name: 'Пока нет облачных досок',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Создать облачную доску',
      }),
    ).toBeInTheDocument();
  });
});
