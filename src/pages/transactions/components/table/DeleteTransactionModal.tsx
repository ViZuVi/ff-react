import { UModal } from "@/shared/components/ui/Modal/Modal";
import type { Transaction } from "@/shared/types/TransactionDraft";
import { Button } from "@mui/material";

interface props {
  transaction: Transaction;
  open: boolean;
  onClose: () => void;
  confirmDelete: () => void;
}

export const DeleteTransactionModal = ({
  transaction,
  open,
  onClose,
  confirmDelete,
}: props) => {
  return (
    <UModal open={open} onClose={onClose} title="Удаление транзакции">
      <div className="delete-transaction-modal">
        <p>
          Вы действительно хотите удалить транзакцию от{" "}
          <b>{transaction.created_at}</b> {transaction.comment}
        </p>
        <p>
          На сумму <b>{transaction.amount}</b>
        </p>
        <Button
          sx={{ alignSelf: "center" }}
          variant="contained"
          size="small"
          onClick={confirmDelete}
        >
          Да, удалить
        </Button>
      </div>
    </UModal>
  );
};
