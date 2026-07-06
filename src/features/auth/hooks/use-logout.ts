import { useAuthStore } from "@/entities/user/model/auth-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/logout";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const setToken = useAuthStore((s) => s.setToken);

  return useMutation({
    mutationFn: logout,

    onSettled: async () => {
      setToken(null);
      queryClient.clear();
    },
  });
};
