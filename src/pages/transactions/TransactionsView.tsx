// https://api.funds-flow.ru/v1/transaction/get-by-filter
import { MainActions } from '@/pages/transactions/components/actions/MainActions'
import './transactions.css'
import { Filters } from './components/filters/Filters'

const transactions = [
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

const mockTransactions = [...transactions, ...transactions, ...transactions, ...transactions, ...transactions]

const tableHead = ["дата", "категория", "сумма", "счёт", "создатель", "описание", "действия"]

export const TransactionsView = () => {
    const tableItems = mockTransactions.map((row, i) =>
        <tr key={row.id + i.toString()}>
            <td>{row.created_at}</td>
            <td>{row.category.name}</td>
            <td>{row.amount}</td>
            <td>{row.account.name}</td>
            <td>{row.user_name}</td>
            <td>{row.comment}</td>
            <td>
                <span>edit</span>
                <span>delete</span>
            </td>
        </tr>
    )
    return (
        <>
            <div className='transactions-view'>
                <div className='transactions-wrapper'>

                    <MainActions />
                    <table className="transactions-table">
                        <thead>
                            <tr>
                                {tableHead.map(h => <th key={h}>{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {tableItems}
                        </tbody>
                    </table>
                </div>
                <Filters />
            </div>
        </>
    )
}