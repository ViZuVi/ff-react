import { IconButton } from '@mui/material'
import { Link } from 'react-router'
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import './header.css'
import { useModal } from '@/shared/hooks/useModal';
import { ProfileModal } from './ProfileModal';
import { SettingsModal } from './SettingsModal';
import { useLogout } from '@/features/auth/hooks/use-logout';
import { useIsFetching } from '@tanstack/react-query';

type ModalType = 'profile' | 'settings'

export const AppHeader = () => {
    const logoutMutation = useLogout();

    const {
        openModal,
        closeModal,
        isOpen,
    } = useModal<ModalType>()

    const logout = () => {
        logoutMutation.mutate()
    }

    const isFetching = useIsFetching()


    return (
        <div className="app-header">
            <Link to="/" className="app-header__logo-link">
                <div className='app-header__logo'>
                    <img width={32} height={32} src="/logo.svg" alt="Logo" />
                    <span>Funds Flow</span>
                </div>
            </Link>
            <div className='app-header__actions'>
                <IconButton size='small' aria-label="настройки" onClick={() => openModal('settings')}><SettingsIcon /></IconButton>
                <IconButton size='small' aria-label="личный кабинет" onClick={() => openModal('profile')}><PersonIcon /></IconButton>
                <IconButton size='small' aria-label="выход из аккаунта" onClick={logout}><LogoutIcon /></IconButton>

                <SettingsModal onClose={closeModal} open={isOpen('settings')} />
                <ProfileModal onClose={closeModal} open={isOpen('profile')} />
            </div>
            {isFetching > 0 && <div style={{ position: 'absolute', bottom: '2px', content: '', left: 0, right: 0, backgroundColor: 'red', height: 2, zIndex: 2 }}></div>}
        </div>
    )
}