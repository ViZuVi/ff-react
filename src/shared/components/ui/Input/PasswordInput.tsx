import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import type { ControllerRenderProps } from "react-hook-form";
import type { RegisterFormData } from "@/pages/auth/components/register.schema";

type TextFieldProps = {
  field: ControllerRenderProps<RegisterFormData, "password">;
  error?: string;
  autoComplete?: string;
  disabled?: boolean;
};

export const PasswordInput = ({
  field,
  error,
  autoComplete,
  disabled,
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <TextField
      {...field}
      id="password"
      size="small"
      placeholder="Password"
      error={!!error}
      helperText={error}
      disabled={disabled}
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
    />
  );
};
