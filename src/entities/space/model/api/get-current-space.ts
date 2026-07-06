import { api } from "@/shared/api/axios";
import type { ApiResponse } from "@/shared/types/ApiResponse";
import type { Space } from "@/entities/space/model/types";

export const getCurrentSpace = async (
  id: string,
): Promise<ApiResponse<Space>> => {
  const { data } = await api.get(`/space/${id}`);
  return data;
};
