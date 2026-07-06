import { IconButton, Paper } from "@mui/material";
import { Link } from "react-router";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import "./header.css";
import { useModal } from "@/shared/hooks/useModal";
import { ProfileModal } from "./ProfileModal";
import { SettingsModal } from "./SettingsModal";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { useIsFetching } from "@tanstack/react-query";
import { routes } from "@/app/router/routes";

type ModalType = "profile" | "settings";

export const AppHeader = () => {
  const logoutMutation = useLogout();

  const { openModal, closeModal, isOpen } = useModal<ModalType>();

  const logout = () => {
    logoutMutation.mutate();
  };

  const isFetching = useIsFetching();

  return (
    <Paper className="app-header">
      <Link to={routes.home} className="app-header__logo-link">
        <div className="app-header__logo">
          <img width={32} height={32} src="/logo.svg" alt="Logo" />
          <span>Funds Flow</span>
        </div>
      </Link>
      <div className="app-header__actions">
        <IconButton
          size="small"
          aria-label="настройки"
          onClick={() => openModal("settings")}
        >
          <SettingsIcon />
        </IconButton>
        <IconButton
          size="small"
          aria-label="личный кабинет"
          onClick={() => openModal("profile")}
        >
          <PersonIcon />
        </IconButton>
        <IconButton
          size="small"
          aria-label="выход из аккаунта"
          onClick={logout}
        >
          <LogoutIcon />
        </IconButton>

        <SettingsModal onClose={closeModal} open={isOpen("settings")} />
        <ProfileModal onClose={closeModal} open={isOpen("profile")} />
      </div>
      {isFetching > 0 && (
        <div className="app-header__loader-wrapper">
          <div className="app-header__loader-bar"></div>
        </div>
      )}
    </Paper>
  );
};
