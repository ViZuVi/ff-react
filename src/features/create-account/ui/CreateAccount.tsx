import NumberField from "@/shared/ui/Input/NumberField";
import { UModal } from "@/shared/ui/Modal/Modal";
import { Box, Button, FormControl, InputLabel, TextField } from "@mui/material";
import { CurrencySelect } from "../../show-balance/ui/CurrencySelect";
import { useCurrency } from "@/entities/currency/model/use-currency";
import type { AccountCreate, AccountWithoutSpace } from "@/entities/account";
import { useState } from "react";
import { useCreateAccount } from "@/entities/account";
import { useSpaceStore } from "@/entities/space/model/space-store";
import { useSnackbarStore } from "@/shared/store/snackbar";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CreateAccount = ({ open, onClose }: Props) => {
  const { t } = useTranslation("main");
  const { data: currencyResp } = useCurrency();
  const [newAccount, setNewAccount] = useState<AccountWithoutSpace>({
    balance: 0,
    currency_id: currencyResp?.data[0].id || 0,
    name: "",
  });

  const currentSpaceId = useSpaceStore((s) => s.currentSpaceId);

  const { mutate, isPending } = useCreateAccount();
  const { showSnackbar } = useSnackbarStore.getState();

  const handleCreate = () => {
    mutate(
      {
        ...newAccount,
        space_id: currentSpaceId as string,
      },
      {
        onSuccess: () => {
          onClose();
          setNewAccount({
            balance: 0,
            currency_id: currencyResp?.data[0].id || 0,
            name: "",
          });
          showSnackbar({
            message: t("createAccountSuccess"),
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

  const handleChange = <K extends keyof AccountWithoutSpace>(
    field: K,
    value: AccountCreate[K],
  ) => {
    setNewAccount((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <UModal open={open} onClose={onClose} title={t("createAccountTitle")}>
      <Box
        sx={(theme) => ({
          p: "12px",
          minWidth: "920px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 2fr",
          alignItems: "center",
          gap: "12px",
          [theme.breakpoints.down(768)]: {
            padding: "4px 8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            width: "calc(100vw - 32px)",
            minWidth: "auto",
          },
        })}
      >
        <TextField
          required
          label={t("accountName")}
          value={newAccount.name}
          size="small"
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <NumberField
          label={t("amount")}
          value={newAccount.balance}
          onValueChange={(e) => handleChange("balance", e ?? 0)}
          size="small"
          min={0}
        />
        {currencyResp?.data && (
          <FormControl size="small">
            <InputLabel id="currency">{t("currency")}</InputLabel>
            <CurrencySelect
              labelId="currency"
              label="Валюта"
              value={newAccount.currency_id}
              options={currencyResp.data}
              onChange={(e) => handleChange("currency_id", e.target.value)}
            />
          </FormControl>
        )}
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
