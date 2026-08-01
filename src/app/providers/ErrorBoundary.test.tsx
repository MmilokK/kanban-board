import {
    render,
    screen,
} from '@testing-library/react';
import {
    afterEach,
    describe,
    expect,
    it,
    vi,
} from 'vitest';

import { ErrorBoundary } from './ErrorBoundary';

function BrokenComponent() {
    throw new Error('Тестовая ошибка');
    return <></>
}

describe('ErrorBoundary', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('показывает запасной интерфейс при ошибке', () => {
        vi
            .spyOn(console, 'error')
            .mockImplementation(() => undefined);

        render(
            <ErrorBoundary>
                <BrokenComponent />
            </ErrorBoundary>,
        );

        expect(
            screen.getByRole('alert'),
        ).toBeVisible();

        expect(
            screen.getByRole('heading', {
                name: 'Не удалось отобразить доску',
            }),
        ).toBeVisible();

        expect(
            screen.getByRole('button', {
                name: 'Перезагрузить страницу',
            }),
        ).toBeVisible();
    });
});