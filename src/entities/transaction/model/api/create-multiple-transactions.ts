import { api } from "@/shared/api/axios";
import type { CreateTransactionDto } from "@/entities/transaction/model/types";

export const createMultipleTransactions = async (
  transactions: CreateTransactionDto[],
) => {
  const { data } = await api.post(`/transaction/create-many`, { transactions });
  console.log(data);

  return data;
};
