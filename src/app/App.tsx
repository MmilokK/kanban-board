import { useBoardStore } from '../entities/board/model/board-store';
import { useTheme } from '../features/theme/model/use-theme';
import { ThemeSwitcher } from '../features/theme/ui/ThemeSwitcher';
import { Board } from '../widgets/board/ui/Board';
import { PwaStatus } from '../features/pwa-update/ui/PwaStatus';
import styles from './App.module.scss';
import { AuthControls } from '../features/auth/ui/AuthControls';

export function App() {
  const resetBoard = useBoardStore((state) => state.resetBoard);
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.application}>
      <header className={styles.header}>
        <h1 className={styles.title}>Kanban Board</h1>

        <div className={styles.headerActions}>
          <ThemeSwitcher value={theme} onChange={setTheme} />
          <button className={styles.resetButton} type="button" onClick={resetBoard}>
            Сбросить приложение
          </button>
          <AuthControls />
        </div>
      </header>
      <main className={styles.main}>
        <Board />
      </main>
      <PwaStatus />
    </div>
  );
}
