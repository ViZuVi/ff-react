import { UModal } from "@/shared/components/ui/Modal/Modal";
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

interface props {
  open: boolean;
  onClose: () => void;
}

type ModalType = "edit" | "create";

export const CategoryModal = ({ open, onClose }: props) => {
  const { data: spaceResp } = useCurrentSpace();
  const { showSnackbar } = useSnackbarStore.getState();
  const { mutate, isPending } = useDeleteCategory();

  const { openModal, closeModal, isOpen } = useModal<ModalType>();

  const handleCategoryDelete = (cat: Category) => {
    showSnackbar({
      mode: "confirm",
      message: `Вы действительно хотите удалить категорию "${cat.name}?"`,
      loading: isPending,
      type: "warning",

      confirmAction: async () => {
        mutate(cat.id, {
          onSuccess: () => {
            showSnackbar({
              message: "Категория удалена",
              type: "success",
              mode: "auto",
            });
          },
          onError: () => {
            showSnackbar({
              message: "Ошибка удаления",
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
    <UModal open={open} onClose={onClose} title="Категории">
      <div className="category-modal">
        <ul>
          {spaceResp?.data.categories.map((cat) => {
            // TODO: вынести в отдельный компонент Item
            return (
              <div key={cat.id}>
                <li className="category-modal__item">
                  <span>{cat.name}</span>
                  <span className="category-modal__actions">
                    <IconButton
                      size="small"
                      aria-label="редактировать"
                      onClick={() => handleCategoryEdit(cat)}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      aria-label="удалить"
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
          Создать новую категорию
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
