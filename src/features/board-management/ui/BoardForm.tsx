import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { boardFormSchema, type BoardFormValues } from '../model/board-form';

import styles from './BoardForm.module.scss';

type BoardFormProps = {
  defaultValues: BoardFormValues;
  submitLabel: string;
  onSubmit: (values: BoardFormValues) => void;
  onCancel: () => void;
};

export function BoardForm({ defaultValues, submitLabel, onSubmit, onCancel }: BoardFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BoardFormValues>({
    resolver: zodResolver(boardFormSchema),
    defaultValues,
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label htmlFor="board-form-title">Название</label>

        <input
          id="board-form-title"
          type="text"
          autoFocus
          aria-invalid={errors.title ? 'true' : 'false'}
          aria-describedby={errors.title ? 'board-form-title-error' : undefined}
          {...register('title')}
        />

        {errors.title && (
          <p id="board-form-title-error" className={styles.error} role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onCancel}>
          Отмена
        </button>

        <button type="submit" disabled={isSubmitting}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
