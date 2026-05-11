import { useModal } from '@/shared/hooks/useModal'
import { BalanceModal } from "./BalanceModal"
import { Button, IconButton } from "@mui/material"
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import BarChartIcon from '@mui/icons-material/BarChart';
import { CategoryModal } from "./CategoryModal";
import { ConverterModal } from "./ConverterModal";

type ModalType = 'balance' | 'categories' | 'converter'


export const MainActions = () => {
    const {
        openModal,
        closeModal,
        isOpen,
    } = useModal<ModalType>()

    return (
        <div className='transactions-actions'>
            <Button variant="outlined" color="secondary" size="small" onClick={() => openModal('balance')}>баланс и счета</Button>
            <Button variant="outlined" color="secondary" size="small" onClick={() => openModal('categories')}>категории</Button>
            <IconButton aria-label="конвертер" size="small" color="secondary" onClick={() => openModal('converter')}><CurrencyExchangeIcon /></IconButton>
            <IconButton aria-label="аналитика" size="small" color="secondary" href="/charts"><BarChartIcon /></IconButton>

            <BalanceModal open={isOpen('balance')} onClose={closeModal} />
            <CategoryModal open={isOpen('categories')} onClose={closeModal} />
            <ConverterModal open={isOpen('converter')} onClose={closeModal} />
        </div>
    )
}