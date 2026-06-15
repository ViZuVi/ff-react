import { api } from "@/shared/api/axios"
import type { ApiRespons } from "@/shared/types/ApiRespons"
import type { Filters } from "@/shared/types/Filters"
import type { Transaction } from "@/shared/types/TransactionDraft"

export const getTransactions = async (filters: Filters): Promise<ApiRespons<Transaction>> => {
    const { data } = await api.post('transaction/get-by-filter', filters)
    return data
}