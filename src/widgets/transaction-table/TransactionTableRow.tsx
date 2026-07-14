import type { Transaction } from "@/entities/transaction";
import { IconButton, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ReactNode } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface Props {
  row: Transaction;
  openEditModal: () => void;
  onDeleteClick: () => void;
}

const Cell = ({ children }: { children: ReactNode }) => (
  <TableCell
    sx={(theme) => ({
      [theme.breakpoints.down(768)]: {
        padding: "4px 8px",
      },
    })}
  >
    {children}
  </TableCell>
);

export const TransactionTableRow = ({
  row,
  openEditModal,
  onDeleteClick,
}: Props) => {
  const { t } = useTranslation("main");
  return (
    <TableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <Cell>{dayjs(row.created_at).format("DD.MM.YYYY")}</Cell>
      <Cell>{row.category.name}</Cell>
      <Cell>
        <span className={row.type.id === 1 ? "text-error" : "text-success"}>
          {row.amount}
        </span>
      </Cell>
      <Cell>{row.account.name}</Cell>
      <Cell>{row.user_name}</Cell>
      <Cell>{row.comment}</Cell>
      <Cell>
        <IconButton
          size="small"
          aria-label={t("transactionEditTitle")}
          onClick={openEditModal}
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          aria-label={t("deleteTransaction")}
          onClick={onDeleteClick}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Cell>
    </TableRow>
  );
};
