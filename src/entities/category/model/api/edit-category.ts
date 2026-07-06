import { api } from "@/shared/api/axios";
import type { CategoryCreate } from "@/entities/category";

export const editCategory = async (cat: CategoryCreate & { id: number }) => {
  const { data } = await api.put(`/category/${cat.id}/edit`, {
    name: cat.name,
    type: cat.type,
  });
  return data;
};
