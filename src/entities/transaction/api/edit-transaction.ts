import { api } from "@/shared/api/axios";
import type { UpdateTransactionDto } from "@/shared/types/TransactionDraft";

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
