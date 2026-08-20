export type ApiErrorData = {
  message?: string;
  code?: string;
  details?: unknown;
};

export class ApiError extends Error {
  readonly status: number;
  readonly code: string | undefined;
  readonly details: unknown;

  constructor(
    message: string,
    options: {
      status: number;
      code?: string | undefined;
      details?: unknown;
    },
  ) {
    super(message);

    this.name = 'ApiError';

    this.status = options.status;
    this.code = options.code;
    this.details = options.details;
  }
}
