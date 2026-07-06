import { EmailInput } from "@/shared/ui/Input/EmailInput";
import { Button, TextField } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import { InvitationsList } from "./InvitationsList";
import { useSnackbarStore } from "@/shared/store/snackbar";
import { useSpaceStore } from "@/entities/space/model/space-store";
import { useGetInvitation, useSendInvitation } from "@/entities/invitation";

export const OutboxInvitations = () => {
  const { data: invitations, isPending } = useGetInvitation();
  const { mutate, isPending: isCreating } = useSendInvitation();

  const [invite, setInvite] = useState({
    email: "",
    message: "",
  });

  const onChange = (
    field: keyof typeof invite,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    console.log(field, e.target.value);

    setInvite({ ...invite, [field]: e.target.value });
  };

  const currentSpaceId = useSpaceStore((s) => s.currentSpaceId);

  const { showSnackbar } = useSnackbarStore.getState();

  const sendInvitation = () => {
    mutate(
      {
        email: invite.email,
        spaceId: currentSpaceId as string,
        message: invite.message,
      },
      {
        onSuccess: () => {
          setInvite({
            email: "",
            message: "",
          });
          showSnackbar({
            message: "Приглашение успешно отправлено",
            type: "success",
            mode: "auto",
          });
        },
        onError: () => {
          showSnackbar({
            message: "Ошибка отправки",
            type: "error",
            mode: "auto",
          });
        },
      },
    );
  };

  return (
    <div className="outbox-invitations">
      <h2 className="outbox-invitations__title">
        Пригласить пользователя в пространство
      </h2>
      <div className="outbox-invitations__form">
        <EmailInput
          value={invite.email}
          onChange={(e) => onChange("email", e)}
        />
        <TextField
          id="message"
          placeholder="Сообщение"
          size="small"
          value={invite.message}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange("message", e)
          }
        />
        <Button
          variant="contained"
          size="small"
          loading={isCreating}
          onClick={sendInvitation}
        >
          Пригласить
        </Button>
      </div>
      <InvitationsList
        invitations={invitations?.data.outbox ?? []}
        loading={isPending}
        type="outbox"
      />
    </div>
  );
};
