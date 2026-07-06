import { InvitationsList } from "./InvitationsList";
import { useGetInvitation } from "@/entities/invitation";

export const InboxInvitations = () => {
  const { data: invitations, isPending } = useGetInvitation();

  return (
    <InvitationsList
      loading={isPending}
      invitations={invitations?.data.inbox ?? []}
      type="inbox"
    />
  );
};
