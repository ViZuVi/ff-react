import { api } from "@/shared/api/axios"
import type { ApiRespons } from "@/shared/types/ApiRespons";
import type { Currency } from "@/shared/types/Currency";

export const getCurrency = async (): Promise<ApiRespons<Currency[]>> => {
    const { data } = await api.get('/currency/all')
    return data
}