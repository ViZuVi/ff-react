import { useCurrentSpace } from "@/entities/space/hooks/use-current-space";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbarStore } from "@/shared/store/snackbar";
import type { Account } from "@/shared/types/Account";
import { useModal } from "@/shared/hooks/useModal";
import { CreateAccount } from "./CreateAccount";
import { useDeleteAccount } from "@/entities/balance/hooks/use-account";
import { EditAccount } from "./EditAccount";
import { useState } from "react";

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
    <div className="balance-accounts">
      <h3 className="balance-accounts__title">Счета</h3>
      <ul className="balance-accounts__list">
        {spaceResp?.data.accounts.map((acc) => {
          return (
            <li className="balance-accounts__item" key={acc.id}>
              <span className="balance-accounts__name">{acc.name}</span>
              <b
                className={
                  parseFloat(acc.balance) < 0 ? "text-error" : "text-success"
                }
              >
                {parseFloat(acc.balance).toLocaleString("ru")}
              </b>
              <span>{acc.currency.code}</span>
              <span className="balance-accounts__actions">
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
