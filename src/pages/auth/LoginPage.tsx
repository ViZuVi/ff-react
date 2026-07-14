import { Link } from "react-router";
import { AuthTabs } from "../../widgets/auth-tabs/AuthTabs";
import "./auth.css";
import { routes } from "@/app/router/routes";
import { useTranslation } from "react-i18next";

export const LoginPage = () => {
  const { t } = useTranslation("auth");

  return (
    <div className="login-view">
      <AuthTabs />

      <Link to={routes.restore}>{t("forgotPass")}</Link>
    </div>
  );
};
