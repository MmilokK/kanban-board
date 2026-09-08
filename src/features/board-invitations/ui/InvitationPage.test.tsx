import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { InvitationPage } from './InvitationPage';

const useCurrentUserMock = vi.fn();
const usePublicBoardInvitationQueryMock = vi.fn();
const useAcceptBoardInvitationMutationMock = vi.fn();

vi.mock('../../../entities/user/api/use-current-user', () => ({
  useCurrentUser: () => useCurrentUserMock(),
}));

vi.mock('../api/board-invitations.queries', () => ({
  usePublicBoardInvitationQuery: (token: string) => usePublicBoardInvitationQueryMock(token),

  useAcceptBoardInvitationMutation: (token: string) => useAcceptBoardInvitationMutationMock(token),
}));

vi.mock('../../auth/ui/AuthDialog', () => ({
  AuthDialog: ({ onClose }: { onClose: () => void }) => (
    <div role="dialog" aria-label="Авторизация">
      <p>Форма авторизации</p>

      <button type="button" onClick={onClose}>
        Закрыть авторизацию
      </button>
    </div>
  ),
}));

const invitation = {
  boardTitle: 'Тестовая доска',
  role: 'EDITOR' as const,
  type: 'LINK' as const,
  expiresAt: '2030-01-01T12:00:00.000Z',
  isExpired: false,
  isRevoked: false,
  isExhausted: false,
  requiresAuthentication: true as const,
};

function mockInvitationQuery(
  overrides: Partial<{
    isPending: boolean;
    isError: boolean;
    data: {
      invitation: typeof invitation;
    };
  }> = {},
) {
  usePublicBoardInvitationQueryMock.mockReturnValue({
    isPending: false,
    isError: false,
    data: {
      invitation,
    },
    ...overrides,
  });
}

function mockCurrentUser(
  user: {
    id: string;
    email: string;
    name: string | null;
  } | null,
) {
  useCurrentUserMock.mockReturnValue({
    data: user,
    isPending: false,
  });
}

