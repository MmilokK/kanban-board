import { initialBoardState } from '../entities/board/model/initial-board';

export function App() {
  const columnCount = initialBoardState.columnOrder.length;

  return (
    <main>
      <h1>Kanban Board</h1>

      <p>Project setup is complete.</p>

      <p>
        Columns: <strong>{columnCount}</strong>
      </p>
    </main>
  );
}
