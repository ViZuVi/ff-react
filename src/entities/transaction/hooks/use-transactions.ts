import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactions } from "../api/get-transactions";
import { useSpaceStore } from "@/entities/space/model/space";
import type { TransactionsParams } from "@/shared/types/Filters";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useMemo } from "react";
import { createTransaction } from "../api/create-transaction";
import { editTransaction } from "../api/edit-transaction";
import { deleteTransaction } from "../api/delete-transaction";
import type { TransactionDraft } from "@/shared/types/TransactionDraft";

const useInvalidateTransactionQueries = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
    queryClient.invalidateQueries({ queryKey: ["balance"] });
  };
};

export const useTransactions = (filters: TransactionsParams) => {
  const debouncedSearch = useDebounce(filters.search, 300);

  const compact = <T extends object>(obj: T) => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([, value]) =>
          value !== null &&
          value !== undefined &&
          value !== "" &&
          (!Array.isArray(value) || value.length > 0),
      ),
    ) as Partial<T>;
  };

  const cleanedFilters = useMemo(
    () =>
      compact({
        ...filters,
        search: debouncedSearch,
      }),
    [filters, debouncedSearch],
  );

  const currentSpaceId = useSpaceStore((s) => s.currentSpaceId);

  return useQuery({
    queryKey: ["transactions", currentSpaceId, cleanedFilters],
    enabled: currentSpaceId != null,
    // placeholderData: keepPreviousData,
    queryFn: ({ queryKey }) => {
      const [, , params] = queryKey;

      return getTransactions(params as Partial<TransactionsParams>);
    },
  });
};

export const useCreateTransaction = () => {
  const invalidate = useInvalidateTransactionQueries();

  return useMutation({
    mutationFn: async (transactions: TransactionDraft[]) => {
      const payload = transactions.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ localId, ...transaction }) => transaction,
      );

      const results = await Promise.allSettled(
        payload.map((tx) => createTransaction(tx)),
      );

      const success = [];
      const errors = [];

      for (const result of results) {
        if (result.status === "fulfilled") {
          success.push(result.value.data);
        } else {
          errors.push(result.reason);
        }
      }

      return { success, errors };
    },
    onSuccess: invalidate,
  });
};

export const useEditTransaction = () => {
  const invalidate = useInvalidateTransactionQueries();

  return useMutation({
    mutationFn: editTransaction,
    onSuccess: invalidate,
  });
};

export const useDeleteTransaction = () => {
  const invalidate = useInvalidateTransactionQueries();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: invalidate,
  });
};
