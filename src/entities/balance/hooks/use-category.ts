import { useSpaceStore } from "@/app/store/space";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../api/create-category";
import { deleteCategory } from "../api/delete-category";
import { editCategory } from "../api/edit-category";

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

export const useCreateCategory = () => {
  const invalidate = useInvalidateAccountQueries();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: invalidate,
  });
};

export const useDeleteCategory = () => {
  const invalidate = useInvalidateAccountQueries();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: invalidate,
  });
};

export const useEditCategory = () => {
  const invalidate = useInvalidateAccountQueries();

  return useMutation({
    mutationFn: editCategory,
    onSuccess: invalidate,
  });
};
