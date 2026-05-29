import { useModal } from '@/shared/hooks/useModal'
import { BalanceModal } from "./BalanceModal"
import { Button, IconButton } from "@mui/material"
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import BarChartIcon from '@mui/icons-material/BarChart';
import { CategoryModal } from "./CategoryModal";
import { ConverterModal } from "./ConverterModal";
import { NewTransactionModal } from './NewTransactionModal';
import { useState } from 'react';

type ModalType = 'balance' | 'categories' | 'converter' | 'new'
type NewTransType = 'income' | 'expense'

export const MainActions = () => {
    
    const {
        openModal,
        closeModal,
        isOpen,
    } = useModal<ModalType>()
    
    const [newTransType, setNewTransType] = useState<NewTransType>('income')

    const toggleNewTransModal = (type: NewTransType) => {
        setNewTransType(type)
        openModal('new')
    }

    return (
        <div className='transactions-actions'>
            <div className='transactions-actions__block'>
                <Button variant="outlined" size="small" onClick={() => openModal('balance')}>баланс и счета</Button>
                <Button variant="outlined" size="small" onClick={() => openModal('categories')}>категории</Button>
                <IconButton aria-label="конвертер" size="small" color="primary" onClick={() => openModal('converter')}><CurrencyExchangeIcon /></IconButton>
                <IconButton aria-label="аналитика" size="small" color="primary" href="/charts"><BarChartIcon /></IconButton>
            </div>

            <div className='transactions-actions__block transactions-actions__block--add'>
                <Button variant="contained" size="small" onClick={() => toggleNewTransModal('income')}>Добавить доход</Button>
                <Button variant="contained" size="small" onClick={() => toggleNewTransModal('expense')}>Добавить расход</Button>
            </div>

            <BalanceModal open={isOpen('balance')} onClose={closeModal} />
            <CategoryModal open={isOpen('categories')} onClose={closeModal} />
            <ConverterModal open={isOpen('converter')} onClose={closeModal} />
            <NewTransactionModal open={isOpen('new')} type={newTransType} onClose={closeModal} />
            {/* <ConverterModal open={isOpen('expense')} onClose={closeModal} /> */}
        </div>
    )
}