import type { BaseSpace } from "./Space";

type InvitationStatus = "new" | "accepted" | "revoked" | "rejected";

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
