import { api } from "@/shared/api/axios";

export const deleteTransaction = async (id: number) => {
  const { data } = await api.delete(`/transaction/${id}/delete`);
  return data;
};
