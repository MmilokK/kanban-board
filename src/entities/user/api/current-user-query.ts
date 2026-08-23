import { ApiError } from '../../../shared/api/api-error';
import { getCurrentUser } from './auth-api';
import type { AuthUser } from './auth-api.types';

export async function queryCurrentUser(): Promise<AuthUser | null> {
  try {
    const response = await getCurrentUser();

    return response.user;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }

    throw error;
  }
}
