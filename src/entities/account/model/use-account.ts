import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAccount } from "@/entities/account";
import { useSpaceStore } from "@/entities/space/model/space-store";
import { deleteAccount } from "@/entities/account";
import { editAccount } from "@/entities/account";

const useInvalidateAccountQueries = () => {
  const queryClient = useQueryClient();
  const currentSpaceId = useSpaceStore((s) => s.currentSpaceId);

  return () => {
    queryClient.invalidateQueries({ queryKey: ["balance"] });

    if (currentSpaceId) {
      queryClient.invalidateQueries({
        queryKey: ["space", currentSpaceId],
      });
    }
  };
};

export const useCreateAccount = () => {
  const invalidate = useInvalidateAccountQueries();

  return useMutation({
    mutationFn: createAccount,

    onSuccess: invalidate,
  });
};

export const useDeleteAccount = () => {
  const invalidate = useInvalidateAccountQueries();

  return useMutation({
    mutationFn: deleteAccount,

    onSuccess: invalidate,
  });
};

export const useEditAccount = () => {
  const invalidate = useInvalidateAccountQueries();

  return useMutation({
    mutationFn: editAccount,

    onSuccess: invalidate,
  });
};
