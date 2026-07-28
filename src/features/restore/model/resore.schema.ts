import { z } from "zod";

export const restoreSchema = z
  .object({
    email: z.email("Некорректный email"),
    code: z.number().nullable(),
    password: z.string().min(4, "Пароль должен содержать минимум 4 символа"),
    password_confirmation: z
      .string()
      .min(4, "Пароль должен содержать минимум 4 символа"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Пароли не совпадают",
    path: ["password_confirmation"],
  });

export type RestoreFormData = z.infer<typeof restoreSchema>;
