import { EmailInput } from "@/shared/ui/Input/EmailInput";
import { Button, TextField } from "@mui/material";
import { InvitationsList } from "./InvitationsList";
import { useSnackbarStore } from "@/shared/store/snackbar";
import { useSpaceStore } from "@/entities/space/model/space-store";
import { useGetInvitation, useSendInvitation } from "@/entities/invitation";
import styles from "./invitations.module.css";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invitationSchema, type InvitationFormData } from "./invitation.schema";

export const OutboxInvitations = () => {
  const { t } = useTranslation("profile");
  const { data: invitations, isPending } = useGetInvitation();
  const { mutate, isPending: isCreating } = useSendInvitation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvitationFormData>({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      email: "",
      message: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const currentSpaceId = useSpaceStore((s) => s.currentSpaceId);

  const { showSnackbar } = useSnackbarStore.getState();

  const sendInvitation = (data: InvitationFormData) => {
    mutate(
      {
        ...data,
        spaceId: currentSpaceId as string,
      },
      {
        onSuccess: () => {
          showSnackbar({
            message: t("sendSuccess"),
            type: "success",
            mode: "auto",
          });
        },
        onError: () => {
          showSnackbar({
            message: t("sendError"),
            type: "error",
            mode: "auto",
          });
        },
      },
    );
  };

  return (
    <div className={styles["outbox-invitations"]}>
      <h2 className={styles["outbox-invitations__title"]}>
        {t("inviteTitle")}
      </h2>
      <form
        className={styles["outbox-invitations__form"]}
        onSubmit={handleSubmit(sendInvitation)}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <EmailInput field={field} error={errors.email?.message} />
          )}
        />
        <Controller
          name="message"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="username"
              helperText={fieldState.error?.message}
              autoComplete="off"
              error={!!fieldState.error}
              size="small"
              placeholder={t("message")}
            />
          )}
        />
        <Button
          variant="contained"
          size="small"
          loading={isCreating}
          onClick={handleSubmit(sendInvitation)}
        >
          {t("inviteBtn")}
        </Button>
      </form>
      <InvitationsList
        invitations={invitations?.data.outbox ?? []}
        loading={isPending}
        type="outbox"
      />
    </div>
  );
};
