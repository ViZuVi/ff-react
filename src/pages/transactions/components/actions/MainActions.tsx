import { Button } from "../../../../shared/components/ui/Button/Button"
import { Modal } from "../../../../shared/components/ui/Modal/Modal"

export const MainActions = () => {
    return (
        <div className='transactions-actions'>
            <Button label='баланс и счета' onClick={() => { }} />
            <Button label='категории' onClick={() => { }} />
            <Button icon='currency_exchange' aria-label="конвертер" onClick={() => { }} />
            <Button icon='bar_chart' aria-label="аналитика" onClick={() => { }} />

            <Modal opened={false} />
        </div>
    )
}