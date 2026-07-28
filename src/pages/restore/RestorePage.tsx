import "./restore.css";
import { EmailInput } from "@/shared/ui/Input/EmailInput";
import { useNavigate } from "react-router";
import { PasswordInput } from "@/shared/ui/Input/PasswordInput";
import { Box, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  restoreSchema,
  type RestoreFormData,
} from "@/features/restore/model/resore.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCode, useRestore } from "@/features/restore/model/use-restore";
import { useSnackbarStore } from "@/shared/store/snackbar";

export const RestorePage = () => {
  const { t } = useTranslation(["auth", "restore", "common"]);
  const navigate = useNavigate();

  const onSubmit = (data: RestoreFormData) => {
    mutateRestore(data);
  };

  const {
    control,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RestoreFormData>({
    resolver: zodResolver(restoreSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
      code: null,
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { showSnackbar } = useSnackbarStore.getState();
  const { mutate: mutateCode, isPending: pendingCode } = useCode();
  const { mutate: mutateRestore, isPending } = useRestore();

  const getCode = async () => {
    const valid = await trigger("email");

    if (!valid) return;

    const email = getValues("email");

    mutateCode(
      { email },
      {
        onSuccess: () => {
          showSnackbar({
            message: t("restore:codeSuccess"),
            type: "success",
            mode: "auto",
          });
        },
        onError: () => {
          showSnackbar({
            message: t("restore:codeError"),
            type: "error",
            mode: "auto",
          });
        },
      },
    );
  };

  const code = useWatch({
    control,
    name: "code",
  });

  return (
    <div className="restore-view">
      <h1 className="restore-view__title">{t("restore:restoreTitle")}</h1>
      <Box
        sx={(theme) => ({
          bgcolor: "background.paper",
          width: 500,
          margin: "0 auto 32px",
          p: 3,
          [theme.breakpoints.down(768)]: {
            width: "100%",
          },
        })}
      >
        <form className="restore-form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <EmailInput field={field} error={errors.email?.message} />
            )}
          />

          <Button type="button" onClick={getCode} loading={pendingCode}>
            {t("restore:getCodeBtn")}
          </Button>

          <Controller
            name="code"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                id="username"
                helperText={fieldState.error?.message}
                autoComplete="off"
                error={!!fieldState.error}
                size="small"
                placeholder={t("restore:code")}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput
                autoComplete="new-password"
                field={field}
                placeholder={t("restore:passwordPlaceholder")}
                disabled={!code}
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            name="password_confirmation"
            control={control}
            render={({ field }) => (
              <PasswordInput
                autoComplete="new-password"
                field={field}
                placeholder={t("restore:repeatPassword")}
                disabled={!code}
                error={errors.password_confirmation?.message}
              />
            )}
          />

          <button type="submit" disabled={isSubmitting || isPending}>
            {t("common:confirm")}
          </button>
        </form>
      </Box>
      <button onClick={() => navigate(-1)}>{t("auth:return")}</button>
    </div>
  );
};
