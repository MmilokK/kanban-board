import { afterEach, describe, expect, it, vi } from 'vitest';

import { ApiError } from './api-error';

import { apiRequest } from './api-client';

describe('API client', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('возвращает JSON успешного ответа', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          id: 'board-1',
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    vi.stubGlobal('fetch', fetchMock);

    await expect(
      apiRequest<{
        id: string;
      }>('/boards/board-1'),
    ).resolves.toEqual({
      id: 'board-1',
    });
  });

  it('отправляет JSON body', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          id: 'board-1',
        }),
        {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    vi.stubGlobal('fetch', fetchMock);

    await apiRequest('/boards', {
      method: 'POST',
      body: {
        title: 'Рабочая доска',
      },
    });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/boards'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          title: 'Рабочая доска',
        }),
        headers: expect.objectContaining({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('выбрасывает ApiError при ошибке сервера', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            message: 'Доска не найдена',
            code: 'BOARD_NOT_FOUND',
          }),
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      ),
    );

    const request = apiRequest('/boards/missing');

    await expect(request).rejects.toMatchObject({
      name: 'ApiError',
      message: 'Доска не найдена',
      status: 404,
      code: 'BOARD_NOT_FOUND',
    });
  });

  it('использует стандартное сообщение если сервер не вернул JSON error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response('Internal Server Error', {
          status: 500,
        }),
      ),
    );

    try {
      await apiRequest('/boards');

      throw new Error('Ожидалась ошибка API');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);

      expect(error).toMatchObject({
        message: 'HTTP error 500',
        status: 500,
      });
    }
  });
});
