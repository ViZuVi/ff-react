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
import { useCurrentSpace } from "@/entities/space/hooks/use-current-space";
import { useModal } from "@/shared/hooks/useModal";
import { CreateAccount } from "./CreateAccount";

type Props = {
  draft: TransactionDraft;
  showRemoveIcon: boolean;
  spaceId: number;
};

type ModalType = "create-account";

export const TransactionFields = ({
  draft,
  showRemoveIcon,
  spaceId,
}: Props) => {
  const updateDraft = useTransactionStore((s) => s.updateDraft);
  const cloneDraft = useTransactionStore((s) => s.cloneDraft);
  const removeDraft = useTransactionStore((s) => s.removeDraft);
  const addEmptyDraft = useTransactionStore((s) => s.addEmptyDraft);

  const { data: spaceResp } = useCurrentSpace();

  const { openModal, closeModal, isOpen } = useModal<ModalType>();

  return (
    <div className="new-transaction-modal__fields">
      <TextField
        id="comment"
        label="Описание"
        size="small"
        value={draft.comment}
        onChange={(e) => updateDraft(draft.localId, "comment", e.target.value)}
      />
      <TextField
        id="created_at"
        label="Дата"
        size="small"
        value={draft.created_at}
        onChange={(e) =>
          updateDraft(draft.localId, "created_at", e.target.value)
        }
      />
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
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
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
          {spaceResp?.data.accounts.map((acc) => (
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
            addEmptyDraft(spaceId);
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
