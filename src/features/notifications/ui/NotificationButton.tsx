import { useEffect, useRef, useState } from 'react';

import {
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useNotifications,
  useUnreadNotificationCount,
} from '../../../entities/notification/api/use-notifications';

import styles from './NotificationButton.module.scss';

function formatNotificationDate(value: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export function NotificationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const { data: notifications = [], isLoading: notificationsLoading } = useNotifications();

  const { data: unreadCount = 0 } = useUnreadNotificationCount();

  const markAsReadMutation = useMarkNotificationAsRead();

  const markAllAsReadMutation = useMarkAllNotificationsAsRead();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent): void {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      if (root.contains(event.target as Node)) {
        return;
      }

      setIsOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key !== 'Escape') {
        return;
      }

      setIsOpen(false);
    }

    document.addEventListener('pointerdown', handlePointerDown);

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);

      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  function handleNotificationClick(notificationId: string, readAt: string | null): void {
    if (readAt) {
      return;
    }

    markAsReadMutation.mutate(notificationId);
  }

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        type="button"
        className={styles.trigger}
        aria-label="Уведомления"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => {
          setIsOpen((current) => !current);
        }}
      >
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {unreadCount > 0 && (
          <span className={styles.badge} aria-label={`Непрочитанных уведомлений: ${unreadCount}`}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className={styles.panel} role="dialog" aria-label="Уведомления">
          <div className={styles.header}>
            <h2>Уведомления</h2>

            {unreadCount > 0 && (
              <button
                type="button"
                className={styles.markAllButton}
                disabled={markAllAsReadMutation.isPending}
                onClick={() => {
                  markAllAsReadMutation.mutate();
                }}
              >
                Отметить всё прочитанным
              </button>
            )}
          </div>

          <div className={styles.content}>
            {notificationsLoading && <p className={styles.status}>Загрузка уведомлений...</p>}

            {!notificationsLoading && notifications.length === 0 && (
              <p className={styles.status}>Уведомлений пока нет</p>
            )}

            {!notificationsLoading && notifications.length > 0 && (
              <ul className={styles.list}>
                {notifications.map((notification) => {
                  const isUnread = notification.readAt === null;

                  return (
                    <li key={notification.id} className={styles.item}>
                      <button
                        type="button"
                        className={`${styles.notification} ${
                          isUnread ? styles.notificationUnread : ''
                        }`}
                        onClick={() => {
                          handleNotificationClick(notification.id, notification.readAt);
                        }}
                      >
                        <span className={styles.notificationHeader}>
                          <span className={styles.title}>{notification.title}</span>

                          {isUnread && (
                            <span className={styles.unreadDot} aria-label="Непрочитанное" />
                          )}
                        </span>

                        <span className={styles.message}>{notification.message}</span>

                        <time className={styles.date} dateTime={notification.createdAt}>
                          {formatNotificationDate(notification.createdAt)}
                        </time>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
