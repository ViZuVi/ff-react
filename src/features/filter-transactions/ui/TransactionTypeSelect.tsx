import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

export const TransactionTypeSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const { t } = useTranslation("main");
  const transactionTypes = [
    { type: "0", name: t("income") },
    { type: "1", name: t("expense") },
  ] as const;

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="transaction-type-label">
        {t("transactionType")}
      </InputLabel>
      <Select
        labelId="transaction-type-label"
        id="transaction-type"
        value={value}
        label={t("transactionType")}
        onChange={(e) => onChange(e.target.value)}
      >
        {transactionTypes.map((item) => {
          return (
            <MenuItem value={item.type} key={item.type}>
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
