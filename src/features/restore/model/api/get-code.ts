import { api } from "@/shared/api/axios";

export const getCode = async ({
  email,
}: {
  email: string;
}): Promise<{ status: "success" | "error" }> => {
  const { data } = await api.post("/profile/password/reset", { email });
  return data;
};
