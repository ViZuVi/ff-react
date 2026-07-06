import { z } from "zod";
import dayjs from "dayjs";

export const transactionSchema = z.object({
  comment: z
    .string()
    .trim()
    .max(255, "Не должен превышать 255 символов")
    .refine((value) => value.length === 0 || value.length >= 3, {
      message: "Поле должно содержать минимум 3 символа",
    }),

  created_at: z
    .string()
    .refine((value) => dayjs(value, "YYYY-MM-DD HH:mm:ss", true).isValid(), {
      message: "Некорректная дата",
    }),

  amount: z.coerce.number().min(1, "Сумма должна быть больше 0"),

  category_id: z.coerce.number().int().positive("Выберите категорию"),

  account_id: z.coerce.number().int().positive("Выберите счёт"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
