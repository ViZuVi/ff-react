import { useSpaceStore } from "@/entities/space/model/space-store";
import { useCurrentSpace } from "@/entities/space/model/use-current-space";
import { UModal } from "@/shared/ui/Modal/Modal";
import type {
  Transaction,
  TransactionFormData,
  UpdateTransactionDto,
} from "@/entities/transaction";
import { Button } from "@mui/material";
import { useMemo, useState } from "react";
import { TransactionForm } from "@/features/transaction-form/ui/TransactionForm";
import { useEditTransaction } from "@/entities/transaction";
import { useSnackbarStore } from "@/shared/store/snackbar";
import styles from "./styles.module.css"

interface props {
  transaction: Transaction;
  open: boolean;
  onClose: () => void;
}

export const EditTransactionModal = ({ transaction, open, onClose }: props) => {
  const currentSpaceId = useSpaceStore((s) => s.currentSpaceId);
  const { data: spaceResp } = useCurrentSpace();
  const { mutate, isPending } = useEditTransaction();
  const { showSnackbar } = useSnackbarStore.getState();

  const [updatedTransaction, setUpdatedTransaction] =
    useState<TransactionFormData>({
      created_at: transaction.created_at,
      amount: transaction.amount,
      comment: transaction.comment,
      account_id: transaction.account.id,
      category_id: transaction.category.id,
    });

  const categories = useMemo(
    () =>
      spaceResp?.data.categories.filter(
        (category) => category.type.id === transaction.type.id,
      ) ?? [],
    [spaceResp?.data.categories, transaction],
  );

  const handleChange = <K extends keyof TransactionFormData>(
    field: K,
    value: TransactionFormData[K],
  ) => {
    setUpdatedTransaction((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const confirmEdit = () => {
    const payload: UpdateTransactionDto = {
      id: transaction.id,
      ...updatedTransaction,
      type: transaction.type.id,
      space_id: Number(currentSpaceId),
    };

    mutate(
      { id: payload.id, transaction: payload },
      {
        onSuccess: () => {
          onClose();
          showSnackbar({
            message: "Транзакция успешно создана",
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
    <UModal open={open} onClose={onClose} title="Изменение транзакции">
      <div className={styles["edit-transaction-modal"]}>
        {spaceResp && (
          <TransactionForm
            transaction={updatedTransaction}
            accounts={spaceResp.data.accounts}
            categories={categories}
            onChange={handleChange}
            errors={{}}
          />
        )}
      </div>
      <Button
        sx={{ m: "0 auto 24px" }}
        variant="contained"
        size="small"
        loading={isPending}
        onClick={confirmEdit}
      >
        Подтвердить изменения
      </Button>
    </UModal>
  );
};
