import { api } from "@/shared/api/axios";
import type { CreateTransaction } from "@/shared/types/TransactionDraft";

export const createTransaction = async (transaction: CreateTransaction) => {
  const { data } = await api.post(`/transaction`, transaction);
  return data;
};
