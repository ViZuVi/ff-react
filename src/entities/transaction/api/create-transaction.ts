import { api } from "@/shared/api/axios";
import type { CreateTransactionDto } from "@/shared/types/TransactionDraft";

export const createTransaction = async (transaction: CreateTransactionDto) => {
  const { data } = await api.post(`/transaction`, transaction);
  return data;
};
