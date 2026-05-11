import { IconButton } from '@mui/material'
import { Link } from 'react-router'
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import './header.css'

export const AppHeader = () => {
    return (
        <div className="app-header">
            <Link to="/" className="app-header__logo">
                FF
            </Link>
            <div className='app-header__actions'>
                <IconButton size='small' aria-label="настройки"><SettingsIcon /></IconButton>
                <IconButton size='small' aria-label="личный кабинет"><PersonIcon /></IconButton>
                <IconButton size='small' aria-label="выход из аккаунта"><LogoutIcon /></IconButton>
            </div>
        </div>
    )
}