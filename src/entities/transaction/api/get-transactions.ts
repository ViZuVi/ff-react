import { api } from "@/shared/api/axios";
import type { TransactionsParams } from "@/shared/types/Filters";

type TransactionsRequest = Partial<TransactionsParams>;

export const getTransactions = async (params: TransactionsRequest) => {
  const { data } = await api.post("transaction/get-by-filter", params);
  return data;
};
