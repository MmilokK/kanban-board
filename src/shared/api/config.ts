const DEFAULT_API_URL = 'http://localhost:3000/api';

function normalizeApiUrl(value: string): string {
  return value.replace(/\/+$/, '');
}

export const API_URL = normalizeApiUrl(import.meta.env.VITE_API_URL || DEFAULT_API_URL);
