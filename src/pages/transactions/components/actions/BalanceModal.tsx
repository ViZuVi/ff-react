import { UModal } from "@/shared/components/ui/Modal/Modal"
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
        <UModal open={open} onClose={onClose} title="Счета и баланс">
            <div className="balance-modal">
                <div className="balance-modal__accounts">
                    <h3 className="balance-modal__block-title">Счета</h3>
                    <ul>
                        {mockAccounts.map(acc => {
                            return <li className="balance-modal__accounts-item" key={acc.id}>
                                <span className="balance-modal__account-name">{acc.name}</span>
                                <b className={parseFloat(acc.balance) < 0 ? 'text-error' : 'text-success'}>{parseFloat(acc.balance).toLocaleString('ru')}</b>
                                <span>{acc.currency.code}</span>
                                <span className="balance-modal__accounts-actions">
                                    <IconButton size='small' aria-label="редактировать"><EditIcon fontSize="inherit" /></IconButton>
                                    <IconButton size='small' color="error" aria-label="удалить"><DeleteIcon fontSize="inherit" /></IconButton>
                                </span>
                            </li>
                        })}
                    </ul>
                </div>
                <div className="balance-modal__totals">
                    <h3 className="balance-modal__block-title">Баланс</h3>
                    <div className="balance-modal__totals-wrapper">
                        <div className="balance-modal__total">
                            <h4>Общий баланс:</h4>
                            <p>
                                <b className={mockBalance["total-amount"].total < 0 ? 'text-error' : 'text-success'}>
                                    {mockBalance["total-amount"].total.toLocaleString('ru')} &nbsp;
                                </b>
                                <span>{mockBalance["total-amount"].currency.code}</span>
                            </p>
                        </div>
                        <div className="balance-modal__by-curr">
                            <h4>Баланс по валютам:</h4>
                            <ul>
                                {mockBalance["amount-by-currency"].map(acc => {
                                    return <li className="balance-modal__accounts-item" key={acc.currency.id}>
                                        <b className={acc.total < 0 ? 'text-error' : 'text-success'}>{acc.total.toLocaleString('ru')}</b>
                                        <span>{acc.currency.code}</span>
                                        <span>{parseFloat(acc.currency.rate).toLocaleString('ru')}</span>
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