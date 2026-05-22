import { IconButton, InputAdornment, TextField } from "@mui/material"
import { useState } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type TextFieldProps = {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const PasswordInput = ({value, onChange}: TextFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <TextField id="password" size="small" placeholder="Password" value={value} type={showPassword ? 'text' : 'password'} required slotProps={{
            input: {
                startAdornment: (
                    <InputAdornment position="start">
                        <LockOutlinedIcon />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            },
        }}
            onChange={onChange}
        />
    )
}