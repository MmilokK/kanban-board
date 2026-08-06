import { getLocalDateValue, getTaskDueStatus } from '../../../entities/task/model/task-due-date';
import type { Task, TaskPriority } from '../../../entities/task/model/types';

export type TaskPriorityFilter = 'all' | TaskPriority;
export type TaskDueFilter = 'all' | 'overdue' | 'today' | 'upcoming' | 'without-date';

export type TaskSort = 'manual' | 'newest' | 'oldest' | 'title-asc' | 'priority-desc' | 'due-asc';

export type TaskFilterState = {
  query: string;
  priority: TaskPriorityFilter;
  tag: string;
  dueDate: TaskDueFilter;
  sort: TaskSort;
};

export const DEFAULT_TASK_FILTERS: TaskFilterState = {
  query: '',
  priority: 'all',
  tag: '',
  dueDate: 'all',
  sort: 'manual',
};

const PRIORITY_WEIGHT: Record<TaskPriority, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

type TaskFilterContext = {
  isCompletedColumn: boolean;
  today?: string;
};

function normalizeText(value: string): string {
  return value.trim().toLocaleLowerCase();
}

function taskMatchesQuery(task: Task, query: string): boolean {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return true;
  }

  const searchableValues = [task.title, task.description, ...task.tags];

  return searchableValues.some((value) => normalizeText(value).includes(normalizedQuery));
}

function taskMatchesPriority(task: Task, priority: TaskPriorityFilter): boolean {
  return priority === 'all' || task.priority === priority;
}

function taskMatchesTag(task: Task, tag: string): boolean {
  const normalizedTag = normalizeText(tag);

  if (!normalizedTag) {
    return true;
  }

  return task.tags.some((taskTag) => normalizeText(taskTag) === normalizedTag);
}

function taskMatchesDueDate(
  task: Task,
  dueFilter: TaskDueFilter,
  context: TaskFilterContext,
): boolean {
  if (dueFilter === 'all') {
    return true;
  }

  if (dueFilter === 'without-date') {
    return task.dueDate === null;
  }

  const status = getTaskDueStatus(
    task.dueDate,
    context.isCompletedColumn,
    context.today ?? getLocalDateValue(),
  );

  switch (dueFilter) {
    case 'overdue':
      return status === 'overdue';

    case 'today':
      return status === 'today';

    case 'upcoming':
      return status === 'upcoming';
  }
}

function compareTasks(firstTask: Task, secondTask: Task, sort: TaskSort): number {
  switch (sort) {
    case 'newest':
      return secondTask.createdAt.localeCompare(firstTask.createdAt);

    case 'oldest':
      return firstTask.createdAt.localeCompare(secondTask.createdAt);

    case 'title-asc':
      return firstTask.title.localeCompare(secondTask.title, 'ru', {
        sensitivity: 'base',
      });

    case 'priority-desc':
      return PRIORITY_WEIGHT[secondTask.priority] - PRIORITY_WEIGHT[firstTask.priority];

    case 'due-asc': {
      if (firstTask.dueDate === null && secondTask.dueDate === null) {
        return 0;
      }

      if (firstTask.dueDate === null) {
        return 1;
      }

      if (secondTask.dueDate === null) {
        return -1;
      }

      return firstTask.dueDate.localeCompare(secondTask.dueDate);
    }

    case 'manual':
      return 0;
  }
}

export function filterAndSortTasks(
  tasks: Task[],
  filters: TaskFilterState,
  context: TaskFilterContext,
): Task[] {
  const filteredTasks = tasks.filter(
    (task) =>
      taskMatchesQuery(task, filters.query) &&
      taskMatchesPriority(task, filters.priority) &&
      taskMatchesTag(task, filters.tag) &&
      taskMatchesDueDate(task, filters.dueDate, context),
  );

  if (filters.sort === 'manual') {
    return filteredTasks;
  }

  return [...filteredTasks].sort((firstTask, secondTask) =>
    compareTasks(firstTask, secondTask, filters.sort),
  );
}

export function getAvailableTaskTags(tasks: Task[]): string[] {
  const tagsByNormalizedValue = new Map<string, string>();

  for (const task of tasks) {
    for (const tag of task.tags) {
      const trimmedTag = tag.trim();

      if (!trimmedTag) {
        continue;
      }

      const normalizedTag = normalizeText(trimmedTag);

      if (!tagsByNormalizedValue.has(normalizedTag)) {
        tagsByNormalizedValue.set(normalizedTag, trimmedTag);
      }
    }
  }

  return [...tagsByNormalizedValue.values()].sort((firstTag, secondTag) =>
    firstTag.localeCompare(secondTag, 'ru', {
      sensitivity: 'base',
    }),
  );
}

export function hasActiveTaskFilters(filters: TaskFilterState): boolean {
  return (
    filters.query.trim() !== '' ||
    filters.priority !== 'all' ||
    filters.tag !== '' ||
    filters.dueDate !== 'all'
  );
}

export function hasModifiedTaskView(filters: TaskFilterState): boolean {
  return hasActiveTaskFilters(filters) || filters.sort !== 'manual';
}
