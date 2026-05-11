import { UModal } from "@/shared/components/ui/Modal/Modal";
import { IconButton, MenuItem, Select, TextField, type SelectChangeEvent } from "@mui/material";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { useState } from "react";

// https://api.funds-flow.ru/v1/currency/convert POST payload: { from: "RUB", to: "USD", value: 1}
// https://api.funds-flow.ru/v1/currency/all GET
interface props {
    open: boolean;
    onClose: () => void;
}

const mockRes = {
    "currency": {
        "code": "USD",
        "rate": 1
    },
    "amount": 0.01
}

const mockCurrList = [
    {
        "id": 1,
        "name": "Дирхам ОАЭ",
        "code": "AED",
        "symbol": "AED",
        "rate": "3.6727"
    },
    {
        "id": 2,
        "name": "Китайский юань",
        "code": "CNY",
        "symbol": "CN¥",
        "rate": "7.3244"
    },
    {
        "id": 3,
        "name": "Евро",
        "code": "EUR",
        "symbol": "€",
        "rate": "0.9668"
    },
    {
        "id": 4,
        "name": "Британский фунт стерлингов",
        "code": "GBP",
        "symbol": "£",
        "rate": "0.8015"
    },
    {
        "id": 5,
        "name": "Японская иена",
        "code": "JPY",
        "symbol": "¥",
        "rate": "158.2561"
    },
    {
        "id": 6,
        "name": "Казахстанский тенге",
        "code": "KZT",
        "symbol": "KZT",
        "rate": "527.9402"
    },
    {
        "id": 7,
        "name": "Русский рубль",
        "code": "RUB",
        "symbol": "RUB",
        "rate": "99.0000"
    },
    {
        "id": 8,
        "name": "Турецкая лира",
        "code": "TRY",
        "symbol": "TL",
        "rate": "35.3195"
    },
    {
        "id": 9,
        "name": "Доллар США",
        "code": "USD",
        "symbol": "$",
        "rate": "1.0000"
    },
    {
        "id": 10,
        "name": "Российский рубль",
        "code": "RUB",
        "symbol": "RUB",
        "rate": "107.3291"
    }
]


export const ConverterModal = ({ open, onClose }: props) => {
    const [currencies, setCurrencies] = useState({
        from: "RUB",
        to: "USD"
    })

    const handleChange = (type: 'to' | 'from') => (e: SelectChangeEvent) => {
        setCurrencies(prev => ({
            ...prev,
            [type]: e.target.value
        }))
    }

    const handleSwitch = () => {
        setCurrencies(({ from, to }) => ({
            from: to,
            to: from
        }))
    }

    const renderCurrencySelect = (id: string, value: string, type: 'to' | 'from') => {
        return (
            <Select
                hiddenLabel
                id={id}
                size="small"
                variant="filled"
                value={value}
                onChange={handleChange(type)}
            >
                {mockCurrList.map(item => {
                    return <MenuItem value={item.code} key={type + item.id}>{item.code}</MenuItem>
                })}

            </Select>
        )
    }

    return (
        <UModal open={open} onClose={onClose} title="Конвертор валют">
            <div className="converter-modal">
                <div>
                    <TextField id="cuurency-from" size="small" variant="filled" hiddenLabel defaultValue={1} />
                    {renderCurrencySelect('cuurency-from', currencies.from, 'from')}
                </div>
                <IconButton size='small' aria-label="Переключить" onClick={handleSwitch}><SwapVertIcon fontSize="inherit" /></IconButton>
                <div>
                    <TextField id="cuurency-to" size="small" variant="filled" hiddenLabel value={mockRes.amount} />
                    {renderCurrencySelect('cuurency-to', currencies.to, 'to')}
                </div>
            </div>
        </UModal>
    )
}