import type { TaskHistoryEvent } from './task-history';

function formatPriority(priority: 'low' | 'medium' | 'high'): string {
  switch (priority) {
    case 'low':
      return 'Низкий';

    case 'medium':
      return 'Средний';

    case 'high':
      return 'Высокий';
  }
}

export function formatTaskHistoryEvent(event: TaskHistoryEvent): string {
  switch (event.type) {
    case 'task-created':
      return 'Задача создана';

    case 'task-moved':
      return `Задача перемещена: ${event.fromColumn.title} → ${event.toColumn.title}`;

    case 'task-archived':
      return `Задача перемещена в архив из «${event.fromColumn.title}»`;

    case 'task-restored':
      return `Задача восстановлена в «${event.toColumn.title}»`;

    case 'subtask-added':
      return `Добавлена подзадача «${event.title}»`;

    case 'subtask-completed':
      return `Подзадача «${event.title}» выполнена`;

    case 'subtask-reopened':
      return `Подзадача «${event.title}» снова открыта`;

    case 'subtask-deleted':
      return `Подзадача «${event.title}» удалена`;

    case 'subtask-updated':
      return 'Подзадача изменена';

    case 'comment-added':
      return 'Добавлен комментарий';

    case 'comment-updated':
      return 'Комментарий изменён';

    case 'comment-deleted':
      return 'Комментарий удалён';

    case 'task-updated': {
      const parts: string[] = [];

      if (event.changes.title) {
        parts.push(`Название: «${event.changes.title.from}» → «${event.changes.title.to}»`);
      }

      if (event.changes.priority) {
        parts.push(
          `Приоритет: ${formatPriority(event.changes.priority.from)} → ${formatPriority(
            event.changes.priority.to,
          )}`,
        );
      }

      if (event.changes.dueDate) {
        parts.push('Изменён дедлайн');
      }

      if (event.changes.tags) {
        parts.push('Изменены теги');
      }

      if (event.changes.description) {
        parts.push('Изменено описание');
      }

      return parts.length > 0 ? parts.join('; ') : 'Задача изменена';
    }
  }
}
