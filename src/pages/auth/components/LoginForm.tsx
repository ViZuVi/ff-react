import { InputAdornment, TextField } from "@mui/material"
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { PasswordInput } from "@/shared/components/ui/Input/PasswordInput";
import { EmailInput } from "@/shared/components/ui/Input/EmailInput";

export const LoginForm = () => {
    const [credentials, setCredentials] = useState({
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
            <EmailInput value={credentials.email} onChange={(e) => onChange("email", e)} />
            <PasswordInput value={credentials.password} onChange={(e) => onChange("password", e)} />
            <button type="submit">Submit</button>
        </form>
    )
}