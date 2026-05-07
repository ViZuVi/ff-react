import { useState } from "react";
import { Button } from "../../../../shared/components/ui/Button/Button"
import { UModal } from "../../../../shared/components/ui/Modal/Modal"

type ModalType = 'balance' | 'categories' | 'converter' | null


export const MainActions = () => {
    const [activeModal, setActiveModal] = useState<ModalType>(null)

    const openModal = (modal: ModalType) => {
        setActiveModal(modal)
    }

    const closeModal = () => {
        setActiveModal(null)
    }

    return (
        <div className='transactions-actions'>
            <Button label='баланс и счета' onClick={() => openModal('balance')} />
            <Button label='категории' onClick={() => openModal('categories')} />
            <Button icon='currency_exchange' aria-label="конвертер" onClick={() => openModal('converter')} />
            <Button icon='bar_chart' aria-label="аналитика" onClick={() => { }} />

            <UModal open={activeModal === 'balance'} handleClose={closeModal} title="Balance" />
            <UModal open={activeModal === 'categories'} handleClose={closeModal} title="Categories" />
            <UModal open={activeModal === 'converter'} handleClose={closeModal} title="Converter" />
        </div>
    )
}