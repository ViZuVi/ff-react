import { useState, type ChangeEvent, type SubmitEvent } from "react";
import "./restore.css";
import { EmailInput } from "@/shared/components/ui/Input/EmailInput";
import { useNavigate } from "react-router";
import { PasswordInput } from "@/shared/components/ui/Input/PasswordInput";
import { Box, TextField } from "@mui/material";

export const RestoreView = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    code: null,
  });

  const onChange = (
    field: keyof typeof credentials,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setCredentials({ ...credentials, [field]: e.target.value });
  };

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className="restore-view">
      <h1 className="restore-view__title">Восстановление пароля</h1>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: 500,
          margin: "0 auto 32px",
          p: 3,
        }}
      >
        <form className="restore-form" onSubmit={onSubmit}>
          <EmailInput
            value={credentials.email}
            onChange={(e) => onChange("email", e)}
          />
          <button type="button">Получить код подверждения</button>
          <TextField
            id="code"
            size="small"
            placeholder="code"
            value={credentials.code}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange("code", e)}
          />
          <PasswordInput
            value={credentials.password}
            disabled={!credentials.code}
            autoComplete="new-password"
            onChange={(e) => onChange("password", e)}
          />
          <PasswordInput
            value={credentials.password_confirmation}
            disabled={!credentials.code}
            autoComplete="new-password"
            onChange={(e) => onChange("password_confirmation", e)}
          />
          <button type="submit">Подтвердить</button>
        </form>
      </Box>
      <button onClick={() => navigate(-1)}>Вернуться назад</button>
    </div>
  );
};
