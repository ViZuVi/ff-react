import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from "react-hook-form";

type PasswordInputProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  error?: string;
  autoComplete?: string;
  disabled?: boolean;
};

export const PasswordInput = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  field,
  error,
  autoComplete,
  disabled,
}: PasswordInputProps<TFieldValues, TName>) => {
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
