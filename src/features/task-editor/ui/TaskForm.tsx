import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { Task } from '../../../entities/task/model/types';
import { getTaskFormDefaultValues, taskFormSchema, type TaskFormValues } from '../model/task-form';
import styles from './TaskForm.module.scss';

type TaskFormProps = {
  task: Task | null;
  submitLabel: string;
  canEdit?: boolean;
  onSubmit: (values: TaskFormValues) => void;
  onCancel: () => void;
};

function areTaskFormValuesEqual(
  first: Readonly<Partial<TaskFormValues>>,
  second: TaskFormValues,
): boolean {
  return (
    first.title === second.title &&
    first.description === second.description &&
    first.priority === second.priority &&
    first.tags === second.tags &&
    first.dueDate === second.dueDate
  );
}

function getTaskFormValuesKey(values: TaskFormValues): string {
  return JSON.stringify(values);
}

export function TaskForm({ task, submitLabel, canEdit = true, onSubmit, onCancel }: TaskFormProps) {
  const serverValues = getTaskFormDefaultValues(task);
  const serverValuesKey = getTaskFormValuesKey(serverValues);

  const [dismissedExternalChangeKey, setDismissedExternalChangeKey] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting, defaultValues },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    mode: 'onBlur',
    defaultValues: serverValues,
  });

  const baseValues = defaultValues ?? serverValues;

  const serverHasChanged = !areTaskFormValuesEqual(baseValues, serverValues);

  const hasExternalChanges =
    canEdit && isDirty && serverHasChanged && dismissedExternalChangeKey !== serverValuesKey;

  useEffect(() => {
    if (isDirty && canEdit) {
      return;
    }

    if (!serverHasChanged) {
      return;
    }

    reset(serverValues);
  }, [
    canEdit,
    isDirty,
    reset,
    serverHasChanged,
    serverValues.description,
    serverValues.dueDate,
    serverValues.priority,
    serverValues.tags,
    serverValues.title,
    serverValues,
  ]);

  function handleLoadExternalChanges(): void {
    setDismissedExternalChangeKey(null);
    reset(serverValues);
  }

  function handleKeepLocalChanges(): void {
    setDismissedExternalChangeKey(serverValuesKey);
  }

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={handleSubmit((values) => {
        if (!canEdit) return;

        onSubmit(values);
      })}
    >
      {hasExternalChanges && (
        <div role="alert">
          <p>Задача была изменена другим пользователем.</p>

          <button type="button" onClick={handleLoadExternalChanges}>
            Загрузить изменения
          </button>

          <button type="button" onClick={handleKeepLocalChanges}>
            Продолжить редактирование
          </button>
        </div>
      )}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="task-title">
          Название
        </label>

        <input
          {...register('title')}
          autoFocus={canEdit}
          className={clsx(styles.control, {
            [styles.controlError]: errors.title,
          })}
          id="task-title"
          maxLength={80}
          type="text"
          readOnly={!canEdit}
          aria-describedby={errors.title ? 'task-title-error' : undefined}
          aria-invalid={Boolean(errors.title)}
        />

        {errors.title && (
          <p className={styles.error} id="task-title-error" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="task-description">
          Описание
        </label>

        <textarea
          {...register('description')}
          className={clsx(styles.control, styles.textarea, {
            [styles.controlError]: errors.description,
          })}
          id="task-description"
          maxLength={500}
          rows={5}
          readOnly={!canEdit}
          aria-describedby={errors.description ? 'task-description-error' : undefined}
          aria-invalid={Boolean(errors.description)}
        />

        {errors.description && (
          <p className={styles.error} id="task-description-error" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="task-priority">
          Приоритет
        </label>

        <select
          {...register('priority')}
          className={styles.control}
          id="task-priority"
          disabled={!canEdit}
        >
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="task-tags">
          Теги
        </label>

        <input
          {...register('tags')}
          className={clsx(styles.control, {
            [styles.controlError]: errors.tags,
          })}
          id="task-tags"
          maxLength={120}
          placeholder="React, TypeScript, CSS"
          type="text"
          readOnly={!canEdit}
          aria-describedby={errors.tags ? 'task-tags-hint task-tags-error' : 'task-tags-hint'}
          aria-invalid={Boolean(errors.tags)}
        />

        <p className={styles.hint} id="task-tags-hint">
          Укажи до пяти тегов через запятую
        </p>

        {errors.tags && (
          <p className={styles.error} id="task-tags-error" role="alert">
            {errors.tags.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="task-due-date">
          Срок выполнения
        </label>

        <input
          {...register('dueDate')}
          className={styles.control}
          id="task-due-date"
          type="date"
          disabled={!canEdit}
          aria-invalid={errors.dueDate ? 'true' : 'false'}
          aria-describedby={errors.dueDate ? 'task-due-date-error' : undefined}
        />

        {errors.dueDate && (
          <p id="task-due-date-error" className={styles.error} role="alert">
            {errors.dueDate.message}
          </p>
        )}
      </div>

      <div className={styles.actions}>
        <button className={styles.cancelButton} type="button" onClick={onCancel}>
          {canEdit ? 'Отмена' : 'Закрыть'}
        </button>

        {canEdit && (
          <button className={styles.submitButton} disabled={isSubmitting} type="submit">
            {submitLabel}
          </button>
        )}
      </div>
    </form>
  );
}
