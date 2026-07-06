import { Link } from "react-router";
import { AuthTabs } from "../../widgets/auth-tabs/AuthTabs";
import "./auth.css";
import { routes } from "@/app/router/routes";

export const LoginPage = () => {
  return (
    <div className="login-view">
      <AuthTabs />

      <Link to={routes.restore}>Забыли пароль?</Link>
    </div>
  );
};
