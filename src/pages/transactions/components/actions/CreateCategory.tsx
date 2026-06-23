import { UModal } from "@/shared/components/ui/Modal/Modal";
import { Box, Button, TextField } from "@mui/material";
import { TransactionTypeSelect } from "../filters/TransactionTypeSelect";
import { useState } from "react";
import type { CategoryCreate } from "@/shared/types/Category";
import { useCreateCategory } from "@/entities/balance/hooks/use-category";
import { useSnackbarStore } from "@/shared/store/snackbar";
import { useSpaceStore } from "@/app/store/space";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CreateCategory = ({ open, onClose }: Props) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    type: 1,
  });

  const handleChange = <K extends keyof CategoryCreate>(
    field: K,
    value: CategoryCreate[K],
  ) => {
    setNewCategory((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const { mutate, isPending, isError, error } = useCreateCategory();

  const currentSpaceId = useSpaceStore((s) => s.currentSpaceId);

  const { showSnackbar } = useSnackbarStore.getState();

  const handleCreate = () => {
    mutate(
      {
        ...newCategory,
        space_id: currentSpaceId as string,
      },
      {
        onSuccess: () => {
          onClose();
          setNewCategory({
            name: "",
            type: 1,
          });
          showSnackbar({
            message: "Категория успешно создана",
            type: "success",
            mode: "auto",
          });
        },
        onError: () => {
          showSnackbar({
            message: "Ошибка создания",
            type: "error",
            mode: "auto",
          });
        },
      },
    );
  };

  return (
    <UModal open={open} onClose={onClose} title="Создание новой категории">
      <Box
        sx={{
          p: "12px",
          minWidth: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <TextField
          required
          label="Наименование категории"
          value={newCategory.name}
          size="small"
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <TransactionTypeSelect
          value={newCategory.type.toString()}
          onChange={(e) => handleChange("type", Number(e))}
        />
      </Box>
      <Button
        sx={{ margin: "12px auto", width: "240px" }}
        loading={isPending}
        variant="contained"
        onClick={handleCreate}
      >
        Создать
      </Button>
    </UModal>
  );
};
