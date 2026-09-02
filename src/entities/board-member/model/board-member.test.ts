import { describe, expect, it } from 'vitest';
import { canEditBoard, canManageBoardMembers } from './board-member';

describe('Права участника доски', () => {
  it('разрешает владельцу редактировать доску', () => {
    expect(canEditBoard('OWNER')).toBe(true);
  });

  it('разрешает редактору редактировать доску', () => {
    expect(canEditBoard('EDITOR')).toBe(true);
  });

  it('не разрешает наблюдателю редактировать доску', () => {
    expect(canEditBoard('VIEWER')).toBe(false);
  });

  it('разрешает владельцу управлять участниками', () => {
    expect(canManageBoardMembers('OWNER')).toBe(true);
  });

  it('не разрешает редактору управлять участниками', () => {
    expect(canManageBoardMembers('EDITOR')).toBe(false);
  });

  it('не разрешает наблюдателю управлять участниками', () => {
    expect(canManageBoardMembers('VIEWER')).toBe(false);
  });
});
