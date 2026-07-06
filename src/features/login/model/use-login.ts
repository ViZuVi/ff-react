import { useAuthStore } from "@/entities/user/model/auth-store";
import { login } from "@/features/login/model/api/login";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAuthSuccess = () => {
  const setToken = useAuthStore((s) => s.setToken);
  const queryClient = useQueryClient();

  return async (token: string) => {
    setToken(token);

    await queryClient.invalidateQueries({
      queryKey: ["me"],
    });
  };
};

export const useLogin = () => {
  const authSuccess = useAuthSuccess();

  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      await authSuccess(data.data.access_token);
    },
  });
};
