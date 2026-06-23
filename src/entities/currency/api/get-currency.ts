import { api } from "@/shared/api/axios";
import type { ApiResponse } from "@/shared/types/ApiResponse";
import type { Currency } from "@/shared/types/Currency";

export const getCurrency = async (): Promise<ApiResponse<Currency[]>> => {
  const { data } = await api.get<ApiResponse<Currency[]>>("/currency/all");
  const storedCurr = localStorage.getItem("currency");
  if (!storedCurr) {
    localStorage.setItem(
      "currency",
      data?.data[data?.data.length - 1].id.toString(),
    );
  }
  return data;
};
