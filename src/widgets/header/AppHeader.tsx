import { IconButton } from '@mui/material'
import { Link } from 'react-router'
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import './header.css'
import { useModal } from '@/shared/hooks/useModal';
import { ProfileModal } from './ProfileModal';
import { SettingsModal } from './SettingsModal';

type ModalType = 'profile' | 'settings'

export const AppHeader = () => {
    const {
        openModal,
        closeModal,
        isOpen,
    } = useModal<ModalType>()

    const logout = () => {
        console.log('logout');
    }

    return (
        <div className="app-header">
            <Link to="/" className="app-header__logo">
                FF
            </Link>
            <div className='app-header__actions'>
                <IconButton size='small' aria-label="настройки" onClick={() => openModal('settings')}><SettingsIcon /></IconButton>
                <IconButton size='small' aria-label="личный кабинет" onClick={() => openModal('profile')}><PersonIcon /></IconButton>
                <IconButton size='small' aria-label="выход из аккаунта" onClick={logout}><LogoutIcon /></IconButton>

                <SettingsModal onClose={closeModal} open={isOpen('settings')} />
                <ProfileModal onClose={closeModal} open={isOpen('profile')} />
            </div>
        </div>
    )
}