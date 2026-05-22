import { Link } from "react-router";
import { AuthTabs } from "./components/AuthTabs";
import './auth.css';

export const LoginView = () => {

   
    return (
        <div className="login-view">
            <AuthTabs />

            <Link to="/restore" >Забыли пароль?</Link>
        </div >
    )
}