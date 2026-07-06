import { api } from "@/shared/api/axios";
import type { ApiResponse } from "../../../shared/types/ApiResponse";

export interface LoginDTO {
  email: string;
  password: string;
}

type R = {
  access_token: string;
  expires_in: string;
  token_type: string;
};

export const login = async (dto: LoginDTO): Promise<ApiResponse<R>> => {
  const { data } = await api.post("/user/login", dto);
  return data;
};
