export type TaskDueStatus = 'none' | 'overdue' | 'today' | 'upcoming' | 'completed';

const DATE_VALUE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isValidDateValue(value: string): boolean {
  if (!DATE_VALUE_PATTERN.test(value)) {
    return false;
  }

  const [yearText, monthText, dayText] = value.split('-');

  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);

  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function padDatePart(value: number): string {
  return value.toString().padStart(2, '0');
}

export function getLocalDateValue(date = new Date()): string {
  return [date.getFullYear(), padDatePart(date.getMonth() + 1), padDatePart(date.getDate())].join(
    '-',
  );
}

export function getTaskDueStatus(
  dueDate: string | null,
  isCompletedColumn: boolean,
  today = getLocalDateValue(),
): TaskDueStatus {
  if (!dueDate) {
    return 'none';
  }

  if (isCompletedColumn) {
    return 'completed';
  }

  if (dueDate < today) {
    return 'overdue';
  }

  if (dueDate === today) {
    return 'today';
  }

  return 'upcoming';
}

export function formatTaskDueDate(dueDate: string): string {
  if (!isValidDateValue(dueDate)) {
    return dueDate;
  }

  const [year, month, day] = dueDate.split('-');

  return `${day}.${month}.${year}`;
}
