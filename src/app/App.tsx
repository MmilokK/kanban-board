import { useState } from 'react';
import { useBoardStore } from '../entities/board/model/board-store';
import { AuthControls } from '../features/auth/ui/AuthControls';
import { InvitationPage } from '../features/board-invitations/ui/InvitationPage';
import { PwaStatus } from '../features/pwa-update/ui/PwaStatus';
import { useTheme } from '../features/theme/model/use-theme';
import { ThemeSwitcher } from '../features/theme/ui/ThemeSwitcher';
import type { WorkspaceMode } from '../shared/model/workspace-mode';
import { CloudBoards } from '../widgets/board/ui/CloudBoards';
import { LocalBoards } from '../widgets/board/ui/LocalBoards';
import styles from './App.module.scss';

function getInvitationToken(): string | null {
  const match = window.location.pathname.match(/^\/invitations\/([^/]+)\/?$/);

  if (!match?.[1]) return null;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}

export function App() {
  const resetBoard = useBoardStore((state) => state.resetBoard);
  const { theme, setTheme } = useTheme();
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>('local');
  const [invitationToken, setInvitationToken] = useState<string | null>(() => getInvitationToken());
  const [cloudBoardId, setCloudBoardId] = useState<string | null>(null);
  const isLocalMode = workspaceMode === 'local';

  function handleInvitationAccepted(boardId: string) {
    window.history.replaceState(null, '', '/');
    setCloudBoardId(boardId);
    setInvitationToken(null);
    setWorkspaceMode('cloud');
  }

  return (
    <div className={styles.application}>
      <header className={styles.header}>
        <h1 className={styles.title}>Kanban Board</h1>

        <div className={styles.headerActions}>
          <ThemeSwitcher value={theme} onChange={setTheme} />

          {!invitationToken && isLocalMode && (
            <button className={styles.resetButton} type="button" onClick={resetBoard}>
              Сбросить локальные данные
            </button>
          )}

          {!invitationToken && <AuthControls />}
        </div>
      </header>

      {!invitationToken && (
        <nav aria-label="Режим хранения досок">
          <button
            type="button"
            aria-pressed={workspaceMode === 'local'}
            onClick={() => {
              setWorkspaceMode('local');
            }}
          >
            Локальные доски
          </button>

          <button
            type="button"
            aria-pressed={workspaceMode === 'cloud'}
            onClick={() => {
              setWorkspaceMode('cloud');
            }}
          >
            Облачные доски
          </button>
        </nav>
      )}

      <main className={styles.main}>
        {invitationToken ? (
          <InvitationPage token={invitationToken} onAccepted={handleInvitationAccepted} />
        ) : workspaceMode === 'local' ? (
          <LocalBoards />
        ) : (
          <CloudBoards initialBoardId={cloudBoardId} />
        )}
      </main>

      <PwaStatus />
    </div>
  );
}
