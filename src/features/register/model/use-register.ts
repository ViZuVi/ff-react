import { useMutation } from "@tanstack/react-query";
import { register } from "./api/register";
import { login } from "@/features/login/model/api/login";
import { useAuthSuccess } from "@/features/login/model/use-login";

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
