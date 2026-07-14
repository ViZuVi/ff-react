import { UModal } from "@/shared/ui/Modal/Modal";
import { Box, Button, TextField } from "@mui/material";
import { TransactionTypeSelect } from "../../filter-transactions/ui/TransactionTypeSelect";
import { useState } from "react";
import type { CategoryCreate } from "@/entities/category/model/types";
import { useCreateCategory } from "@/entities/category";
import { useSnackbarStore } from "@/shared/store/snackbar";
import { useSpaceStore } from "@/entities/space/model/space-store";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CreateCategory = ({ open, onClose }: Props) => {
  const { t } = useTranslation("main");
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

  const { mutate, isPending } = useCreateCategory();

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
            message: t("createCategorySuccess"),
            type: "success",
            mode: "auto",
          });
        },
        onError: () => {
          showSnackbar({
            message: t("createError"),
            type: "error",
            mode: "auto",
          });
        },
      },
    );
  };

  return (
    <UModal open={open} onClose={onClose} title={t("createCategoryTitle")}>
      <Box
        sx={(theme) => ({
          p: "12px",
          minWidth: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          [theme.breakpoints.down(768)]: {
            padding: "4px 8px",
            width: "calc(100vw - 32px)",
            minWidth: "auto",
          },
        })}
      >
        <TextField
          required
          label={t("categoryName")}
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
        {t("createBtn")}
      </Button>
    </UModal>
  );
};
