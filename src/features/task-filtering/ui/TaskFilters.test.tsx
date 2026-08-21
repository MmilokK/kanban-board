import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DEFAULT_TASK_FILTERS, type TaskFilterState } from '../model/task-filter';
import { TaskFilters } from './TaskFilters';

const AVAILABLE_TAGS = ['Bug', 'Документация', 'Работа'];

type TaskFiltersTestWrapperProps = {
  initialValue?: TaskFilterState;
  availableTags?: string[];
  visibleTaskCount?: number;
  totalTaskCount?: number;
  onChangeSpy?: (value: TaskFilterState) => void;
  onResetSpy?: () => void;
};

function TaskFiltersTestWrapper({
  initialValue = {
    ...DEFAULT_TASK_FILTERS,
  },
  availableTags = AVAILABLE_TAGS,
  visibleTaskCount = 3,
  totalTaskCount = 5,
  onChangeSpy,
  onResetSpy,
}: TaskFiltersTestWrapperProps) {
  const [value, setValue] = useState<TaskFilterState>(initialValue);

  function handleChange(nextValue: TaskFilterState) {
    setValue(nextValue);
    onChangeSpy?.(nextValue);
  }

  function handleReset() {
    setValue({
      ...DEFAULT_TASK_FILTERS,
    });

    onResetSpy?.();
  }

  return (
    <TaskFilters
      value={value}
      availableTags={availableTags}
      visibleTaskCount={visibleTaskCount}
      totalTaskCount={totalTaskCount}
      onChange={handleChange}
      onReset={handleReset}
    />
  );
}

function renderTaskFilters(props: TaskFiltersTestWrapperProps = {}) {
  return render(<TaskFiltersTestWrapper {...props} />);
}

