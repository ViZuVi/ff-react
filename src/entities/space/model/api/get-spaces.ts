import { api } from "@/shared/api/axios";
import type { ApiStatus } from "@/shared/types/ApiResponse";
import type { BaseSpace } from "@/entities/space/model/types";

export const getSpaces = async (): Promise<{
  spaces: BaseSpace[];
  status: ApiStatus;
}> => {
  const { data } = await api.get("/space/my");
  return data;
};
