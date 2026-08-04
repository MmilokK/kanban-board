import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { columnFormSchema, type ColumnFormValues } from '../model/column-form';

import styles from './ColumnForm.module.scss';

type ColumnFormProps = {
  defaultValues: ColumnFormValues;
  submitLabel: string;
  onSubmit: (values: ColumnFormValues) => void;
  onCancel: () => void;
};

export function ColumnForm({ defaultValues, submitLabel, onSubmit, onCancel }: ColumnFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ColumnFormValues>({
    resolver: zodResolver(columnFormSchema),
    defaultValues,
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label htmlFor="column-form-title">Название</label>

        <input
          id="column-form-title"
          type="text"
          autoFocus
          aria-invalid={errors.title ? 'true' : 'false'}
          aria-describedby={errors.title ? 'column-form-title-error' : undefined}
          {...register('title')}
        />

        {errors.title && (
          <p id="column-form-title-error" className={styles.error} role="alert">
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
