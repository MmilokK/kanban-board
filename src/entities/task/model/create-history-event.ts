import type { TaskHistoryEvent } from './task-history';

type HistoryEventInput = TaskHistoryEvent extends infer Event
  ? Event extends TaskHistoryEvent
    ? Omit<Event, 'id' | 'createdAt'>
    : never
  : never;

export function createTaskHistoryEvent(
  input: HistoryEventInput,
  id: string,
  createdAt: string,
): TaskHistoryEvent {
  return {
    ...input,
    id,
    createdAt,
  } as TaskHistoryEvent;
}
