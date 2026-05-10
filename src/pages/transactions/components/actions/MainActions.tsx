import { Button } from "@components/ui/Button/Button"
import { UModal } from "@components/ui/Modal/Modal"
import { useModal } from '@/shared/hooks/useModal'
import { BalanceModal } from "./BalanceModal"

type ModalType = 'balance' | 'categories' | 'converter'


export const MainActions = () => {
    const {
        openModal,
        closeModal,
        isOpen,
    } = useModal<ModalType>()

    return (
        <div className='transactions-actions'>
            <Button label='баланс и счета' onClick={() => openModal('balance')} />
            <Button label='категории' onClick={() => openModal('categories')} />
            <Button icon='currency_exchange' aria-label="конвертер" onClick={() => openModal('converter')} />
            <Button icon='bar_chart' aria-label="аналитика" onClick={() => { }} />

            <BalanceModal open={isOpen('balance')} onClose={closeModal} />
            <UModal open={isOpen('categories')} onClose={closeModal} title="Categories" />
            <UModal open={isOpen('converter')} onClose={closeModal} title="Converter" />
        </div>
    )
}