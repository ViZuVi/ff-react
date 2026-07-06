import { InputAdornment, TextField } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { type ControllerRenderProps } from "react-hook-form";
import type { LoginFormData } from "@/pages/auth/components/login.schema";

type TextFieldProps = {
  field: ControllerRenderProps<LoginFormData, "email">;
  error?: string;
};

export const EmailInput = ({ field, error, onChange }: TextFieldProps) => {
  return (
    <TextField
      {...field}
      id="email"
      size="small"
      placeholder="Email"
      error={!!error}
      helperText={error}
      required
      onChange={onChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <EmailOutlinedIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
