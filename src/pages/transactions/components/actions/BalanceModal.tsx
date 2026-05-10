import { UModal } from "@/shared/components/ui/Modal/Modal"

interface props {
    open: boolean;
    onClose: () => void;
}
// https://api.funds-flow.ru/v1/space/1/balance POST payload: currency_id: "7"

const mockAccounts = [
    {
        "id": 22,
        "created_at": "2023-09-10 22:45:52",
        "name": "Цифра-банк",
        "currency": {
            "id": 7,
            "name": "Русский рубль",
            "code": "RUB",
            "deleted_at": null,
            "rate": "99.0000",
            "symbol": "RUB"
        },
        "balance": "193583.00"
    },
    {
        "id": 26,
        "created_at": "2023-09-10 22:50:42",
        "name": "Доллары",
        "currency": {
            "id": 9,
            "name": "Доллар США",
            "code": "USD",
            "deleted_at": null,
            "rate": "1.0000",
            "symbol": "$"
        },
        "balance": "7500.00"
    },
    {
        "id": 47,
        "created_at": "2023-10-03 18:05:47",
        "name": "Т-банк Зухра",
        "currency": {
            "id": 7,
            "name": "Русский рубль",
            "code": "RUB",
            "deleted_at": null,
            "rate": "99.0000",
            "symbol": "RUB"
        },
        "balance": "8777.00"
    },
    {
        "id": 54,
        "created_at": "2023-10-22 12:27:06",
        "name": "Т-банк Рашид",
        "currency": {
            "id": 7,
            "name": "Русский рубль",
            "code": "RUB",
            "deleted_at": null,
            "rate": "99.0000",
            "symbol": "RUB"
        },
        "balance": "18390.42"
    },
    {
        "id": 68,
        "created_at": "2024-02-27 10:18:11",
        "name": "Альфа Зухра ",
        "currency": {
            "id": 7,
            "name": "Русский рубль",
            "code": "RUB",
            "deleted_at": null,
            "rate": "99.0000",
            "symbol": "RUB"
        },
        "balance": "-805.00"
    },
    {
        "id": 73,
        "created_at": "2024-11-18 20:47:21",
        "name": "Мама (185,5 тыс)",
        "currency": {
            "id": 7,
            "name": "Русский рубль",
            "code": "RUB",
            "deleted_at": null,
            "rate": "99.0000",
            "symbol": "RUB"
        },
        "balance": "-185500.00"
    },
    {
        "id": 82,
        "created_at": "2025-06-11 14:03:53",
        "name": "Наличные",
        "currency": {
            "id": 7,
            "name": "Русский рубль",
            "code": "RUB",
            "deleted_at": null,
            "rate": "99.0000",
            "symbol": "RUB"
        },
        "balance": "140910.00"
    }
]

const mockBalance = {
    "total-amount": {
        "currency": {
            "id": 7,
            "name": "Русский рубль",
            "code": "RUB",
            "deleted_at": null,
            "rate": "99.0000",
            "symbol": "RUB"
        },
        "total": 917855.42
    },
    "amount-by-currency": [
        {
            "currency": {
                "id": 7,
                "name": "Русский рубль",
                "code": "RUB",
                "deleted_at": null,
                "rate": "99.0000",
                "symbol": "RUB"
            },
            "total": 175355.42
        },
        {
            "currency": {
                "id": 9,
                "name": "Доллар США",
                "code": "USD",
                "deleted_at": null,
                "rate": "1.0000",
                "symbol": "$"
            },
            "total": 7500
        }
    ]
}

export const BalanceModal = ({ open, onClose }: props) => {
    return (
        <UModal open={open} onClose={onClose} title="Balance">
            <div className="balance-modal">
                <div className="balance-modal__accounts">
                    <h4>Accounts</h4>
                    <ul>
                        {mockAccounts.map(acc => {
                            return <li className="balance-modal__accounts-item">
                                <span>{acc.name}</span>
                                <span>{acc.balance}</span>
                                <span>{acc.currency.code}</span>
                            </li>
                        })}
                    </ul>
                </div>
                <div className="balance-modal__totals">
                    <h4>balance/by amount</h4>
                    <div>
                        <div className="balance-modal__total">
                            <h5>Общий баланс:</h5>
                            <p>
                                <span>{mockBalance["total-amount"].total}</span>
                                <span>{mockBalance["total-amount"].currency.code}</span>
                            </p>
                        </div>
                        <div className="balance-modal__by-curr">
                            <h5>Сумма по валютам:</h5>
                            <ul>
                                {mockBalance["amount-by-currency"].map(acc => {
                                    return <li className="balance-modal__accounts-item">
                                        <span>{acc.total}</span>
                                        <span>{acc.currency.code}</span>
                                        <span>{acc.currency.rate}</span>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </UModal>
    )
}