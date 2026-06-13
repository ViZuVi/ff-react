import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { PasswordInput } from "@/shared/components/ui/Input/PasswordInput";
import { EmailInput } from "@/shared/components/ui/Input/EmailInput";
import { TextField } from "@mui/material";

export const RegisterForm = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: ''
    });

    const onChange = (field: keyof typeof credentials, e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, [field]: e.target.value})
    }

    const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('submit');
        
    }

    return (
        <form className="login-form" onSubmit={onSubmit}>
            <TextField id="username" autoComplete="off" size="small" placeholder="username" value={credentials.username} required onChange={(e: ChangeEvent<HTMLInputElement>) => onChange("username", e)} />
            <EmailInput value={credentials.email} onChange={(e) => onChange("email", e)} />
            <PasswordInput value={credentials.password} autoComplete="new-password" onChange={(e) => onChange("password", e)} />
            <button type="submit">Подтвердить</button>
        </form>
    )
}