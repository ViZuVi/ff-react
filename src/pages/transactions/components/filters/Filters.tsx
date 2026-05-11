import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField, type SelectChangeEvent } from "@mui/material"
import { useState } from "react"
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const transactionTypes = [{ type: 1, name: "Доход" }, { type: 0, name: "Расход" }]
const mockCategories = [
    {
        "id": 1,
        "name": "Прочие поступления",
        "type": {
            "id": 0,
            "name": "INCOME"
        },
        "icon": ""
    },
    {
        "id": 2,
        "name": "Прочие расходы",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "icon": ""
    },
    {
        "id": 50,
        "name": "Зарплата",
        "type": {
            "id": 0,
            "name": "INCOME"
        },
        "icon": ""
    },
    {
        "id": 51,
        "name": "Транспорт",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "icon": ""
    },
    {
        "id": 59,
        "name": "Продукты",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "icon": ""
    },
    {
        "id": 60,
        "name": "Жилье",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "icon": ""
    },
    {
        "id": 65,
        "name": "Услуги связи ",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "icon": ""
    },
    {
        "id": 66,
        "name": "Кафе",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "icon": ""
    },
    {
        "id": 70,
        "name": "Переводы",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "icon": ""
    },
    {
        "id": 71,
        "name": "Аптека, лечение ",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "icon": ""
    },
    {
        "id": 74,
        "name": "Интернет-покупки",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "icon": ""
    },
    {
        "id": 75,
        "name": "Отдых и развлечения ",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "icon": ""
    },
    {
        "id": 76,
        "name": "Уход и здоровье ",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "icon": ""
    },
    {
        "id": 77,
        "name": "Одежда и обувь",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "icon": ""
    },
    {
        "id": 78,
        "name": "Подарки ",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "icon": ""
    },
    {
        "id": 79,
        "name": "Техника",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "icon": ""
    },
    {
        "id": 80,
        "name": "Обучение ",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "icon": ""
    },
    {
        "id": 97,
        "name": "Подработка",
        "type": {
            "id": 0,
            "name": "INCOME"
        },
        "icon": ""
    },
    {
        "id": 99,
        "name": "Коррекция счета",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "icon": ""
    },
    {
        "id": 101,
        "name": "Подарки",
        "type": {
            "id": 0,
            "name": "INCOME"
        },
        "icon": ""
    },
    {
        "id": 102,
        "name": "Дивиденды/Купоны",
        "type": {
            "id": 0,
            "name": "INCOME"
        },
        "icon": ""
    },
    {
        "id": 103,
        "name": "Корректировка счета",
        "type": {
            "id": 0,
            "name": "INCOME"
        },
        "icon": ""
    },
    {
        "id": 104,
        "name": "Спорт ",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "icon": ""
    },
    {
        "id": 106,
        "name": "Хобби",
        "type": {
            "id": 1,
            "name": "EXPENSES"
        },
        "icon": ""
    },
    {
        "id": 115,
        "name": "Погашение",
        "type": {
            "id": 0,
            "name": "INCOME"
        },
        "icon": ""
    }
]
const mockUsers = [
    {
        "id": 1,
        "created_at": "2023-08-29 19:49:39",
        "updated_at": "2024-02-19 23:51:54",
        "name": "Рашид",
        "is_admin": false,
        "image": null
    },
    {
        "id": 2,
        "created_at": "2023-08-30 11:26:19",
        "updated_at": "2023-08-30 11:26:19",
        "name": "Zukhra",
        "is_admin": false,
        "image": null
    }
]
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

export const Filters = () => {
    const [filters, setFilters] = useState({
        search: '',
        category_id: [],
        type: 1,
        user_id: 2,
        account_id: 22,
        date_from: "2026-05-01",
        date_to: ""
    })

    const handleChange = (type: "search" | "type" | "user_id" | "account_id") => (e: SelectChangeEvent) => {
        console.log(type, e.target.value);

        setFilters((prev) => ({ ...prev, [type]: e.target.value }))
    }

    return (
        <div className="filters">
            <TextField id="search" size="small" label="Поиск" value={filters.search} />

            <FormControl fullWidth size="small">
                <Autocomplete
                    multiple
                    size="small"
                    id="categories"
                    options={mockCategories}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        const SelectionIcon = selected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

                        return (
                            <li key={key} {...optionProps}>
                                <SelectionIcon
                                    fontSize="small"
                                    style={{ marginRight: 8, padding: 9, boxSizing: 'content-box' }}
                                />
                                {option.name}
                            </li>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Категория" rows={1} maxRows={1} />
                    )}
                />
            </FormControl>

            <FormControl fullWidth size="small">
                <InputLabel id="transaction-type-label">Тип транзакций</InputLabel>
                <Select
                    labelId="transaction-type-label"
                    id="transaction-type"
                    value={filters.type}
                    label="Тип транзакций"
                    onChange={() => handleChange("type")}
                >
                    {transactionTypes.map(item => {
                        return <MenuItem value={item.type} key={item.type}>{item.name}</MenuItem>
                    })}
                </Select>
            </FormControl>


            <FormControl fullWidth size="small">
                <InputLabel id="users-label">Создатель</InputLabel>
                <Select
                    labelId="users-label"
                    id="users"
                    value={filters.user_id}
                    label="Создатель"
                    onChange={() => handleChange("user_id")}
                >
                    {mockUsers.map(item => {
                        return <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                    })}
                </Select>
            </FormControl>

            <FormControl fullWidth size="small">
                <InputLabel id="account-label">Счет</InputLabel>
                <Select
                    labelId="account-label"
                    id="account"
                    value={filters.account_id}
                    label="Счет"
                    onChange={() => handleChange("account_id")}
                >
                    {mockAccounts.map(item => {
                        return <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                    })}
                </Select>
            </FormControl>

            <div className="filters__date-picker-range">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker disableFuture label="Дата от" />
                    <span>-</span>
                    <DesktopDatePicker disableFuture label="Дата до" />
                </LocalizationProvider>
            </div>

        </div >
    )
}