import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "@/shared/ui/Input/PasswordInput";
import { EmailInput } from "@/shared/ui/Input/EmailInput";
import { useLogin } from "../model/use-login";
import { loginSchema, type LoginFormData } from "../model/login.schema";
import { useTranslation } from "react-i18next";

export const LoginForm = () => {
  const { t } = useTranslation("common");
  const { mutate, isPending } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
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
            field={field}
            error={errors.password?.message}
            disabled={isPending}
          />
        )}
      />
      <button type="submit" disabled={isSubmitting || isPending}>
        {t("confirm")}
      </button>
    </form>
  );
};
