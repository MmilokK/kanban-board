import type {
  TaskDueFilter,
  TaskFilterState,
  TaskPriorityFilter,
  TaskSort,
} from '../model/task-filter';
import styles from './TaskFilters.module.scss';

type TaskFiltersProps = {
  value: TaskFilterState;
  availableTags: string[];
  visibleTaskCount: number;
  totalTaskCount: number;
  onChange: (value: TaskFilterState) => void;
  onReset: () => void;
};

export function TaskFilters({
  value,
  availableTags,
  visibleTaskCount,
  totalTaskCount,
  onChange,
  onReset,
}: TaskFiltersProps) {
  const isResetDisabled =
    value.query === '' &&
    value.priority === 'all' &&
    value.tag === '' &&
    value.dueDate === 'all' &&
    value.sort === 'manual';

  return (
    <section className={styles.filters} aria-labelledby="task-filters-title">
      <div className={styles.heading}>
        <h2 id="task-filters-title">Задачи</h2>

        <p className={styles.counter} aria-live="polite">
          Показано {visibleTaskCount} из {totalTaskCount}
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.field}>
          <label htmlFor="task-search">Поиск</label>

          <input
            id="task-search"
            type="search"
            value={value.query}
            placeholder="Название, описание или тег"
            onChange={(event) => {
              onChange({
                ...value,
                query: event.currentTarget.value,
              });
            }}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="task-priority-filter">Приоритет</label>

          <select
            id="task-priority-filter"
            value={value.priority}
            onChange={(event) => {
              onChange({
                ...value,
                priority: event.currentTarget.value as TaskPriorityFilter,
              });
            }}
          >
            <option value="all">Все приоритеты</option>

            <option value="high">Высокий</option>

            <option value="medium">Средний</option>

            <option value="low">Низкий</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="task-tag-filter">Тег</label>

          <select
            id="task-tag-filter"
            value={value.tag}
            onChange={(event) => {
              onChange({
                ...value,
                tag: event.currentTarget.value,
              });
            }}
          >
            <option value="">Все теги</option>

            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="task-due-filter">Срок</label>

          <select
            id="task-due-filter"
            value={value.dueDate}
            onChange={(event) => {
              onChange({
                ...value,
                dueDate: event.currentTarget.value as TaskDueFilter,
              });
            }}
          >
            <option value="all">Все сроки</option>

            <option value="overdue">Просроченные</option>

            <option value="today">На сегодня</option>

            <option value="upcoming">Предстоящие</option>

            <option value="without-date">Без срока</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="task-sort">Сортировка</label>

          <select
            id="task-sort"
            value={value.sort}
            onChange={(event) => {
              onChange({
                ...value,
                sort: event.currentTarget.value as TaskSort,
              });
            }}
          >
            <option value="manual">Ручной порядок</option>

            <option value="newest">Сначала новые</option>

            <option value="oldest">Сначала старые</option>

            <option value="title-asc">По названию</option>

            <option value="priority-desc">По приоритету</option>

            <option value="due-asc">По ближайшему сроку</option>
          </select>
        </div>

        <button
          type="button"
          className={styles.resetButton}
          disabled={isResetDisabled}
          onClick={onReset}
        >
          Сбросить
        </button>
      </div>
    </section>
  );
}
