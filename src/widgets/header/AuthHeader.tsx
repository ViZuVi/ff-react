import { MenuItem, Paper, Select, type SelectChangeEvent } from "@mui/material";
import { Link } from "react-router";
import styles from "./header.module.css";
import { routes } from "@/app/router/routes";
import { useTranslation } from "react-i18next";

export const AuthHeader = () => {
  const { i18n } = useTranslation();
  const changeLang = async (e: SelectChangeEvent) => {
    await i18n.changeLanguage(e.target.value);
  };
  return (
    <Paper className={styles["app-header"]}>
      <Link to={routes.login} className={styles["app-header__logo-link"]}>
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
      </div>
    </Paper>
  );
};
