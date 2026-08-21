import { describe, expect, it } from 'vitest';
import type { Task } from '../../../entities/task/model/types';
import {
  DEFAULT_TASK_FILTERS,
  filterAndSortTasks,
  getAvailableTaskTags,
  hasActiveTaskFilters,
  hasModifiedTaskView,
  type TaskFilterState,
} from './task-filter';

const tasks: Task[] = [
  {
    id: 'task-medium',
    title: 'Написать документацию',
    description: 'Описать работу приложения',
    priority: 'medium',
    tags: ['Работа', 'Документация'],
    subtasks: [],
    comments: [],
    history: [],
    dueDate: '2026-08-05',
    createdAt: '2026-08-02T10:00:00.000Z',
    updatedAt: '2026-08-02T10:00:00.000Z',
    archivedAt: null,
  },
  {
    id: 'task-high',
    title: 'Исправить ошибку',
    description: 'Проверить drag and drop',
    priority: 'high',
    tags: ['Работа', 'Bug'],
    subtasks: [],
    comments: [],
    history: [],
    dueDate: '2026-08-06',
    createdAt: '2026-08-04T10:00:00.000Z',
    updatedAt: '2026-08-04T10:00:00.000Z',
    archivedAt: null,
  },
  {
    id: 'task-low',
    title: 'Купить кофе',
    description: 'Зайти в магазин',
    priority: 'low',
    tags: ['Личное'],
    subtasks: [],
    comments: [],
    history: [],
    dueDate: '2026-08-07',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
    archivedAt: null,
  },
];

function createFilters(overrides: Partial<TaskFilterState> = {}): TaskFilterState {
  return {
    ...DEFAULT_TASK_FILTERS,
    ...overrides,
  };
}

describe('Фильтрация и сортировка задач', () => {
  it('сохраняет ручной порядок без фильтров', () => {
    expect(
      filterAndSortTasks(tasks, DEFAULT_TASK_FILTERS, { isCompletedColumn: false }).map(
        (task) => task.id,
      ),
    ).toEqual(['task-medium', 'task-high', 'task-low']);
  });

  it('ищет по названию без учёта регистра', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        query: 'ОШИБКУ',
      }),
      { isCompletedColumn: false },
    );

    expect(result.map((task) => task.id)).toEqual(['task-high']);
  });

  it('ищет по описанию', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        query: 'магазин',
      }),
      { isCompletedColumn: false },
    );

    expect(result.map((task) => task.id)).toEqual(['task-low']);
  });

  it('ищет по тегам', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        query: 'bug',
      }),
      { isCompletedColumn: false },
    );

    expect(result.map((task) => task.id)).toEqual(['task-high']);
  });

  it('фильтрует по приоритету', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        priority: 'medium',
      }),
      { isCompletedColumn: false },
    );

    expect(result.map((task) => task.id)).toEqual(['task-medium']);
  });

  it('фильтрует по тегу без учёта регистра', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        tag: 'работа',
      }),
      { isCompletedColumn: false },
    );

    expect(result.map((task) => task.id)).toEqual(['task-medium', 'task-high']);
  });

  it('одновременно применяет несколько фильтров', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        query: 'работ',
        priority: 'high',
        tag: 'Bug',
      }),
      { isCompletedColumn: false },
    );

    expect(result.map((task) => task.id)).toEqual(['task-high']);
  });

  it('сортирует от новых задач к старым', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        sort: 'newest',
      }),
      { isCompletedColumn: false },
    );

    expect(result.map((task) => task.id)).toEqual(['task-high', 'task-medium', 'task-low']);
  });

  it('сортирует от старых задач к новым', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        sort: 'oldest',
      }),
      { isCompletedColumn: false },
    );

    expect(result.map((task) => task.id)).toEqual(['task-low', 'task-medium', 'task-high']);
  });

  it('сортирует задачи по названию', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        sort: 'title-asc',
      }),
      { isCompletedColumn: false },
    );

    expect(result.map((task) => task.title)).toEqual([
      'Исправить ошибку',
      'Купить кофе',
      'Написать документацию',
    ]);
  });

  it('сортирует задачи по убыванию приоритета', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        sort: 'priority-desc',
      }),
      { isCompletedColumn: false },
    );

    expect(result.map((task) => task.priority)).toEqual(['high', 'medium', 'low']);
  });

  it('не изменяет исходный массив при сортировке', () => {
    const originalOrder = tasks.map((task) => task.id);

    filterAndSortTasks(
      tasks,
      createFilters({
        sort: 'newest',
      }),
      { isCompletedColumn: false },
    );

    expect(tasks.map((task) => task.id)).toEqual(originalOrder);
  });

  it('возвращает уникальные отсортированные теги', () => {
    const tasksWithDuplicateTag: Task[] = [
      ...tasks,
      {
        ...tasks[0]!,
        id: 'task-copy',
        tags: ['работа', 'Новый тег'],
      },
    ];

    expect(getAvailableTaskTags(tasksWithDuplicateTag)).toEqual([
      'Документация',
      'Личное',
      'Новый тег',
      'Работа',
      'Bug',
    ]);
  });

  it('определяет наличие активных фильтров', () => {
    expect(hasActiveTaskFilters(DEFAULT_TASK_FILTERS)).toBe(false);

    expect(
      hasActiveTaskFilters(
        createFilters({
          query: 'задача',
        }),
      ),
    ).toBe(true);
  });

  it('считает сортировку изменением представления', () => {
    expect(
      hasModifiedTaskView(
        createFilters({
          sort: 'newest',
        }),
      ),
    ).toBe(true);
  });

  it('фильтрует просроченные задачи', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        dueDate: 'overdue',
      }),
      {
        isCompletedColumn: false,
        today: '2026-08-06',
      },
    );

    expect(result.map((task) => task.id)).toEqual(['task-medium']);
  });

  it('не считает задачи завершённой колонки просроченными', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        dueDate: 'overdue',
      }),
      {
        isCompletedColumn: true,
        today: '2026-08-06',
      },
    );

    expect(result).toEqual([]);
  });

  it('фильтрует задачи на сегодня', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        dueDate: 'today',
      }),
      {
        isCompletedColumn: false,
        today: '2026-08-06',
      },
    );

    expect(result.map((task) => task.id)).toEqual(['task-high']);
  });

  it('фильтрует задачи без срока', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        dueDate: 'without-date',
      }),
      {
        isCompletedColumn: false,
        today: '2026-08-06',
      },
    );

    expect(result.every((task) => task.dueDate === null)).toBe(true);
  });

  it('сортирует задачи по ближайшему сроку', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        sort: 'due-asc',
      }),
      {
        isCompletedColumn: false,
        today: '2026-08-06',
      },
    );

    expect(result.map((task) => task.dueDate)).toEqual(['2026-08-05', '2026-08-06', '2026-08-07']);
  });
});
