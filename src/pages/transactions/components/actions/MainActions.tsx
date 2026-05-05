import { Button } from "../../../../shared/components/ui/Button/Button"
import { Icon } from "../../../../shared/components/ui/Icon/Icon"
// import exchange from "../../../../assets/svg/currency_exchange.svg" 

export const MainActions = () => {
    return (
        <div className='transactions-actions'>
            <Button label='баланс и счета' onClick={() => {}} />
            <Button label='категории' onClick={() => {}} />
            <Button onClick={() => {}} aria-label="конвертер">
                <Icon name="currency_exchange" />
            </Button>
            <Button label='аналитика' onClick={() => {}} />
        </div>
    )
}