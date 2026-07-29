import { UModal } from "@/shared/ui/Modal/Modal";
import { useTransactionStore } from "@/entities/transaction/model/transaction-store";
import { useEffect, useMemo, useState } from "react";
import { Button, Divider, useMediaQuery } from "@mui/material";
import { useSpaceStore } from "@/entities/space/model/space-store";
import { useCurrentSpace } from "@/entities/space/model/use-current-space";
import { useCreateTransaction } from "@/entities/transaction";
import { useSnackbarStore } from "@/shared/store/snackbar";
import { TransactionForm } from "@/features/transaction-form/ui/TransactionForm";
import { TransactionActions } from "@/widgets/transaction-table/TransactionActions";
import {
  transactionSchema,
  type TransactionFormData,
} from "@/features/transaction-form/model/transaction.schema";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";

interface props {
  open: boolean;
  type: "income" | "expense";
  onClose: () => void;
}

export const NewTransactionModal = ({ open, type, onClose }: props) => {
  const { t } = useTranslation(["main", "common"]);
  const title =
    type === "income" ? t("main:AddIncomeBtn") : t("main:AddExpenseBtn");
  const transactionType = type === "income" ? 0 : 1;

  const updateDraft = useTransactionStore((s) => s.updateDraft);
  const cloneDraft = useTransactionStore((s) => s.cloneDraft);
  const removeDraft = useTransactionStore((s) => s.removeDraft);
  const addEmptyDraft = useTransactionStore((s) => s.addEmptyDraft);
  const drafts = useTransactionStore((s) => s.drafts);
  const clear = useTransactionStore((s) => s.clear);
  const init = useTransactionStore((s) => s.init);

  const currentSpaceId = useSpaceStore((s) => s.currentSpaceId);
  const { data: spaceResp } = useCurrentSpace();
  const [errors, setErrors] = useState<
    Record<string, Partial<Record<keyof TransactionFormData, string>>>
  >({});

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

  const handleCreateTransaction = async () => {
    const validationErrors: Record<
      string,
      Partial<Record<keyof TransactionFormData, string>>
    > = {};

    let hasErrors = false;

    for (const draft of drafts) {
      const result = transactionSchema.safeParse(draft);

      if (!result.success) {
        hasErrors = true;

        validationErrors[draft.localId] = Object.fromEntries(
          Object.entries(result.error.flatten().fieldErrors).map(
            ([key, value]) => [key, value?.[0]],
          ),
        );
      }
    }

    setErrors(validationErrors);

    if (hasErrors) {
      return;
    }

    const payload = drafts.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ localId, ...transaction }) => transaction,
    );
    mutate(payload, {
      onSuccess: () => {
        showSnackbar({
          message: t("main:createTransactionsSuccessAll"),
          type: "success",
          mode: "auto",
        });
        onClose();
        clear();
      },
      onError: () => {
        showSnackbar({
          message: t("main:createTransactionsError"),
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

  const isMobile = useMediaQuery("(max-width:768px)");
  return (
    <UModal
      open={open}
      onClose={(reason) => {
        if (reason === "backdropClick") return;
        handleClose();
      }}
      title={title}
    >
      <div className={styles["new-transaction-modal"]}>
        {spaceResp &&
          currentSpaceId &&
          drafts.map((draft, i) => (
            <div
              key={draft.localId}
              className={styles["new-transaction-modal__fields"]}
            >
              <TransactionForm
                errors={errors[draft.localId] ?? {}}
                transaction={draft}
                accounts={spaceResp.data.accounts}
                categories={categories}
                onChange={(field, value) => {
                  updateDraft(draft.localId, field, value);
                  setErrors((prev) => ({
                    ...prev,
                    [draft.localId]: {
                      ...prev[draft.localId],
                      [field]: undefined,
                    },
                  }));
                }}
              />

              <TransactionActions
                showRemove={i > 0}
                onClone={() => cloneDraft(draft.localId)}
                onRemove={() => removeDraft(draft.localId)}
                onAdd={() =>
                  addEmptyDraft(
                    Number(currentSpaceId),
                    transactionType,
                    spaceResp.data.accounts[0].id,
                    categories[0].id,
                  )
                }
              />

              {isMobile && <Divider variant="fullWidth" />}
            </div>
          ))}
        <Button
          variant="contained"
          loading={isPending}
          onClick={handleCreateTransaction}
        >
          {t("common:save")}
        </Button>
      </div>
    </UModal>
  );
};
