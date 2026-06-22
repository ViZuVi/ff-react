import { useSpaceStore } from "@/app/store/space"
import { api } from "@/shared/api/axios"
import type { ApiResponse } from "@/shared/types/ApiResponse"
import type { Currency } from "@/shared/types/Currency"

type BalanceAmount = {
    currency: Currency
    total: number
}

type Resp = {
    'amount-by-currency': BalanceAmount[]
    'total-amount': BalanceAmount
}

type Balance = {
    amountByCurrency: BalanceAmount[]
    totalAmount: BalanceAmount
}

export const getBalance = async (currencyId?: number): Promise<Balance> => {
    const storedCurr = localStorage.getItem('currency')

    const selectedCurrency =
        currencyId ?? Number(storedCurr);

    const currentSpaceId = useSpaceStore.getState().currentSpaceId

    const { data } = await api.post<ApiResponse<Resp>>(`/space/${currentSpaceId}/balance`, { currency_id: selectedCurrency })
    return {
        amountByCurrency: data.data['amount-by-currency'],
        totalAmount: data.data['total-amount'],
    }
}
