import { api } from "@/shared/api/axios";
import type { ApiResponse } from "@/shared/types/ApiResponse";
import type { Invitation } from "@/entities/invitation";

type R = {
  inbox: Invitation[];
  outbox: Invitation[];
};

export const getInvitation = async (): Promise<ApiResponse<R>> => {
  const { data } = await api.get("/invitation/all");
  return data;
};
