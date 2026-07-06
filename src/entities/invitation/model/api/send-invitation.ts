import { api } from "@/shared/api/axios";

export const sendInvitation = async ({
  email,
  message,
  spaceId,
}: {
  email: string;
  message: string;
  spaceId: string;
}) => {
  const { data } = await api.post("/invitation/create", {
    email,
    message,
    space_id: spaceId,
  });
  return data;
};
