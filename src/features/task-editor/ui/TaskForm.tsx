import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';

import type { Task } from '../../../entities/task/model/types';

import { getTaskFormDefaultValues, taskFormSchema, type TaskFormValues } from '../model/task-form';

import styles from './TaskForm.module.scss';

type TaskFormProps = {
  task: Task | null;
  submitLabel: string;
  onSubmit: (values: TaskFormValues) => void;
  onCancel: () => void;
};

export function TaskForm({ task, submitLabel, onSubmit, onCancel }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    mode: 'onBlur',
    defaultValues: getTaskFormDefaultValues(task),
  });

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="task-title">
          Название
        </label>

        <input
          {...register('title')}
          autoFocus
          className={clsx(styles.control, {
            [styles.controlError]: errors.title,
          })}
          id="task-title"
          maxLength={80}
          type="text"
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

        <select {...register('priority')} className={styles.control} id="task-priority">
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

      <div className={styles.actions}>
        <button className={styles.cancelButton} type="button" onClick={onCancel}>
          Отмена
        </button>

        <button className={styles.submitButton} disabled={isSubmitting} type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
