import NumberField from "@/shared/components/ui/Input/NumberField";
import type { Account } from "@/shared/types/Account";
import type { Category } from "@/shared/types/Category";
import type { TransactionFormData } from "@/shared/types/TransactionDraft";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type TransactionFormProps = {
  transaction: TransactionFormData;
  accounts: Account[];
  categories: Category[];
  onChange: <K extends keyof TransactionFormData>(
    field: K,
    value: TransactionFormData[K],
  ) => void;
};

export const TransactionForm = ({
  transaction,
  accounts,
  categories,
  onChange,
}: TransactionFormProps) => {
  return (
    <>
      <TextField
        label="Описание"
        size="small"
        value={transaction.comment}
        onChange={(e) => onChange("comment", e.target.value)}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DatePicker
          disableFuture
          label="Дата"
          value={dayjs(transaction.created_at)}
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          onChange={(date) =>
            onChange("created_at", dayjs(date).format("YYYY-MM-DD HH:mm:ss"))
          }
        />
      </LocalizationProvider>

      <NumberField
        label="Сумма"
        size="small"
        min={1}
        value={Number(transaction.amount)}
        onValueChange={(value) => onChange("amount", String(value))}
      />

      <FormControl size="small">
        <InputLabel>Категория</InputLabel>

        <Select
          value={transaction.category_id}
          label="Категория"
          onChange={(e) => onChange("category_id", Number(e.target.value))}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel>Счёт</InputLabel>

        <Select
          value={transaction.account_id}
          label="Счёт"
          onChange={(e) => onChange("account_id", Number(e.target.value))}
        >
          {accounts.map((acc) => (
            <MenuItem key={acc.id} value={acc.id}>
              {acc.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
