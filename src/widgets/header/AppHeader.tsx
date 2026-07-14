import {
  IconButton,
  MenuItem,
  Paper,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { Link } from "react-router";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useModal } from "@/shared/hooks/useModal";
import { ProfileModal } from "./ProfileModal";
import { SettingsModal } from "./SettingsModal";
import { useLogout } from "@/features/logout/model/use-logout";
import { useIsFetching } from "@tanstack/react-query";
import { routes } from "@/app/router/routes";
import styles from "./header.module.css";
import { useTranslation } from "react-i18next";

type ModalType = "profile" | "settings";

export const AppHeader = () => {
  const { i18n } = useTranslation();
  const logoutMutation = useLogout();

  const { openModal, closeModal, isOpen } = useModal<ModalType>();

  const logout = () => {
    logoutMutation.mutate();
  };

  const isFetching = useIsFetching();

  const changeLang = async (e: SelectChangeEvent) => {
    await i18n.changeLanguage(e.target.value);
  };

  return (
    <Paper className={styles["app-header"]}>
      <Link to={routes.home} className={styles["app-header__logo-link"]}>
        <div className={styles["app-header__logo"]}>
          <img width={32} height={32} src="/logo.svg" alt="Logo" />
          <span>Funds Flow</span>
        </div>
      </Link>

      <div className={styles["app-header__actions"]}>
        <Select
          value={i18n.resolvedLanguage}
          variant="standard"
          size="small"
          onChange={changeLang}
        >
          <MenuItem value="en">🇺🇸 EN</MenuItem>
          <MenuItem value="ru">🇷🇺 RU</MenuItem>
        </Select>
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
        <div className={styles["app-header__loader-wrapper"]}>
          <div className={styles["app-header__loader-bar"]}></div>
        </div>
      )}
    </Paper>
  );
};
