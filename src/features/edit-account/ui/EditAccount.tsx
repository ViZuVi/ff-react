import { UModal } from "@/shared/ui/Modal/Modal";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useEditAccount } from "@/entities/account";
import { useSnackbarStore } from "@/shared/store/snackbar";
import type { Account } from "@/entities/account";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  account: Account;
  onClose: () => void;
}

export const EditAccount = ({ open, account, onClose }: Props) => {
  const { t } = useTranslation(["main", "common"]);
  const [newAccount, setNewAccount] = useState(account.name);

  const { mutate, isPending } = useEditAccount();
  const { showSnackbar } = useSnackbarStore.getState();

  const handleEdit = () => {
    mutate(
      { id: account.id, name: newAccount },
      {
        onSuccess: () => {
          showSnackbar({
            message: t("main:editAccountSuccess", { account: newAccount }),
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

  return (
    <UModal open={open} onClose={onClose} title={t("main:accountEditTitle")}>
      <Box
        sx={{
          p: "12px",
          minWidth: "420px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          required
          label={t("main:accountName")}
          value={newAccount}
          size="small"
          onChange={(e) => setNewAccount(e.target.value)}
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