describe('InvitationPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockCurrentUser(null);
    mockInvitationQuery();

    useAcceptBoardInvitationMutationMock.mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
    });
  });

  it('показывает состояние загрузки приглашения', () => {
    mockInvitationQuery({
      isPending: true,
      data: undefined,
    });

    render(<InvitationPage token="test-token" onAccepted={vi.fn()} />);

    expect(screen.getByRole('status')).toHaveTextContent('Загрузка приглашения…');
  });

  it('показывает состояние загрузки текущего пользователя', () => {
    useCurrentUserMock.mockReturnValue({
      data: undefined,
      isPending: true,
    });

    render(<InvitationPage token="test-token" onAccepted={vi.fn()} />);

    expect(screen.getByRole('status')).toHaveTextContent('Загрузка приглашения…');
  });

  it('показывает ошибку для недоступного приглашения', () => {
    mockInvitationQuery({
      isError: true,
      data: undefined,
    });

    render(<InvitationPage token="test-token" onAccepted={vi.fn()} />);

    expect(
      screen.getByRole('heading', {
        name: 'Приглашение недоступно',
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Приглашение не найдено или больше недоступно.',
    );
  });

  it('показывает информацию о доступном приглашении', () => {
    render(<InvitationPage token="test-token" onAccepted={vi.fn()} />);

    expect(
      screen.getByRole('heading', {
        name: 'Приглашение на доску',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Тестовая доска',
      }),
    ).toBeInTheDocument();

    expect(screen.getByText('Приглашение по ссылке')).toBeInTheDocument();

    expect(screen.getByText('Редактор')).toBeInTheDocument();
  });

  it('предлагает авторизацию неавторизованному пользователю', () => {
    render(<InvitationPage token="test-token" onAccepted={vi.fn()} />);

    expect(
      screen.getByRole('button', {
        name: 'Войти или зарегистрироваться',
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('button', {
        name: 'Принять приглашение',
      }),
    ).not.toBeInTheDocument();
  });

  it('открывает диалог авторизации', async () => {
    const user = userEvent.setup();

    render(<InvitationPage token="test-token" onAccepted={vi.fn()} />);

    await user.click(
      screen.getByRole('button', {
        name: 'Войти или зарегистрироваться',
      }),
    );

    expect(
      screen.getByRole('dialog', {
        name: 'Авторизация',
      }),
    ).toBeInTheDocument();
  });

  it('показывает кнопку принятия приглашения авторизованному пользователю', () => {
    mockCurrentUser({
      id: 'user-1',
      email: 'user@test.local',
      name: 'Тестовый пользователь',
    });

    render(<InvitationPage token="test-token" onAccepted={vi.fn()} />);

    expect(
      screen.getByRole('button', {
        name: 'Принять приглашение',
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('button', {
        name: 'Войти или зарегистрироваться',
      }),
    ).not.toBeInTheDocument();
  });

  it('принимает приглашение и передаёт id доски', async () => {
    const user = userEvent.setup();
    const onAccepted = vi.fn();

    mockCurrentUser({
      id: 'user-1',
      email: 'user@test.local',
      name: null,
    });

    const mutateAsync = vi.fn().mockResolvedValue({
      member: {
        id: 'member-1',
        boardId: 'board-1',
        userId: 'user-1',
        role: 'EDITOR',
        createdAt: '2030-01-01T10:00:00.000Z',
        updatedAt: '2030-01-01T10:00:00.000Z',
      },
    });

    useAcceptBoardInvitationMutationMock.mockReturnValue({
      mutateAsync,
      isPending: false,
    });

    render(<InvitationPage token="test-token" onAccepted={onAccepted} />);

    await user.click(
      screen.getByRole('button', {
        name: 'Принять приглашение',
      }),
    );

    expect(mutateAsync).toHaveBeenCalledTimes(1);

    expect(onAccepted).toHaveBeenCalledWith('board-1');
  });

  it('показывает ошибку при неудачном принятии приглашения', async () => {
    const user = userEvent.setup();

    mockCurrentUser({
      id: 'user-1',
      email: 'user@test.local',
      name: null,
    });

    useAcceptBoardInvitationMutationMock.mockReturnValue({
      mutateAsync: vi.fn().mockRejectedValue(new Error('Ошибка')),
      isPending: false,
    });

    render(<InvitationPage token="test-token" onAccepted={vi.fn()} />);

    await user.click(
      screen.getByRole('button', {
        name: 'Принять приглашение',
      }),
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Не удалось принять приглашение.');
  });

  it('показывает сообщение об отозванном приглашении и запрещает принятие', () => {
    mockInvitationQuery({
      data: {
        invitation: {
          ...invitation,
          isRevoked: true,
        },
      },
    });

    mockCurrentUser({
      id: 'user-1',
      email: 'user@test.local',
      name: null,
    });

    render(<InvitationPage token="test-token" onAccepted={vi.fn()} />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Это приглашение было отозвано владельцем доски.',
    );

    expect(
      screen.queryByRole('button', {
        name: 'Принять приглашение',
      }),
    ).not.toBeInTheDocument();
  });

  it('показывает сообщение об истёкшем приглашении и запрещает принятие', () => {
    mockInvitationQuery({
      data: {
        invitation: {
          ...invitation,
          isExpired: true,
        },
      },
    });

    mockCurrentUser({
      id: 'user-1',
      email: 'user@test.local',
      name: null,
    });

    render(<InvitationPage token="test-token" onAccepted={vi.fn()} />);

    expect(screen.getByRole('alert')).toHaveTextContent('Срок действия этого приглашения истёк.');

    expect(
      screen.queryByRole('button', {
        name: 'Принять приглашение',
      }),
    ).not.toBeInTheDocument();
  });

  it('показывает сообщение об исчерпанном приглашении и запрещает принятие', () => {
    mockInvitationQuery({
      data: {
        invitation: {
          ...invitation,
          isExhausted: true,
        },
      },
    });

    mockCurrentUser({
      id: 'user-1',
      email: 'user@test.local',
      name: null,
    });

    render(<InvitationPage token="test-token" onAccepted={vi.fn()} />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Лимит использований этого приглашения исчерпан.',
    );

    expect(
      screen.queryByRole('button', {
        name: 'Принять приглашение',
      }),
    ).not.toBeInTheDocument();
  });
});
