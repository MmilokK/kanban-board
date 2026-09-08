import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BoardInvitationsDialog } from './BoardInvitationsDialog';

const useBoardInvitationsQueryMock = vi.fn();
const useCreateEmailBoardInvitationMutationMock = vi.fn();
const useCreateLinkBoardInvitationMutationMock = vi.fn();
const useRevokeBoardInvitationMutationMock = vi.fn();

vi.mock('../api/board-invitations.queries', () => ({
  useBoardInvitationsQuery: (
    boardId: string,
    options?: {
      enabled?: boolean;
    },
  ) => useBoardInvitationsQueryMock(boardId, options),

  useCreateEmailBoardInvitationMutation: (boardId: string) =>
    useCreateEmailBoardInvitationMutationMock(boardId),

  useCreateLinkBoardInvitationMutation: (boardId: string) =>
    useCreateLinkBoardInvitationMutationMock(boardId),

  useRevokeBoardInvitationMutation: (boardId: string) =>
    useRevokeBoardInvitationMutationMock(boardId),
}));

const activeLinkInvitation = {
  id: 'invitation-1',
  boardId: 'board-1',
  invitedByUserId: 'owner-1',
  type: 'LINK' as const,
  email: null,
  role: 'EDITOR' as const,
  token: 'link-token-1',
  expiresAt: '2030-01-10T12:00:00.000Z',
  maxUses: null,
  usedCount: 0,
  revokedAt: null,
  createdAt: '2030-01-01T12:00:00.000Z',
  updatedAt: '2030-01-01T12:00:00.000Z',
};

const activeEmailInvitation = {
  id: 'invitation-2',
  boardId: 'board-1',
  invitedByUserId: 'owner-1',
  type: 'EMAIL' as const,
  email: 'invitee@test.local',
  role: 'VIEWER' as const,
  token: 'email-token-1',
  expiresAt: '2030-01-10T12:00:00.000Z',
  maxUses: 1,
  usedCount: 0,
  revokedAt: null,
  createdAt: '2030-01-01T12:00:00.000Z',
  updatedAt: '2030-01-01T12:00:00.000Z',
};

function mockMutations() {
  useCreateEmailBoardInvitationMutationMock.mockReturnValue({
    mutateAsync: vi.fn(),
    isPending: false,
  });

  useCreateLinkBoardInvitationMutationMock.mockReturnValue({
    mutateAsync: vi.fn(),
    isPending: false,
  });

  useRevokeBoardInvitationMutationMock.mockReturnValue({
    mutateAsync: vi.fn(),
    isPending: false,
  });
}

