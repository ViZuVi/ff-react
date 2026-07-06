import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Некорректный email"),
  username: z
    .string()
    .min(2, "Поле должно содержать минимум 2 символа")
    .max(100, "Слишком много символов"),
  password: z.string().min(4, "Пароль должен содержать минимум 4 символа"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
