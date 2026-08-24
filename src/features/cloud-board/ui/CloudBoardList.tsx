import { useCloudBoards } from '../../../entities/board/api/use-cloud-boards';
import { useCurrentUser } from '../../../entities/user/api/use-current-user';

export function CloudBoardList() {
  const { data: user } = useCurrentUser();
  const { data: boards = [], isPending } = useCloudBoards();

  if (!user) {
    return null;
  }

  return (
    <section aria-labelledby="cloud-boards-title">
      <h2 id="cloud-boards-title">Доски аккаунта</h2>

      {isPending ? (
        <p>Загрузка...</p>
      ) : boards.length === 0 ? (
        <p>В аккаунте пока нет досок.</p>
      ) : (
        <ul>
          {boards.map((board) => (
            <li key={board.id}>{board.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
