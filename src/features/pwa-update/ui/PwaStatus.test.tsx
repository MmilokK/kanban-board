import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PwaStatus } from './PwaStatus';

const { updateServiceWorkerMock, setOfflineReadyMock, setNeedRefreshMock, pwaState } = vi.hoisted(
  () => ({
    updateServiceWorkerMock: vi.fn(),
    setOfflineReadyMock: vi.fn(),
    setNeedRefreshMock: vi.fn(),
    pwaState: {
      offlineReady: false,
      needRefresh: false,
    },
  }),
);

vi.mock('virtual:pwa-register/react', () => ({
  useRegisterSW: () => ({
    offlineReady: [pwaState.offlineReady, setOfflineReadyMock],
    needRefresh: [pwaState.needRefresh, setNeedRefreshMock],
    updateServiceWorker: updateServiceWorkerMock,
  }),
}));

describe('Состояние PWA', () => {
  beforeEach(() => {
    pwaState.offlineReady = false;
    pwaState.needRefresh = false;

    vi.clearAllMocks();
  });

  it('ничего не показывает без событий PWA', () => {
    render(<PwaStatus />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('сообщает, что локальные доски доступны без сети', () => {
    pwaState.offlineReady = true;

    render(<PwaStatus />);

    expect(screen.getByText('Приложение сохранено для работы без сети')).toBeInTheDocument();

    expect(
      screen.getByText(
        'Локальные доски доступны офлайн. Для cloud-досок требуется подключение к серверу.',
      ),
    ).toBeInTheDocument();
  });

  it('сообщает о новой версии', () => {
    pwaState.needRefresh = true;

    render(<PwaStatus />);

    expect(screen.getByText('Доступна новая версия')).toBeInTheDocument();

    expect(
      screen.getByText('Обнови приложение, чтобы использовать последнюю версию.'),
    ).toBeInTheDocument();
  });

  it('запускает обновление приложения', async () => {
    pwaState.needRefresh = true;

    const user = userEvent.setup();

    render(<PwaStatus />);

    await user.click(
      screen.getByRole('button', {
        name: 'Обновить',
      }),
    );

    expect(updateServiceWorkerMock).toHaveBeenCalledWith(true);
  });

  it('закрывает уведомление о новой версии', async () => {
    pwaState.needRefresh = true;

    const user = userEvent.setup();

    render(<PwaStatus />);

    await user.click(
      screen.getByRole('button', {
        name: 'Позже',
      }),
    );

    expect(setNeedRefreshMock).toHaveBeenCalledWith(false);
    expect(setOfflineReadyMock).toHaveBeenCalledWith(false);
  });

  it('закрывает уведомление о готовности PWA', async () => {
    pwaState.offlineReady = true;

    const user = userEvent.setup();

    render(<PwaStatus />);

    await user.click(
      screen.getByRole('button', {
        name: 'Закрыть',
      }),
    );

    expect(setOfflineReadyMock).toHaveBeenCalledWith(false);
    expect(setNeedRefreshMock).toHaveBeenCalledWith(false);
  });
});
