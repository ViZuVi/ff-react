import { api } from "@/shared/api/axios";
import type { AccountCreate } from "../types";

export const createAccount = async (acc: AccountCreate) => {
  const { data } = await api.post("/account", acc);
  return data;
};
