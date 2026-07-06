import { useAuthStore } from "@/app/store/auth";
import { login } from "@/features/auth/api/login";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../api/register";

const useAuthSuccess = () => {
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

export const useRegister = () => {
  const authSuccess = useAuthSuccess();

  return useMutation({
    mutationFn: register,
    onSuccess: async (_, variables) => {
      const res = await login({
        email: variables.email,
        password: variables.password,
      });

      await authSuccess(res.data.access_token);
    },
  });
};
