import { z } from 'zod';

import { COLUMN_TITLE_MAX_LENGTH } from '../../../entities/column/model/column-constants';

export const columnFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Введите название колонки')
    .max(
      COLUMN_TITLE_MAX_LENGTH,
      `Название не должно быть длиннее ${COLUMN_TITLE_MAX_LENGTH} символов`,
    ),
});

export type ColumnFormValues = z.infer<typeof columnFormSchema>;

export const EMPTY_COLUMN_FORM_VALUES: ColumnFormValues = {
  title: '',
};
