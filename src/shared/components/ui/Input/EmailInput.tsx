import { InputAdornment, TextField } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { type ControllerRenderProps } from "react-hook-form";
import type { RegisterFormData } from "@/pages/auth/components/register.schema";

type TextFieldProps = {
  field: ControllerRenderProps<RegisterFormData, "email">;
  error?: string;
};

export const EmailInput = ({ field, error }: TextFieldProps) => {
  return (
    <TextField
      {...field}
      id="email"
      size="small"
      placeholder="Email"
      error={!!error}
      helperText={error}
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
