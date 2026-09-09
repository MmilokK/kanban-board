import { useRegisterSW } from 'virtual:pwa-register/react';
import styles from './PwaStatus.module.scss';

export function PwaStatus() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  function handleClose() {
    setOfflineReady(false);
    setNeedRefresh(false);
  }

  async function handleUpdate() {
    await updateServiceWorker(true);
  }

  if (!offlineReady && !needRefresh) {
    return null;
  }

  return (
    <div className={styles.status} role="status" aria-live="polite">
      <div className={styles.content}>
        {needRefresh ? (
          <>
            <strong>Доступна новая версия</strong>
            <p>Обнови приложение, чтобы использовать последнюю версию.</p>
          </>
        ) : (
          <>
            <strong>Приложение сохранено для работы без сети</strong>
            <p>Локальные доски доступны офлайн. Для cloud-досок требуется подключение к серверу.</p>
          </>
        )}
      </div>

      <div className={styles.actions}>
        {needRefresh && (
          <button
            type="button"
            onClick={() => {
              void handleUpdate();
            }}
          >
            Обновить
          </button>
        )}

        <button type="button" onClick={handleClose}>
          {needRefresh ? 'Позже' : 'Закрыть'}
        </button>
      </div>
    </div>
  );
}
