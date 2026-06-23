import { useAuthStore } from "@/app/store/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../logout";

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
