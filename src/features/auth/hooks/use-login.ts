import { useAuthStore } from "@/app/store/auth";
import { login } from "@/features/auth/login";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const setToken = useAuthStore((s) => s.setToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      setToken(data.data.access_token);

      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
};
