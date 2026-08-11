import type { Subtask } from './types';

export type SubtaskProgress = {
  completed: number;
  total: number;
  percentage: number;
  isCompleted: boolean;
};

export function getSubtaskProgress(subtasks: Subtask[]): SubtaskProgress {
  const total = subtasks.length;

  const completed = subtasks.filter((subtask) => subtask.isCompleted).length;

  const percentage = !total ? 0 : Math.round((completed / total) * 100);

  return {
    completed,
    total,
    percentage,
    isCompleted: total > 0 && completed === total,
  };
}
