import { api } from "@/shared/api/axios";
import type { ApiResponse } from "@/shared/types/ApiResponse";
import type { User } from "@/shared/types/User";

export const getMe = async (): Promise<ApiResponse<User>> => {
  const { data } = await api.get("/user/show");
  return data;
};
