import { ApiError, type ApiErrorData } from './api-error';

import { API_URL } from './config';

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type');

  if (!contentType?.includes('application/json')) {
    return null;
  }

  return response.json();
}

function getErrorMessage(data: unknown, status: number): string {
  if (
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof data.message === 'string'
  ) {
    return data.message;
  }

  return `HTTP error ${status}`;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...requestOptions } = options;

  const requestInit: RequestInit = {
    ...requestOptions,

    headers: {
      Accept: 'application/json',
      ...(body !== undefined
        ? {
            'Content-Type': 'application/json',
          }
        : {}),
      ...headers,
    },

    ...(body !== undefined
      ? {
          body: JSON.stringify(body),
        }
      : {}),
  };

  const response = await fetch(`${API_URL}${path}`, requestInit);

  const data = await parseResponseBody(response);

  if (!response.ok) {
    const errorData = data as ApiErrorData | null;

    throw new ApiError(getErrorMessage(data, response.status), {
      status: response.status,
      code: errorData?.code,
      details: errorData?.details,
    });
  }

  return data as T;
}
