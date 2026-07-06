import { api } from "@/shared/api/axios";
import type { CategoryCreate } from "@/entities/category";

export const createCategory = async (
  cat: CategoryCreate & { space_id: string },
) => {
  const { data } = await api.post("/category", cat);
  return data;
};
