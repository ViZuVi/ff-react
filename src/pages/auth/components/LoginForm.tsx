import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { PasswordInput } from "@/shared/components/ui/Input/PasswordInput";
import { EmailInput } from "@/shared/components/ui/Input/EmailInput";
import { useLogin } from "@/features/auth/hooks/use-login";

export const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onChange = (
    field: keyof typeof credentials,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setCredentials({ ...credentials, [field]: e.target.value });
  };

  const loginMutation = useLogin();

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate(credentials);
  };

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <EmailInput
        value={credentials.email}
        onChange={(e) => onChange("email", e)}
      />
      <PasswordInput
        value={credentials.password}
        onChange={(e) => onChange("password", e)}
      />
      <button type="submit">Подтвердить</button>
    </form>
  );
};
