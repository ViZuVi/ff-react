import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/get-transactions";
import { useSpaceStore } from "@/app/store/space";
import type { TransactionsParams } from "@/shared/types/Filters";

export const useTransactions = (filters: TransactionsParams) => {
    const currentSpaceId = useSpaceStore((s) => s.currentSpaceId)
    return useQuery({
        queryKey: ['transactions', currentSpaceId, JSON.stringify(filters)],
        enabled: !!currentSpaceId,
        queryFn: () => getTransactions(filters),
    })
}