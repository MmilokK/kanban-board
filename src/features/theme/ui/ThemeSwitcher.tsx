import type { Theme } from '../model/theme';

import styles from './ThemeSwitcher.module.scss';

type ThemeSwitcherProps = {
  value: Theme;

  onChange: (theme: Theme) => void;
};

export function ThemeSwitcher({ value, onChange }: ThemeSwitcherProps) {
  return (
    <div className={styles.container}>
      <label htmlFor="theme-select" className={styles.label}>
        Тема
      </label>

      <select
        id="theme-select"
        className={styles.select}
        value={value}
        onChange={(event) => {
          onChange(event.currentTarget.value as Theme);
        }}
      >
        <option value="system">Как в системе</option>

        <option value="light">Светлая</option>

        <option value="dark">Тёмная</option>
      </select>
    </div>
  );
}
