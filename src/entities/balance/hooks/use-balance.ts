import { useQuery } from "@tanstack/react-query"
import { getBalance } from "../api/get-balance"

export const useBalance = (currencyId?: number) => {
    return useQuery({
        queryKey: ['balance', currencyId],
        queryFn: () => getBalance(currencyId),
        enabled: !!currencyId
    })
}