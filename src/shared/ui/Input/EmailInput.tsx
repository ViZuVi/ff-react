import { InputAdornment, TextField } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from "react-hook-form";

type EmailInputProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  error?: string;
};

export const EmailInput = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  field,
  error,
}: EmailInputProps<TFieldValues, TName>) => {
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
