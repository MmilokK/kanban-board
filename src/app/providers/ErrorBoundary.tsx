import { Component, type ErrorInfo, type ReactNode } from 'react';

import styles from './ErrorBoundary.module.scss';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Необработанная ошибка React:', error, errorInfo);
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className={styles.page}>
          <section className={styles.message} role="alert">
            <p className={styles.eyebrow}>Ошибка приложения</p>

            <h1 className={styles.title}>Не удалось отобразить доску</h1>

            <p className={styles.description}>
              Произошла непредвиденная ошибка. Перезагрузи страницу и попробуй ещё раз.
            </p>

            <button className={styles.reloadButton} type="button" onClick={this.handleReload}>
              Перезагрузить страницу
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
