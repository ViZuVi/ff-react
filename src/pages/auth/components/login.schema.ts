import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Некорректный email"),
  password: z.string().min(4, "Пароль должен содержать минимум 4 символа"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
