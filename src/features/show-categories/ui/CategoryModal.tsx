import { UModal } from "@/shared/ui/Modal/Modal";
import { Button, Divider, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCurrentSpace } from "@/entities/space/model/use-current-space";
import { useModal } from "@/shared/hooks/useModal";
import { CreateCategory } from "../../create-category/ui/CreateCategory";
import type { Category } from "@/entities/category/model/types";
import { useSnackbarStore } from "@/shared/store/snackbar";
import { useDeleteCategory } from "@/entities/category";
import { useState } from "react";
import { EditCategory } from "../../edit-category/ui/EditCategory";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";

interface props {
  open: boolean;
  onClose: () => void;
}

type ModalType = "edit" | "create";

export const CategoryModal = ({ open, onClose }: props) => {
  const { t } = useTranslation("main");
  const { data: spaceResp } = useCurrentSpace();
  const { showSnackbar } = useSnackbarStore.getState();
  const { mutate, isPending } = useDeleteCategory();

  const { openModal, closeModal, isOpen } = useModal<ModalType>();

  const handleCategoryDelete = (cat: Category) => {
    showSnackbar({
      mode: "confirm",
      message: t("categoryDeleteConfirm", { category: cat.name }),
      loading: isPending,
      type: "warning",

      confirmAction: async () => {
        mutate(cat.id, {
          onSuccess: () => {
            showSnackbar({
              message: t("categoryDeleteSuccess"),
              type: "success",
              mode: "auto",
            });
          },
          onError: () => {
            showSnackbar({
              message: t("deleteError"),
              type: "error",
              mode: "auto",
            });
          },
        });
      },
    });
  };

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleCategoryEdit = (cat: Category) => {
    if (!cat) return;
    setEditingCategory(cat);
    openModal("edit");
  };

  const handleEditModalClose = () => {
    closeModal();
    setEditingCategory(null);
  };

  return (
    <UModal open={open} onClose={onClose} title={t("categories")}>
      <div className={styles["category-modal"]}>
        <ul>
          {spaceResp?.data.categories.map((cat) => {
            // TODO: вынести в отдельный компонент Item
            return (
              <div key={cat.id}>
                <li className={styles["category-modal__item"]}>
                  <span>{cat.name}</span>
                  <span className={styles["category-modal__actions"]}>
                    <IconButton
                      size="small"
                      aria-label={t("categoryEditTitle")}
                      onClick={() => handleCategoryEdit(cat)}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      aria-label={t("deleteCategory")}
                      onClick={() => handleCategoryDelete(cat)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </span>
                </li>
                <Divider />
              </div>
            );
          })}
        </ul>
        <Button
          sx={{ m: "auto" }}
          color="secondary"
          onClick={() => openModal("create")}
        >
          {t("createCategoryBtn")}
        </Button>

        <CreateCategory open={isOpen("create")} onClose={closeModal} />
        {editingCategory && (
          <EditCategory
            open={isOpen("edit")}
            onClose={handleEditModalClose}
            category={editingCategory}
          />
        )}
      </div>
    </UModal>
  );
};
