import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, register } from '../../../entities/user/api/auth-api';
import { authQueryKeys } from '../../../entities/user/api/auth-query-keys';
import { ApiError } from '../../../shared/api/api-error';
import styles from './AuthDialog.module.scss';

type AuthMode = 'login' | 'register';

type AuthDialogProps = {
  onClose: () => void;
};

export function AuthDialog({ onClose }: AuthDialogProps) {
  const queryClient = useQueryClient();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      if (mode === 'login') {
        return login({
          email,
          password,
        });
      }

      return register({
        email,
        password,
        ...(name.trim() ? { name: name.trim() } : {}),
      });
    },

    onSuccess: async (response) => {
      queryClient.setQueryData(authQueryKeys.currentUser, response.user);
      onClose();
    },

    onError: (error) => {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
        return;
      }

      setErrorMessage('Не удалось выполнить вход');
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    mutation.mutate();
  }

  return (
    <div className={styles.backdrop} role="presentation">
      <section
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-dialog-title"
      >
        <header className={styles.header}>
          <h2 id="auth-dialog-title">{mode === 'login' ? 'Вход' : 'Создание аккаунта'}</h2>

          <button type="button" aria-label="Закрыть" onClick={onClose}>
            ×
          </button>
        </header>

        <div className={styles.tabs}>
          <button
            type="button"
            aria-pressed={mode === 'login'}
            onClick={() => {
              setMode('login');

              setErrorMessage(null);
            }}
          >
            Вход
          </button>

          <button
            type="button"
            aria-pressed={mode === 'register'}
            onClick={() => {
              setMode('register');

              setErrorMessage(null);
            }}
          >
            Регистрация
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label>
              Имя
              <input
                type="text"
                value={name}
                autoComplete="name"
                onChange={(event) => {
                  setName(event.currentTarget.value);
                }}
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              value={email}
              required
              autoComplete="email"
              onChange={(event) => {
                setEmail(event.currentTarget.value);
              }}
            />
          </label>

          <label>
            Пароль
            <input
              type="password"
              value={password}
              required
              minLength={mode === 'register' ? 8 : undefined}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
            />
          </label>

          {errorMessage && (
            <p className={styles.error} role="alert">
              {errorMessage}
            </p>
          )}

          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Подождите...' : mode === 'login' ? 'Войти' : 'Создать аккаунт'}
          </button>
        </form>

        <p className={styles.guestHint}>Аккаунт не обязателен для локальной работы с досками.</p>
      </section>
    </div>
  );
}
