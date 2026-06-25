import { useTransactionStore } from "@/app/store/transaction";
import type { TransactionDraft } from "@/shared/types/TransactionDraft";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import NumberField from "@/shared/components/ui/Input/NumberField";
import { useModal } from "@/shared/hooks/useModal";
import { CreateAccount } from "./CreateAccount";
import type { Category } from "@/shared/types/Category";
import type { Account } from "@/shared/types/Account";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

type Props = {
  draft: TransactionDraft;
  showRemoveIcon: boolean;
  spaceId: number;
  type: 0 | 1;
  defaultAccountId: number;
  defaultCategoryId: number;
  categories: Category[];
  accounts: Account[];
};

type ModalType = "create-account";

export const TransactionFields = ({
  draft,
  showRemoveIcon,
  spaceId,
  type,
  defaultAccountId,
  defaultCategoryId,
  categories,
  accounts,
}: Props) => {
  const updateDraft = useTransactionStore((s) => s.updateDraft);
  const cloneDraft = useTransactionStore((s) => s.cloneDraft);
  const removeDraft = useTransactionStore((s) => s.removeDraft);
  const addEmptyDraft = useTransactionStore((s) => s.addEmptyDraft);

  const { openModal, closeModal, isOpen } = useModal<ModalType>();

  const changeDate = (e: Dayjs | null) => {
    updateDraft(
      draft.localId,
      "created_at",
      dayjs(e).format("YYYY-MM-DD HH:mm:ss"),
    );
  };

  return (
    <div className="new-transaction-modal__fields">
      <TextField
        id="comment"
        label="Описание"
        size="small"
        value={draft.comment}
        onChange={(e) => updateDraft(draft.localId, "comment", e.target.value)}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DatePicker
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          disableFuture
          label="Дата от"
          value={dayjs(draft.created_at)}
          onChange={(e) => changeDate(e)}
        />
      </LocalizationProvider>
      <NumberField
        label="Сумма"
        value={Number(draft.amount)}
        onValueChange={(e) => updateDraft(draft.localId, "amount", `${e}`)}
        size="small"
        min={1}
      />
      <FormControl size="small">
        <InputLabel id="category">Категория</InputLabel>
        <Select
          labelId="category"
          id="category"
          value={draft.category_id}
          label="Категория"
          onChange={(e) =>
            updateDraft(draft.localId, "category_id", Number(e.target.value))
          }
        >
          {categories.map((cat) => (
            <MenuItem value={cat.id} key={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel id="account">Счёт</InputLabel>
        <Select
          labelId="account"
          id="account"
          value={draft.account_id}
          label="Счёт"
          onChange={(e) =>
            updateDraft(draft.localId, "account_id", Number(e.target.value))
          }
        >
          {accounts.map((acc) => (
            <MenuItem value={acc.id}>{acc.name}</MenuItem>
          ))}
          <Button
            sx={{ m: "auto", width: "100%" }}
            color="secondary"
            onClick={() => openModal("create-account")}
          >
            Создать новый
          </Button>

          <CreateAccount open={isOpen("create-account")} onClose={closeModal} />
        </Select>
      </FormControl>

      <IconButton
        color="primary"
        aria-label="копировать"
        size="small"
        onClick={() => cloneDraft(draft.localId)}
      >
        <ContentCopyIcon fontSize="inherit" />
      </IconButton>
      <div style={{ width: "36px" }}>
        <IconButton
          color="success"
          aria-label="добавить"
          size="small"
          onClick={() => {
            addEmptyDraft(spaceId, type, defaultAccountId, defaultCategoryId);
          }}
        >
          <AddIcon fontSize="inherit" />
        </IconButton>
      </div>
      <div style={{ width: "36px" }}>
        {showRemoveIcon && (
          <IconButton
            color="error"
            aria-label="удалить"
            size="small"
            onClick={() => {
              removeDraft(draft.localId);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        )}
      </div>
    </div>
  );
};
