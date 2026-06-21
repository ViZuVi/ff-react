import { api } from "@/shared/api/axios"
import type { AccountCreate } from "@/shared/types/Account"

export const createAccount = async (acc: AccountCreate) => {
    const { data } = await api.post('/account', acc)
    return data
}