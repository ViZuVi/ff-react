import { api } from "@/shared/api/axios";
import type { CreateTransactionDto } from "@/entities/transaction/model/types";

export const createTransaction = async (transaction: CreateTransactionDto) => {
  const { data } = await api.post(`/transaction`, transaction);
  return data;
};
