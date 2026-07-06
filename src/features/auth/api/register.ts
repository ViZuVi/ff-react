import { api } from "@/shared/api/axios";
import type { ApiResponse } from "../../../shared/types/ApiResponse";

export interface RegisterDTO {
  email: string;
  password: string;
  username: string;
}

type R = {
  id: number;
  username: string;
  email: string;
  updated_at: string;
  created_at: string;
  image: string;
  is_admin: boolean;
};

export const register = async (dto: RegisterDTO): Promise<ApiResponse<R>> => {
  const { data } = await api.post("/user/register", dto);
  return data;
};
