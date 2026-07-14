import type { BaseSpace } from "@/entities/space";

export const InvitationStatus = {
  new: "new",
  accepted: "accepted",
  revoked: "revoked",
  rejected: "rejected",
} as const;

export type InvitationStatus =
  (typeof InvitationStatus)[keyof typeof InvitationStatus];

export const statuses: Partial<Record<InvitationStatus, string>> = {
  [InvitationStatus.revoked]: "Отозвано",
  [InvitationStatus.rejected]: "Отклонено",
  [InvitationStatus.accepted]: "Принято",
};

export type Invitation = {
  id: number;
  created_at: string;
  space: BaseSpace;
  status: InvitationStatus;
  message: string | null;
  user: {
    id: number;
    name: string;
    email: string;
    image: string | null;
  };
};

export type InvitationsType = "inbox" | "outbox";
