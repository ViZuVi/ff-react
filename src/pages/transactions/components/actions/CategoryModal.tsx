import { UModal } from "@/shared/components/ui/Modal/Modal";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface props {
    open: boolean;
    onClose: () => void;
}

const mockCat = [
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

export const CategoryModal = ({ open, onClose }: props) => {
    return (
        <UModal open={open} onClose={onClose} title="Категории">
            <div className="category-modal">
                <ul>
                    {mockCat.map(cat => {
                        return <li className="category-modal__item" key={cat.id}>
                            <span>{cat.name}</span>
                            <span className="category-modal__actions">
                                <IconButton size='small' aria-label="редактировать"><EditIcon fontSize="inherit" /></IconButton>
                                <IconButton size='small' color="error" aria-label="удалить"><DeleteIcon fontSize="inherit" /></IconButton>
                            </span>
                        </li>
                    })}
                </ul>
            </div>
        </UModal>
    )
}