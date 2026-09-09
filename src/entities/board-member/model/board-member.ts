export type BoardRole = 'OWNER' | 'EDITOR' | 'VIEWER';

export type BoardMember = {
  id: string;
  user: {
    id: string;
    email: string;
    name: string | null;
  };
  role: BoardRole;
  createdAt: string;
  updatedAt: string;
};

export function canEditBoard(role: BoardRole): boolean {
  return role === 'OWNER' || role === 'EDITOR';
}

export function canDeleteBoard(role: BoardRole): boolean {
  return role === 'OWNER';
}

export function canManageBoardMembers(role: BoardRole): boolean {
  return role === 'OWNER';
}
