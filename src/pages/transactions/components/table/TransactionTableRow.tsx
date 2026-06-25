import type { Transaction } from "@/shared/types/TransactionDraft";
import { IconButton, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  row: Transaction;
  openEditModal: () => void;
  onDeleteClick: () => void;
}

export const TransactionTableRow = ({
  row,
  openEditModal,
  onDeleteClick,
}: Props) => {
  return (
    <TableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>{row.created_at}</TableCell>
      <TableCell>{row.category.name}</TableCell>
      <TableCell>{row.amount}</TableCell>
      <TableCell>{row.account.name}</TableCell>
      <TableCell>{row.user_name}</TableCell>
      <TableCell>{row.comment}</TableCell>
      <TableCell>
        <IconButton
          size="small"
          aria-label="редактировать"
          onClick={openEditModal}
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          aria-label="удалить"
          onClick={onDeleteClick}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
