import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";

type TransactionActionsProps = {
  onClone: () => void;
  onAdd: () => void;
  onRemove?: () => void;
  showRemove?: boolean;
};

export const TransactionActions = ({
  onClone,
  onAdd,
  onRemove,
  showRemove,
}: TransactionActionsProps) => {
  return (
    <div style={{ alignSelf: "flex-end" }}>
      <IconButton color="primary" size="small" onClick={onClone}>
        <ContentCopyIcon fontSize="inherit" />
      </IconButton>

      <IconButton color="success" size="small" onClick={onAdd}>
        <AddIcon fontSize="inherit" />
      </IconButton>

      {showRemove && (
        <IconButton color="error" size="small" onClick={onRemove}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      )}
    </div>
  );
};