describe('Фильтры задач', () => {
  it('показывает текущие значения фильтров', () => {
    renderTaskFilters({
      initialValue: {
        query: 'отчёт',
        priority: 'high',
        tag: 'Работа',
        dueDate: 'all',
        sort: 'newest',
      },
    });

    expect(
      screen.getByRole('searchbox', {
        name: 'Поиск',
      }),
    ).toHaveValue('отчёт');

    expect(
      screen.getByRole('combobox', {
        name: 'Приоритет',
      }),
    ).toHaveValue('high');

    expect(
      screen.getByRole('combobox', {
        name: 'Тег',
      }),
    ).toHaveValue('Работа');

    expect(
      screen.getByRole('combobox', {
        name: 'Сортировка',
      }),
    ).toHaveValue('newest');
  });

  it('изменяет поисковый запрос', async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();

    renderTaskFilters({
      onChangeSpy,
    });

    const searchInput = screen.getByRole('searchbox', {
      name: 'Поиск',
    });

    await user.type(searchInput, 'отчёт');

    expect(searchInput).toHaveValue('отчёт');

    expect(onChangeSpy).toHaveBeenLastCalledWith({
      ...DEFAULT_TASK_FILTERS,
      query: 'отчёт',
    });
  });

  it('изменяет фильтр приоритета', async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();

    renderTaskFilters({
      onChangeSpy,
    });

    const prioritySelect = screen.getByRole('combobox', {
      name: 'Приоритет',
    });

    await user.selectOptions(prioritySelect, 'high');

    expect(prioritySelect).toHaveValue('high');

    expect(onChangeSpy).toHaveBeenLastCalledWith({
      ...DEFAULT_TASK_FILTERS,
      priority: 'high',
    });
  });

  it('изменяет фильтр по тегу', async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();

    renderTaskFilters({
      onChangeSpy,
    });

    const tagSelect = screen.getByRole('combobox', {
      name: 'Тег',
    });

    await user.selectOptions(tagSelect, 'Документация');

    expect(tagSelect).toHaveValue('Документация');

    expect(onChangeSpy).toHaveBeenLastCalledWith({
      ...DEFAULT_TASK_FILTERS,
      tag: 'Документация',
    });
  });

  it('изменяет сортировку', async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();

    renderTaskFilters({
      onChangeSpy,
    });

    const sortSelect = screen.getByRole('combobox', {
      name: 'Сортировка',
    });

    await user.selectOptions(sortSelect, 'priority-desc');

    expect(sortSelect).toHaveValue('priority-desc');

    expect(onChangeSpy).toHaveBeenLastCalledWith({
      ...DEFAULT_TASK_FILTERS,
      sort: 'priority-desc',
    });
  });

  it('сохраняет остальные фильтры при изменении одного значения', async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();

    renderTaskFilters({
      initialValue: {
        query: 'задача',
        priority: 'medium',
        tag: 'Работа',
        dueDate: 'all',
        sort: 'newest',
      },
      onChangeSpy,
    });

    await user.selectOptions(
      screen.getByRole('combobox', {
        name: 'Приоритет',
      }),
      'high',
    );

    expect(onChangeSpy).toHaveBeenLastCalledWith({
      query: 'задача',
      priority: 'high',
      tag: 'Работа',
      dueDate: 'all',
      sort: 'newest',
    });
  });

  it('показывает количество найденных задач', () => {
    renderTaskFilters({
      visibleTaskCount: 2,
      totalTaskCount: 7,
    });

    expect(screen.getByText('Показано 2 из 7')).toBeInTheDocument();
  });

  it('показывает доступные варианты приоритета', () => {
    renderTaskFilters();

    const prioritySelect = screen.getByRole('combobox', {
      name: 'Приоритет',
    });

    expect(prioritySelect).toContainElement(
      screen.getByRole('option', {
        name: 'Все приоритеты',
      }),
    );

    expect(prioritySelect).toContainElement(
      screen.getByRole('option', {
        name: 'Высокий',
      }),
    );

    expect(prioritySelect).toContainElement(
      screen.getByRole('option', {
        name: 'Средний',
      }),
    );

    expect(prioritySelect).toContainElement(
      screen.getByRole('option', {
        name: 'Низкий',
      }),
    );
  });

  it('показывает доступные теги', () => {
    renderTaskFilters({
      availableTags: AVAILABLE_TAGS,
    });

    const tagSelect = screen.getByRole('combobox', {
      name: 'Тег',
    });

    expect(tagSelect).toContainElement(
      screen.getByRole('option', {
        name: 'Все теги',
      }),
    );

    for (const tag of AVAILABLE_TAGS) {
      expect(tagSelect).toContainElement(
        screen.getByRole('option', {
          name: tag,
        }),
      );
    }
  });

  it('показывает доступные варианты сортировки', () => {
    renderTaskFilters();

    const sortSelect = screen.getByRole('combobox', {
      name: 'Сортировка',
    });

    const expectedOptions = [
      'Ручной порядок',
      'Сначала новые',
      'Сначала старые',
      'По названию',
      'По приоритету',
    ];

    for (const optionName of expectedOptions) {
      expect(sortSelect).toContainElement(
        screen.getByRole('option', {
          name: optionName,
        }),
      );
    }
  });

  it('отключает сброс при начальных значениях', () => {
    renderTaskFilters();

    expect(
      screen.getByRole('button', {
        name: 'Сбросить',
      }),
    ).toBeDisabled();
  });

  it('включает сброс при активном поиске', () => {
    renderTaskFilters({
      initialValue: {
        ...DEFAULT_TASK_FILTERS,
        query: 'задача',
      },
    });

    expect(
      screen.getByRole('button', {
        name: 'Сбросить',
      }),
    ).toBeEnabled();
  });

  it('включает сброс при изменённой сортировке', () => {
    renderTaskFilters({
      initialValue: {
        ...DEFAULT_TASK_FILTERS,
        sort: 'title-asc',
      },
    });

    expect(
      screen.getByRole('button', {
        name: 'Сбросить',
      }),
    ).toBeEnabled();
  });

  it('вызывает сброс фильтров', async () => {
    const user = userEvent.setup();
    const onResetSpy = vi.fn();

    renderTaskFilters({
      initialValue: {
        query: 'отчёт',
        priority: 'high',
        tag: 'Работа',
        dueDate: 'all',
        sort: 'newest',
      },
      onResetSpy,
    });

    await user.click(
      screen.getByRole('button', {
        name: 'Сбросить',
      }),
    );

    expect(onResetSpy).toHaveBeenCalledTimes(1);

    expect(
      screen.getByRole('searchbox', {
        name: 'Поиск',
      }),
    ).toHaveValue('');

    expect(
      screen.getByRole('combobox', {
        name: 'Приоритет',
      }),
    ).toHaveValue('all');

    expect(
      screen.getByRole('combobox', {
        name: 'Тег',
      }),
    ).toHaveValue('');

    expect(
      screen.getByRole('combobox', {
        name: 'Сортировка',
      }),
    ).toHaveValue('manual');
  });

  it('не вызывает сброс при отключённой кнопке', async () => {
    const user = userEvent.setup();
    const onResetSpy = vi.fn();

    renderTaskFilters({
      onResetSpy,
    });

    const resetButton = screen.getByRole('button', {
      name: 'Сбросить',
    });

    expect(resetButton).toBeDisabled();

    await user.click(resetButton);

    expect(onResetSpy).not.toHaveBeenCalled();
  });

  it('изменяет фильтр по сроку', async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();

    renderTaskFilters({
      onChangeSpy,
    });

    const dueDateSelect = screen.getByRole('combobox', {
      name: 'Срок',
    });

    await user.selectOptions(dueDateSelect, 'overdue');

    expect(dueDateSelect).toHaveValue('overdue');

    expect(onChangeSpy).toHaveBeenLastCalledWith({
      ...DEFAULT_TASK_FILTERS,
      dueDate: 'overdue',
    });
  });
});
