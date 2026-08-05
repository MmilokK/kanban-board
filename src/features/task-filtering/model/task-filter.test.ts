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
    createdAt: '2026-08-02T10:00:00.000Z',
    updatedAt: '2026-08-02T10:00:00.000Z',
  },
  {
    id: 'task-high',
    title: 'Исправить ошибку',
    description: 'Проверить drag and drop',
    priority: 'high',
    tags: ['Работа', 'Bug'],
    createdAt: '2026-08-04T10:00:00.000Z',
    updatedAt: '2026-08-04T10:00:00.000Z',
  },
  {
    id: 'task-low',
    title: 'Купить кофе',
    description: 'Зайти в магазин',
    priority: 'low',
    tags: ['Личное'],
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
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
    expect(filterAndSortTasks(tasks, DEFAULT_TASK_FILTERS).map((task) => task.id)).toEqual([
      'task-medium',
      'task-high',
      'task-low',
    ]);
  });

  it('ищет по названию без учёта регистра', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        query: 'ОШИБКУ',
      }),
    );

    expect(result.map((task) => task.id)).toEqual(['task-high']);
  });

  it('ищет по описанию', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        query: 'магазин',
      }),
    );

    expect(result.map((task) => task.id)).toEqual(['task-low']);
  });

  it('ищет по тегам', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        query: 'bug',
      }),
    );

    expect(result.map((task) => task.id)).toEqual(['task-high']);
  });

  it('фильтрует по приоритету', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        priority: 'medium',
      }),
    );

    expect(result.map((task) => task.id)).toEqual(['task-medium']);
  });

  it('фильтрует по тегу без учёта регистра', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        tag: 'работа',
      }),
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
    );

    expect(result.map((task) => task.id)).toEqual(['task-high']);
  });

  it('сортирует от новых задач к старым', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        sort: 'newest',
      }),
    );

    expect(result.map((task) => task.id)).toEqual(['task-high', 'task-medium', 'task-low']);
  });

  it('сортирует от старых задач к новым', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        sort: 'oldest',
      }),
    );

    expect(result.map((task) => task.id)).toEqual(['task-low', 'task-medium', 'task-high']);
  });

  it('сортирует задачи по названию', () => {
    const result = filterAndSortTasks(
      tasks,
      createFilters({
        sort: 'title-asc',
      }),
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
});
