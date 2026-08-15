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
            <strong>Приложение готово к работе без сети</strong>
            <p>Основные файлы приложения сохранены на устройстве.</p>
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
