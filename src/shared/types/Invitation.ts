import type { BaseSpace } from "./Space";

const InvitationStatus = {
  new: "new",
  accepted: "accepted",
  revoked: "revoked",
  rejected: "rejected",
} as const;

export type Invitation = {
  id: number;
  created_at: string;
  space: BaseSpace;
  status: keyof typeof InvitationStatus;
  message: string | null;
  user: {
    id: number;
    name: string;
    email: string;
    image: string | null;
  };
};
