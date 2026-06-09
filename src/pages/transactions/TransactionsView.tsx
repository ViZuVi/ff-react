// https://api.funds-flow.ru/v1/transaction/get-by-filter
import { MainActions } from '@/pages/transactions/components/actions/MainActions'
import './transactions.css'
import { Filters } from './components/filters/Filters'
import { TransactionsTable } from './components/table/TransactionsTable'
import type { Transaction } from '@/shared/types/TransactionDraft'

const transactions: Transaction[] = [
    {
        "id": 4074,
        "created_at": "2026-04-30 22:32:39",
        "type": {
            "id": 0,
            "name": "INCOME"
        },
        "category": {
            "id": 50,
            "name": "Зарплата"
        },
        "account": {
            "id": 22,
            "name": "Цифра-банк"
        },
        "user_name": "Рашид",
        "comment": "",
        "amount": "109598.00",
        "editable": true
    },
    {
        "id": 4073,
        "created_at": "2026-04-30 22:32:16",
        "type": {
            "id": 0,
            "name": "INCOME"
        },
        "category": {
            "id": 50,
            "name": "Зарплата"
        },
        "account": {
            "id": 22,
            "name": "Цифра-банк"
        },
        "user_name": "Рашид",
        "comment": "",
        "amount": "4764.00",
        "editable": true
    },
    {
        "id": 4072,
        "created_at": "2026-04-29 20:12:18",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "category": {
            "id": 99,
            "name": "Коррекция счета"
        },
        "account": {
            "id": 47,
            "name": "Т-банк Зухра"
        },
        "user_name": "Zukhra",
        "comment": "",
        "amount": "2256.00",
        "editable": true
    },
    {
        "id": 4071,
        "created_at": "2026-04-29 20:11:25",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "category": {
            "id": 59,
            "name": "Продукты"
        },
        "account": {
            "id": 47,
            "name": "Т-банк Зухра"
        },
        "user_name": "Zukhra",
        "comment": "Пятёрочка + хлеб",
        "amount": "1312.00",
        "editable": true
    }
]

const mockTransactions = [
    ...transactions,
    ...transactions.map((x) => ({ ...x, id: x.id * 2 })),
    ...transactions.map((x) => ({ ...x, id: x.id * 3 })),
    ...transactions.map((x) => ({ ...x, id: x.id * 4 })),
    ...transactions.map((x) => ({ ...x, id: x.id * 5 }))]

export const TransactionsView = () => {
    return (
        <div className='transactions-view'>
            <div className='transactions-wrapper'>

                <MainActions />
                <TransactionsTable rows={mockTransactions} />
            </div>
            <Filters />
        </div>
    )
}