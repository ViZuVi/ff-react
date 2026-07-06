import { api } from "@/shared/api/axios";
import type { UpdateTransactionDto } from "@/entities/transaction/model/types";

export const editTransaction = async ({
  id,
  transaction,
}: {
  id: number;
  transaction: UpdateTransactionDto;
}) => {
  const { data } = await api.put(`/transaction/${id}/edit`, transaction);
  return data;
};
