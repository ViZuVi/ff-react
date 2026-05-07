import { Button } from '@components/ui/Button/Button'
import './header.css'

export const AppHeader = () => {
    return (
        <div className="app-header">
            <div>FF</div>
            <div className='app-header__actions'>
                <Button icon='settings' aria-label="настройки" onClick={() => { }} />
                <Button icon='person' aria-label="личный кабинет" onClick={() => { }} />
                <Button icon='logout' aria-label="выход из аккаунта" onClick={() => { }} />
            </div>
        </div>
    )
}