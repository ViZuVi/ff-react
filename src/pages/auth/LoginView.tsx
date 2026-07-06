import { Link } from "react-router";
import { AuthTabs } from "./components/AuthTabs";
import "./auth.css";
import { routes } from "@/app/router/routes";

export const LoginView = () => {
  return (
    <div className="login-view">
      <AuthTabs />

      <Link to={routes.restore}>Забыли пароль?</Link>
    </div>
  );
};
