import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { NotificationButton } from './NotificationButton';

const getNotificationsMock = vi.fn();
const getUnreadNotificationCountMock = vi.fn();
const markNotificationAsReadMock = vi.fn();
const markAllNotificationsAsReadMock = vi.fn();

vi.mock('../../../entities/notification/api/notification-api', () => ({
  getNotifications: () => getNotificationsMock(),
  getUnreadNotificationCount: () => getUnreadNotificationCountMock(),
  markNotificationAsRead: (notificationId: string) => markNotificationAsReadMock(notificationId),
  markAllNotificationsAsRead: () => markAllNotificationsAsReadMock(),
}));

function renderNotificationButton() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },

      mutations: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <NotificationButton />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();

  getNotificationsMock.mockResolvedValue({
    notifications: [
      {
        id: 'notification-1',
        userId: 'user-1',
        type: 'BOARD_ROLE_CHANGED',
        title: 'Роль на доске изменена',
        message: 'Ваша роль на доске «Рабочая доска» изменена на «Редактор»',
        boardId: 'board-1',
        readAt: null,
        createdAt: '2026-09-11T10:00:00.000Z',
      },
      {
        id: 'notification-2',
        userId: 'user-1',
        type: 'BOARD_ACCESS_GRANTED',
        title: 'Доступ к доске получен',
        message: 'Вы получили доступ к доске «Личные задачи»',
        boardId: 'board-2',
        readAt: '2026-09-11T11:00:00.000Z',
        createdAt: '2026-09-11T09:00:00.000Z',
      },
    ],
  });

  getUnreadNotificationCountMock.mockResolvedValue({
    count: 1,
  });

  markNotificationAsReadMock.mockResolvedValue({
    notification: {
      id: 'notification-1',
      userId: 'user-1',
      type: 'BOARD_ROLE_CHANGED',
      title: 'Роль на доске изменена',
      message: 'Ваша роль на доске «Рабочая доска» изменена на «Редактор»',
      boardId: 'board-1',
      readAt: '2026-09-11T12:00:00.000Z',
      createdAt: '2026-09-11T10:00:00.000Z',
    },
  });

  markAllNotificationsAsReadMock.mockResolvedValue({
    count: 0,
  });
});

describe('Кнопка уведомлений', () => {
  it('показывает количество непрочитанных уведомлений', async () => {
    renderNotificationButton();

    expect(await screen.findByLabelText('Непрочитанных уведомлений: 1')).toHaveTextContent('1');
  });

  it('показывает 99+ при количестве непрочитанных больше 99', async () => {
    getUnreadNotificationCountMock.mockResolvedValue({
      count: 120,
    });

    renderNotificationButton();

    expect(await screen.findByLabelText('Непрочитанных уведомлений: 120')).toHaveTextContent('99+');
  });

  it('открывает панель уведомлений', async () => {
    const user = userEvent.setup();

    renderNotificationButton();

    await user.click(
      screen.getByRole('button', {
        name: 'Уведомления',
      }),
    );

    expect(
      screen.getByRole('dialog', {
        name: 'Уведомления',
      }),
    ).toBeInTheDocument();

    expect(await screen.findByText('Роль на доске изменена')).toBeInTheDocument();

    expect(screen.getByText('Доступ к доске получен')).toBeInTheDocument();
  });

  it('закрывает панель повторным кликом по кнопке', async () => {
    const user = userEvent.setup();

    renderNotificationButton();

    const button = screen.getByRole('button', {
      name: 'Уведомления',
    });

    await user.click(button);

    expect(
      screen.getByRole('dialog', {
        name: 'Уведомления',
      }),
    ).toBeInTheDocument();

    await user.click(button);

    expect(
      screen.queryByRole('dialog', {
        name: 'Уведомления',
      }),
    ).not.toBeInTheDocument();
  });

  it('не отмечает уведомления прочитанными при открытии панели', async () => {
    const user = userEvent.setup();

    renderNotificationButton();

    await user.click(
      screen.getByRole('button', {
        name: 'Уведомления',
      }),
    );

    await screen.findByText('Роль на доске изменена');

    expect(markNotificationAsReadMock).not.toHaveBeenCalled();

    expect(markAllNotificationsAsReadMock).not.toHaveBeenCalled();
  });

  it('показывает маркер у непрочитанного уведомления', async () => {
    const user = userEvent.setup();

    renderNotificationButton();

    await user.click(
      screen.getByRole('button', {
        name: 'Уведомления',
      }),
    );

    expect(await screen.findByLabelText('Непрочитанное')).toBeInTheDocument();
  });

  it('отмечает непрочитанное уведомление прочитанным по клику', async () => {
    const user = userEvent.setup();

    renderNotificationButton();

    await user.click(
      screen.getByRole('button', {
        name: 'Уведомления',
      }),
    );

    const title = await screen.findByText('Роль на доске изменена');

    const notificationButton = title.closest('button');

    expect(notificationButton).not.toBeNull();

    await user.click(notificationButton!);

    await waitFor(() => {
      expect(markNotificationAsReadMock).toHaveBeenCalledTimes(1);
    });

    expect(markNotificationAsReadMock).toHaveBeenCalledWith('notification-1');
  });

  it('не отправляет повторный запрос для уже прочитанного уведомления', async () => {
    const user = userEvent.setup();

    renderNotificationButton();

    await user.click(
      screen.getByRole('button', {
        name: 'Уведомления',
      }),
    );

    const title = await screen.findByText('Доступ к доске получен');

    const notificationButton = title.closest('button');

    expect(notificationButton).not.toBeNull();

    await user.click(notificationButton!);

    expect(markNotificationAsReadMock).not.toHaveBeenCalled();
  });

  it('отмечает все уведомления прочитанными', async () => {
    const user = userEvent.setup();

    renderNotificationButton();

    await user.click(
      screen.getByRole('button', {
        name: 'Уведомления',
      }),
    );

    await screen.findByText('Роль на доске изменена');

    await user.click(
      screen.getByRole('button', {
        name: 'Отметить всё прочитанным',
      }),
    );

    await waitFor(() => {
      expect(markAllNotificationsAsReadMock).toHaveBeenCalledTimes(1);
    });
  });

  it('закрывает панель по Escape', async () => {
    const user = userEvent.setup();

    renderNotificationButton();

    await user.click(
      screen.getByRole('button', {
        name: 'Уведомления',
      }),
    );

    expect(
      screen.getByRole('dialog', {
        name: 'Уведомления',
      }),
    ).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(
      screen.queryByRole('dialog', {
        name: 'Уведомления',
      }),
    ).not.toBeInTheDocument();
  });

  it('закрывает панель по клику вне неё', async () => {
    const user = userEvent.setup();

    renderNotificationButton();

    await user.click(
      screen.getByRole('button', {
        name: 'Уведомления',
      }),
    );

    expect(
      screen.getByRole('dialog', {
        name: 'Уведомления',
      }),
    ).toBeInTheDocument();

    await user.click(document.body);

    expect(
      screen.queryByRole('dialog', {
        name: 'Уведомления',
      }),
    ).not.toBeInTheDocument();
  });
});
