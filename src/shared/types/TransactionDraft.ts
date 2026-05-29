type TransactionType = {
    id: 0 | 1
    name: string
}

type CategoryType = {
    id: 0 | 1
    name: string
}

type AccountType = {
    id: 0 | 1
    name: string
}

interface BaseTransaction {
    created_at: string
    amount: number
    comment: string
}

export interface CreateTransaction extends BaseTransaction {
    account_id: number | null
    category_id: number | null
    space_id: number | null
}

export interface Transaction extends BaseTransaction {
    id: number
    account: AccountType
    type: TransactionType
    category: CategoryType
}

export interface TransactionDraft extends CreateTransaction {
    localId: string
    type: number | null
}