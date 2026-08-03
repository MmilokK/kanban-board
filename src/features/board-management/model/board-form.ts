import { z } from 'zod';

export const BOARD_TITLE_MAX_LENGTH = 80;

export const boardFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Введите название доски')
    .max(
      BOARD_TITLE_MAX_LENGTH,
      `Название не должно быть длиннее ${BOARD_TITLE_MAX_LENGTH} символов`,
    ),
});

export type BoardFormValues = z.infer<typeof boardFormSchema>;

export const EMPTY_BOARD_FORM_VALUES: BoardFormValues = {
  title: '',
};
