import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/get-transactions";
import { useSpaceStore } from "@/app/store/space";
import type { TransactionsParams } from "@/shared/types/Filters";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useMemo } from "react";

export const useTransactions = (filters: TransactionsParams) => {
    const debouncedSearch = useDebounce(filters.search, 300);

    const compact = <T extends object>(obj: T) => {
        return Object.fromEntries(
            Object.entries(obj).filter(
                ([, value]) => value !== null && value !== undefined && value !== "" && (!Array.isArray(value) || value.length > 0)
            )
        ) as Partial<T>;
    }

    const cleanedFilters = useMemo(
        () =>
            compact({
                ...filters,
                search: debouncedSearch,
            }),
        [filters, debouncedSearch]
    );

    const currentSpaceId = useSpaceStore((s) => s.currentSpaceId)

    return useQuery({
        queryKey: ['transactions', currentSpaceId, cleanedFilters],
        enabled: currentSpaceId != null,
        queryFn: ({ queryKey }) => {
            const [, , params] = queryKey

            return getTransactions(
                params as Partial<TransactionsParams>
            )
        },
    });
}