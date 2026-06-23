import type { Invitation } from "@/shared/types/Invitation";
import { InvitationsList } from "./InvitationsList";

const invitations: Invitation[] = [];

export const InboxInvitations = () => {
  return <InvitationsList invitations={invitations} type="входящих" />;
};