describe('BoardInvitationsDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useBoardInvitationsQueryMock.mockReturnValue({
      data: {
        invitations: [],
      },
      isPending: false,
      isError: false,
    });

    mockMutations();

    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      configurable: true,
      value: vi.fn(function showModal(this: HTMLDialogElement) {
        this.setAttribute('open', '');
      }),
    });

    Object.defineProperty(HTMLDialogElement.prototype, 'close', {
      configurable: true,
      value: vi.fn(function close(this: HTMLDialogElement) {
        this.removeAttribute('open');
      }),
    });
  });

  it('загружает приглашения только для открытого диалога', () => {
    const { rerender } = render(
      <BoardInvitationsDialog boardId="board-1" isOpen={false} onClose={vi.fn()} />,
    );

    expect(useBoardInvitationsQueryMock).toHaveBeenLastCalledWith('board-1', {
      enabled: false,
    });

    rerender(<BoardInvitationsDialog boardId="board-1" isOpen onClose={vi.fn()} />);

    expect(useBoardInvitationsQueryMock).toHaveBeenLastCalledWith('board-1', {
      enabled: true,
    });
  });

  it('показывает состояние загрузки приглашений', () => {
    useBoardInvitationsQueryMock.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
    });

    render(<BoardInvitationsDialog boardId="board-1" isOpen onClose={vi.fn()} />);

    expect(screen.getByText('Загрузка приглашений…')).toBeInTheDocument();
  });

  it('показывает ошибку загрузки приглашений', () => {
    useBoardInvitationsQueryMock.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
    });

    render(<BoardInvitationsDialog boardId="board-1" isOpen onClose={vi.fn()} />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('создаёт приглашение по email', async () => {
    const user = userEvent.setup();

    const mutateAsync = vi.fn().mockResolvedValue({
      invitation: activeEmailInvitation,
    });

    useCreateEmailBoardInvitationMutationMock.mockReturnValue({
      mutateAsync,
      isPending: false,
    });

    render(<BoardInvitationsDialog boardId="board-1" isOpen onClose={vi.fn()} />);

    await user.type(
      screen.getByRole('textbox', {
        name: /email/i,
      }),
      'invitee@test.local',
    );

    const emailForm = screen
      .getByRole('textbox', {
        name: /email/i,
      })
      .closest('form');

    expect(emailForm).not.toBeNull();

    const roleSelect = emailForm!.querySelector('select');

    expect(roleSelect).not.toBeNull();

    await user.selectOptions(roleSelect!, 'VIEWER');

    await user.click(
      screen.getByRole('button', {
        name: 'Отправить приглашение',
      }),
    );

    expect(mutateAsync).toHaveBeenCalledWith({
      email: 'invitee@test.local',
      role: 'VIEWER',
    });
  });

  it('создаёт приглашение по ссылке', async () => {
    const user = userEvent.setup();

    const mutateAsync = vi.fn().mockResolvedValue({
      invitation: activeLinkInvitation,
    });

    useCreateLinkBoardInvitationMutationMock.mockReturnValue({
      mutateAsync,
      isPending: false,
    });

    render(<BoardInvitationsDialog boardId="board-1" isOpen onClose={vi.fn()} />);

    const expiresInput = screen.getByRole('spinbutton', {
      name: 'Срок действия, дней',
    });

    await user.clear(expiresInput);
    await user.type(expiresInput, '14');

    await user.click(
      screen.getByRole('checkbox', {
        name: 'Ограничить количество использований',
      }),
    );

    const maxUsesInput = screen.getByRole('spinbutton', {
      name: 'Максимум использований',
    });

    await user.clear(maxUsesInput);
    await user.type(maxUsesInput, '5');

    const forms = document.querySelectorAll('form');
    const linkForm = forms[1];

    expect(linkForm).toBeDefined();

    const roleSelect = linkForm!.querySelector('select');

    expect(roleSelect).not.toBeNull();

    await user.selectOptions(roleSelect!, 'EDITOR');

    await user.click(
      screen.getByRole('button', {
        name: 'Создать ссылку',
      }),
    );

    expect(mutateAsync).toHaveBeenCalledWith({
      role: 'EDITOR',
      expiresInDays: 14,
      maxUses: 5,
    });
  });

  it('создаёт ссылку без ограничения количества использований', async () => {
    const user = userEvent.setup();

    const mutateAsync = vi.fn().mockResolvedValue({
      invitation: activeLinkInvitation,
    });

    useCreateLinkBoardInvitationMutationMock.mockReturnValue({
      mutateAsync,
      isPending: false,
    });

    render(<BoardInvitationsDialog boardId="board-1" isOpen onClose={vi.fn()} />);

    expect(
      screen.getByRole('checkbox', {
        name: 'Ограничить количество использований',
      }),
    ).not.toBeChecked();

    await user.click(
      screen.getByRole('button', {
        name: 'Создать ссылку',
      }),
    );

    expect(mutateAsync).toHaveBeenCalledWith({
      role: 'VIEWER',
      expiresInDays: 7,
      maxUses: null,
    });
  });

  it('показывает активные приглашения', () => {
    useBoardInvitationsQueryMock.mockReturnValue({
      data: {
        invitations: [activeLinkInvitation, activeEmailInvitation],
      },
      isPending: false,
      isError: false,
    });

    render(<BoardInvitationsDialog boardId="board-1" isOpen onClose={vi.fn()} />);

    expect(screen.getByText('invitee@test.local')).toBeInTheDocument();

    expect(screen.getAllByText(/Статус:\s*Активно/i)).toHaveLength(2);
  });

  it('отзывает активное приглашение', async () => {
    const user = userEvent.setup();
    const mutateAsync = vi.fn().mockResolvedValue(undefined);

    useBoardInvitationsQueryMock.mockReturnValue({
      data: {
        invitations: [activeEmailInvitation],
      },
      isPending: false,
      isError: false,
    });

    useRevokeBoardInvitationMutationMock.mockReturnValue({
      mutateAsync,
      isPending: false,
    });

    render(<BoardInvitationsDialog boardId="board-1" isOpen onClose={vi.fn()} />);

    await user.click(
      screen.getByRole('button', {
        name: /отозвать/i,
      }),
    );

    expect(mutateAsync).toHaveBeenCalledWith(activeEmailInvitation.id);
  });

  it('копирует ссылку активного link-приглашения', async () => {
    const user = userEvent.setup();

    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText,
      },
    });

    useBoardInvitationsQueryMock.mockReturnValue({
      data: {
        invitations: [activeLinkInvitation],
      },
      isPending: false,
      isError: false,
    });

    render(<BoardInvitationsDialog boardId="board-1" isOpen onClose={vi.fn()} />);

    await user.click(
      screen.getByRole('button', {
        name: /копировать/i,
      }),
    );

    expect(writeText).toHaveBeenCalledWith(`${window.location.origin}/invitations/link-token-1`);
  });

  it('показывает отозванное приглашение как неактивное', () => {
    useBoardInvitationsQueryMock.mockReturnValue({
      data: {
        invitations: [
          {
            ...activeLinkInvitation,
            revokedAt: '2030-01-02T12:00:00.000Z',
          },
        ],
      },
      isPending: false,
      isError: false,
    });

    render(<BoardInvitationsDialog boardId="board-1" isOpen onClose={vi.fn()} />);

    expect(screen.getByText(/Статус:\s*Отозвано/i)).toBeInTheDocument();

    expect(
      screen.queryByRole('button', {
        name: /отозвать/i,
      }),
    ).not.toBeInTheDocument();
  });

  it('вызывает onClose при закрытии диалога', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<BoardInvitationsDialog boardId="board-1" isOpen onClose={onClose} />);

    await user.click(
      screen.getByRole('button', {
        name: 'Закрыть',
      }),
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
