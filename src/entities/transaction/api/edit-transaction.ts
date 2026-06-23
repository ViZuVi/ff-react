import { api } from "@/shared/api/axios";
import type { CreateTransaction } from "@/shared/types/TransactionDraft";

export const editTransaction = async ({
  id,
  transaction,
}: {
  id: number;
  transaction: CreateTransaction;
}) => {
  const { data } = await api.put(`/transaction/${id}/edit`, transaction);
  return data;
};
