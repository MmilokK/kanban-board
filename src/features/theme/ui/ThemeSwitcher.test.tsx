import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import { ThemeSwitcher } from './ThemeSwitcher';

describe('Переключатель темы', () => {
  it('показывает текущую тему', () => {
    render(<ThemeSwitcher value="dark" onChange={vi.fn()} />);

    expect(
      screen.getByRole('combobox', {
        name: 'Тема',
      }),
    ).toHaveValue('dark');
  });

  it('показывает все варианты темы', () => {
    render(<ThemeSwitcher value="system" onChange={vi.fn()} />);

    expect(
      screen.getByRole('option', {
        name: 'Как в системе',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('option', {
        name: 'Светлая',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('option', {
        name: 'Тёмная',
      }),
    ).toBeInTheDocument();
  });

  it('изменяет тему', async () => {
    const user = userEvent.setup();

    const onChange = vi.fn();

    render(<ThemeSwitcher value="system" onChange={onChange} />);

    await user.selectOptions(
      screen.getByRole('combobox', {
        name: 'Тема',
      }),
      'dark',
    );

    expect(onChange).toHaveBeenCalledWith('dark');
  });
});
