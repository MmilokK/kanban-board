import { demoBoardState } from '../entities/board/model/demo-board';
import { Board } from '../widgets/board/ui/Board';

import styles from './App.module.scss';

export function App() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Kanban Board</h1>
        </div>

        <p className={styles.description}>Простая доска для управления задачами.</p>
      </header>

      <Board board={demoBoardState} />
    </main>
  );
}
