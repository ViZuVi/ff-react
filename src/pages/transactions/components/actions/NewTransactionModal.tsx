import { UModal } from "@/shared/components/ui/Modal/Modal";
import { useTransactionStore } from "@/app/store/transaction";
import { useEffect, useMemo } from "react";
import { TransactionFields } from "./TransactionFields";
import { Button } from "@mui/material";
import { useSpaceStore } from "@/app/store/space";
import { useCurrentSpace } from "@/entities/space/hooks/use-current-space";
import { useCreateTransaction } from "@/entities/transaction/hooks/use-transactions";
import { useSnackbarStore } from "@/shared/store/snackbar";

interface props {
  open: boolean;
  type: "income" | "expense";
  onClose: () => void;
}

export const NewTransactionModal = ({ open, type, onClose }: props) => {
  const title = `Добавить ${type === "income" ? "Доход" : "Расход"}`;
  const transactionType = type === "income" ? 0 : 1;

  const drafts = useTransactionStore((s) => s.drafts);
  const clear = useTransactionStore((s) => s.clear);
  const init = useTransactionStore((s) => s.init);

  const currentSpaceId = useSpaceStore((s) => s.currentSpaceId);
  const { data: spaceResp } = useCurrentSpace();

  const categories = useMemo(
    () =>
      spaceResp?.data.categories.filter(
        (category) => category.type.id === transactionType,
      ) ?? [],
    [spaceResp?.data.categories, transactionType],
  );

  useEffect(() => {
    if (!open) return;
    if (!spaceResp?.data) return;
    if (!currentSpaceId) return;

    init(
      Number(currentSpaceId),
      transactionType,
      spaceResp.data.accounts[0].id,
      categories[0].id,
    );
  }, [open, init, currentSpaceId, transactionType, spaceResp, categories]);

  const { mutate, isPending } = useCreateTransaction();
  const { showSnackbar } = useSnackbarStore.getState();

  const handleCreateTransaction = () => {
    mutate(drafts, {
      onSuccess: () => {
        console.log("success");

        onClose();
        clear();
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
    });
  };

  const handleClose = () => {
    clear();
    onClose();
  };

  return (
    <UModal
      open={open}
      onClose={(reason) => {
        if (reason === "backdropClick") return;
        handleClose();
      }}
      title={title}
    >
      <div className="new-transaction-modal">
        <div className="new-transaction-modal__form">
          {spaceResp &&
            currentSpaceId &&
            drafts.map((draft, i) => (
              <TransactionFields
                key={draft.localId}
                draft={draft}
                showRemoveIcon={i > 0}
                spaceId={Number(currentSpaceId)}
                type={transactionType}
                accounts={spaceResp.data.accounts || []}
                categories={categories || []}
                defaultAccountId={spaceResp.data.accounts[0].id}
                defaultCategoryId={categories[0].id}
              />
            ))}
        </div>
        <Button
          variant="contained"
          loading={isPending}
          onClick={handleCreateTransaction}
        >
          Сохранить
        </Button>
      </div>
    </UModal>
  );
};
