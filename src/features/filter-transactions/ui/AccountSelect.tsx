import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Account } from "@/entities/account";
import { useTranslation } from "react-i18next";

export const AccountSelect = ({
  accounts,
  value,
  onChange,
}: {
  accounts: Account[];
  value: string;
  onChange: (v: string) => void;
}) => {
  const { t } = useTranslation("main");
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="account-label">{t("account")}</InputLabel>
      <Select
        labelId="account-label"
        id="account"
        value={value}
        label={t("account")}
        onChange={(e) => onChange(e.target.value)}
      >
        {accounts.map((item) => {
          return (
            <MenuItem value={item.id} key={item.id}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
      {value && (
        <IconButton
          size="small"
          onClick={() => onChange("")}
          sx={{
            position: "absolute",
            right: 32,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </FormControl>
  );
};
