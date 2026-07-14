import { UModal } from "@/shared/ui/Modal/Modal";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useSnackbarStore } from "@/shared/store/snackbar";
import type { Category, CategoryCreate } from "@/entities/category/model/types";
import { TransactionTypeSelect } from "../../filter-transactions/ui/TransactionTypeSelect";
import { useEditCategory } from "@/entities/category";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  category: Category;
  onClose: () => void;
}

export const EditCategory = ({ open, category, onClose }: Props) => {
  const { t } = useTranslation(["main", "common"]);
  const [newCategory, setNewCategory] = useState({
    name: category.name,
    type: category.type.id,
  });

  const { mutate, isPending } = useEditCategory();
  const { showSnackbar } = useSnackbarStore.getState();

  const handleEdit = () => {
    mutate(
      { id: category.id, type: newCategory.type, name: newCategory.name },
      {
        onSuccess: () => {
          showSnackbar({
            message: t("main:editCategorySuccess", {
              category: newCategory.name,
            }),
            type: "success",
            mode: "auto",
          });
          onClose();
        },
        onError: () => {
          showSnackbar({
            message: t("main:editError"),
            type: "error",
            mode: "auto",
          });
        },
      },
    );
  };

  const handleChange = <K extends keyof CategoryCreate>(
    field: K,
    value: CategoryCreate[K],
  ) => {
    setNewCategory((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <UModal open={open} onClose={onClose} title={t("main:categoryEditTitle")}>
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
          label={t("main:categoryName")}
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
        onClick={handleEdit}
      >
        {t("common:confirm")}
      </Button>
    </UModal>
  );
};
