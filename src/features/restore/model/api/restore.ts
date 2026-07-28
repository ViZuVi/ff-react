import { api } from "@/shared/api/axios";
import type { RestoreFormData } from "../resore.schema";

export const restore = async (
  dto: RestoreFormData,
): Promise<{ status: "success" | "error" }> => {
  const { data } = await api.post("/profile/password/change", dto);
  return data;
};
