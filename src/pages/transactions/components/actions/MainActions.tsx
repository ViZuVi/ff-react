import { UModal } from "@components/ui/Modal/Modal"
import { useModal } from '@/shared/hooks/useModal'
import { BalanceModal } from "./BalanceModal"
import { Button, IconButton } from "@mui/material"
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import BarChartIcon from '@mui/icons-material/BarChart';

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
            <IconButton aria-label="конвертер" color="secondary" onClick={() => openModal('converter')}><CurrencyExchangeIcon /></IconButton>
            <IconButton aria-label="аналитика" color="secondary" href="/charts"><BarChartIcon /></IconButton>

            <BalanceModal open={isOpen('balance')} onClose={closeModal} />
            <UModal open={isOpen('categories')} onClose={closeModal} title="Categories" />
            <UModal open={isOpen('converter')} onClose={closeModal} title="Converter" />
        </div>
    )
}