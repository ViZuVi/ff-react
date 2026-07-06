import { useCurrentSpace } from "@/entities/space/model/use-current-space";
import { Button, Divider, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbarStore } from "@/shared/store/snackbar";
import type { Account } from "@/entities/account";
import { useModal } from "@/shared/hooks/useModal";
import { CreateAccount } from "../../create-account/ui/CreateAccount";
import { useDeleteAccount } from "@/entities/account";
import { EditAccount } from "../../edit-account/ui/EditAccount";
import { useState } from "react";
import styles from "./balance.module.css";

export const BalanceAccounts = () => {
  const { data: spaceResp } = useCurrentSpace();
  const { showSnackbar } = useSnackbarStore.getState();
  const { mutate, isPending } = useDeleteAccount();

  const handleAccountDelete = (acc: Account) => {
    showSnackbar({
      mode: "confirm",
      message: `Вы действительно хотите удалить счёт "${acc.name}?"`,
      loading: isPending,
      type: "warning",

      confirmAction: async () => {
        mutate(acc.id, {
          onSuccess: () => {
            showSnackbar({
              message: "Счёт удалён",
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

  type ModalType = "edit" | "create";

  const { openModal, closeModal, isOpen } = useModal<ModalType>();

  const [editingAccount, setEditingAccount] = useState<Account | null>(null);

  const handleAccountEdit = (acc: Account) => {
    if (!acc) return;
    setEditingAccount(acc);
    openModal("edit");
  };

  const handleEditModalClose = () => {
    closeModal();
    setEditingAccount(null);
  };

  return (
    <div className={styles["balance-accounts"]}>
      <h3 className={styles["balance-accounts__title"]}>Счета</h3>
      <ul className={styles["balance-accounts__list"]}>
        {spaceResp?.data.accounts.map((acc) => {
          // TODO: вынести в отдельный компонент Item
          return (
            <div key={acc.id}>
              <li className={styles["balance-accounts__item"]}>
                <span className={styles["balance-accounts__name"]}>
                  {acc.name}
                </span>
                <b
                  className={
                    parseFloat(acc.balance) < 0 ? "text-error" : "text-success"
                  }
                >
                  {parseFloat(acc.balance).toLocaleString("ru")}
                </b>
                <span>{acc.currency.code}</span>
                <span className={styles["balance-accounts__actions"]}>
                  <IconButton
                    size="small"
                    aria-label="редактировать"
                    onClick={() => handleAccountEdit(acc)}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    aria-label="удалить"
                    onClick={() => handleAccountDelete(acc)}
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
        Создать новый счёт
      </Button>

      <CreateAccount open={isOpen("create")} onClose={closeModal} />
      {editingAccount && (
        <EditAccount
          open={isOpen("edit")}
          onClose={handleEditModalClose}
          account={editingAccount}
        />
      )}
    </div>
  );
};
