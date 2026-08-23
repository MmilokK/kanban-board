import { apiRequest } from '../../../shared/api/api-client';
import type { AuthResponse, LoginInput, RegisterInput } from './auth-api.types';

export function getCurrentUser() {
  return apiRequest<AuthResponse>('/auth/me');
}

export function register(input: RegisterInput) {
  return apiRequest<AuthResponse>('/auth/register', {
    method: 'POST',
    body: input,
  });
}

export function login(input: LoginInput) {
  return apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: input,
  });
}

export function logout() {
  return apiRequest<void>('/auth/logout', {
    method: 'POST',
  });
}
