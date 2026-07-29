import { z } from "zod";

export const invitationSchema = z.object({
  email: z.email("Некорректный email"),
  message: z.string(),
});

export type InvitationFormData = z.infer<typeof invitationSchema>;
