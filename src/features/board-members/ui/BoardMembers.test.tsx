import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BoardMembers } from './BoardMembers';
import { useBoardMembers } from '../../../entities/board-member/api/use-board-members';

const updateRoleMock = vi.fn();
const removeMemberMock = vi.fn();

vi.mock('../../../entities/board-member/api/use-board-members', () => ({
  useBoardMembers: vi.fn(),
}));

vi.mock('../api/use-update-board-member-role', () => ({
  useUpdateBoardMemberRole: () => ({
    mutate: updateRoleMock,
    isPending: false,
    isError: false,
  }),
}));

vi.mock('../api/use-remove-board-member', () => ({
  useRemoveBoardMember: () => ({
    mutate: removeMemberMock,
    isPending: false,
    isError: false,
  }),
}));

const useBoardMembersMock = vi.mocked(useBoardMembers);
const members = [
  {
    id: '11111111-1111-4111-8111-111111111111',
    user: {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      email: 'owner@example.com',
      name: 'Анна',
    },
    role: 'OWNER' as const,
    createdAt: '2026-09-02T12:00:00.000Z',
    updatedAt: '2026-09-02T12:00:00.000Z',
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    user: {
      id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      email: 'editor@example.com',
      name: 'Максим',
    },
    role: 'EDITOR' as const,
    createdAt: '2026-09-02T12:00:00.000Z',
    updatedAt: '2026-09-02T12:00:00.000Z',
  },
];

describe('Участники доски', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useBoardMembersMock.mockReturnValue({
      data: members,
      isPending: false,
      isError: false,
    } as ReturnType<typeof useBoardMembers>);
  });

  it('показывает участников доски', () => {
    render(<BoardMembers boardId="board-id" currentUserRole="OWNER" />);
    expect(screen.getByText('Анна')).toBeInTheDocument();
    expect(screen.getByText('Максим')).toBeInTheDocument();
  });

  it('позволяет владельцу менять роль участника', () => {
    render(<BoardMembers boardId="board-id" currentUserRole="OWNER" />);
    fireEvent.change(
      screen.getByRole('combobox', {
        name: 'Роль участника Максим',
      }),
      {
        target: { value: 'VIEWER' },
      },
    );
    expect(updateRoleMock).toHaveBeenCalledWith({
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      role: 'VIEWER',
    });
  });

  it('не показывает управление ролями наблюдателю', () => {
    render(<BoardMembers boardId="board-id" currentUserRole="VIEWER" />);
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', {
        name: 'Удалить участника Максим',
      }),
    ).not.toBeInTheDocument();
  });

  it('не позволяет изменять владельца доски через интерфейс', () => {
    render(<BoardMembers boardId="board-id" currentUserRole="OWNER" />);
    expect(screen.getByText('Владелец')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', {
        name: 'Удалить участника Анна',
      }),
    ).not.toBeInTheDocument();
  });

  it('удаляет участника после подтверждения', () => {
    const confirmMock = vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<BoardMembers boardId="board-id" currentUserRole="OWNER" />);
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Удалить участника Максим',
      }),
    );
    expect(confirmMock).toHaveBeenCalled();
    expect(removeMemberMock).toHaveBeenCalledWith('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb');
    confirmMock.mockRestore();
  });
});
