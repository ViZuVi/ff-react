import { PasswordInput } from "@/shared/components/ui/Input/PasswordInput";
import { EmailInput } from "@/shared/components/ui/Input/EmailInput";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../model/register.schema";
import { useRegister } from "../model/use-register";

export const RegisterForm = () => {
  const { mutate, isPending } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            id="username"
            helperText={fieldState.error?.message}
            autoComplete="off"
            error={!!fieldState.error}
            size="small"
            placeholder="username"
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <EmailInput field={field} error={errors.email?.message} />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordInput
            autoComplete="new-password"
            field={field}
            error={errors.password?.message}
            disabled={isPending}
          />
        )}
      />
      <Button loading={isSubmitting}>Подтвердить</Button>
    </form>
  );
};
