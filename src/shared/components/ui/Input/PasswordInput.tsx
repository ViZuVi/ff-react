import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type TextFieldProps = {
  value: string;
  autoComplete?: string;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const PasswordInput = ({
  value,
  autoComplete,
  disabled,
  onChange,
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <TextField
      id="password"
      size="small"
      placeholder="Password"
      disabled={disabled}
      value={value}
      type={showPassword ? "text" : "password"}
      autoComplete={autoComplete}
      required
      slotProps={{
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
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      onChange={onChange}
    />
  );
};
