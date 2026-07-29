import { useBoardStore } from '../entities/board/model/board-store';

import { Board } from '../widgets/board/ui/Board';

import styles from './App.module.scss';

export function App() {
  const resetBoard = useBoardStore((state) => state.resetBoard);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Kanban Board</h1>
        </div>

        <div className={styles.headerActions}>
          <p className={styles.description}>Простая доска для управления задачами.</p>

          <button className={styles.resetButton} type="button" onClick={resetBoard}>
            Восстановить задачи
          </button>
        </div>
      </header>

      <Board />
    </main>
  );
}
