import { useState } from 'react';
import { useBoardStore } from '../entities/board/model/board-store';
import { AuthControls } from '../features/auth/ui/AuthControls';
import { PwaStatus } from '../features/pwa-update/ui/PwaStatus';
import { useTheme } from '../features/theme/model/use-theme';
import { ThemeSwitcher } from '../features/theme/ui/ThemeSwitcher';
import type { WorkspaceMode } from '../shared/model/workspace-mode';
import { CloudBoards } from '../widgets/board/ui/CloudBoards';
import { LocalBoards } from '../widgets/board/ui/LocalBoards';
import styles from './App.module.scss';

export function App() {
  const resetBoard = useBoardStore((state) => state.resetBoard);
  const { theme, setTheme } = useTheme();
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>('local');
  const isLocalMode = workspaceMode === 'local';

  return (
    <div className={styles.application}>
      <header className={styles.header}>
        <h1 className={styles.title}>Kanban Board</h1>

        <div className={styles.headerActions}>
          <ThemeSwitcher value={theme} onChange={setTheme} />

          {isLocalMode && (
            <button className={styles.resetButton} type="button" onClick={resetBoard}>
              Сбросить локальные данные
            </button>
          )}

          <AuthControls />
        </div>
      </header>

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

      <main className={styles.main}>
        {workspaceMode === 'local' ? <LocalBoards /> : <CloudBoards />}
      </main>

      <PwaStatus />
    </div>
  );
}
