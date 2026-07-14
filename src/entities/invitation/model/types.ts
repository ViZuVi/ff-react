import type { BaseSpace } from "@/entities/space";

export const InvitationStatus = {
  new: "new",
  accepted: "accepted",
  revoked: "revoked",
  rejected: "rejected",
} as const;

export type InvitationStatus =
  (typeof InvitationStatus)[keyof typeof InvitationStatus];

export const statusTranslationKeys = {
  [InvitationStatus.accepted]: "status.accepted",
  [InvitationStatus.rejected]: "status.rejected",
  [InvitationStatus.revoked]: "status.revoked",
} as const;

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
