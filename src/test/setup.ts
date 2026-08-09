import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

if (typeof HTMLDialogElement !== 'undefined' && !HTMLDialogElement.prototype.showModal) {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
    configurable: true,

    value(this: HTMLDialogElement): void {
      this.setAttribute('open', '');
    },
  });
}

if (typeof HTMLDialogElement !== 'undefined' && !HTMLDialogElement.prototype.close) {
  Object.defineProperty(HTMLDialogElement.prototype, 'close', {
    configurable: true,

    value(this: HTMLDialogElement, returnValue = ''): void {
      this.returnValue = returnValue;
      this.removeAttribute('open');
      this.dispatchEvent(new Event('close'));
    },
  });
}

class ResizeObserverMock implements ResizeObserver {
  observe(): void {
    // Наблюдение за размерами в jsdom не требуется.
  }

  unobserve(): void {
    // Наблюдение за размерами в jsdom не требуется.
  }

  disconnect(): void {
    // Наблюдение за размерами в jsdom не требуется.
  }
}

globalThis.ResizeObserver = ResizeObserverMock;

Object.defineProperty(window, 'matchMedia', {
  writable: true,

  value: (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,

    addListener: () => {
      // Legacy API.
    },

    removeListener: () => {
      // Legacy API.
    },

    addEventListener: () => {
      // Не требуется по умолчанию.
    },

    removeEventListener: () => {
      // Не требуется по умолчанию.
    },

    dispatchEvent: () => false,
  }),
});
