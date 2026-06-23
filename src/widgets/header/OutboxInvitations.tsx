import { EmailInput } from "@/shared/components/ui/Input/EmailInput";
import { Button, TextField } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import { InvitationsList } from "./InvitationsList";
import type { Invitation } from "@/shared/types/Invitation";

const invitations: Invitation[] = [];

export const OutboxInvitations = () => {
  const [invite, setInvite] = useState({
    email: "",
    message: "",
  });

  const onChange = (
    field: keyof typeof invite,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setInvite({ ...invite, [field]: e.target.value });
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
        <Button variant="contained" size="small" onClick={() => {}}>
          Пригласить
        </Button>
      </div>
      <InvitationsList invitations={invitations} type="исходящих" />
    </div>
  );
};
