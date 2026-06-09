import type { Currency } from "./Currency"

export type Account = {
    id: number
    created_at: string
    name: string
    currency: Currency
    balance: string
}