import type { Transaction } from "@/shared/types/TransactionDraft";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { memo, useState, type ChangeEvent, type MouseEvent } from "react";
import { useModal } from "@/shared/hooks/useModal";
import { DeleteTransactionModal } from "./DeleteTransactionModal";
import { EditTransactionModal } from "./EditTransactionModal";

type HeadCell = {
  value: keyof Transaction | "actions";
  name: string;
};

type Order = "asc" | "desc";

type ModalType = "delete" | "edit";

const headCells: readonly HeadCell[] = [
  { value: "created_at", name: "дата" },
  { value: "category", name: "категория" },
  { value: "amount", name: "сумма" },
  { value: "account", name: "счёт" },
  { value: "user_name", name: "создатель" },
  { value: "comment", name: "описание" },
  { value: "actions", name: "действия" },
];

const TransactionsTableComponent = ({ rows }: { rows: Array<Transaction> }) => {
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof Transaction>("created_at");

  const onRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Transaction,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler =
    (property: keyof Transaction) => (event: MouseEvent<unknown>) => {
      console.log("createSortHandler");
      onRequestSort(event, property);
    };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { openModal, closeModal, isOpen } = useModal<ModalType>();

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>();

  const handleOpen = (type: ModalType, tr: Transaction) => {
    setSelectedTransaction(tr);
    openModal(type);
  };

  const handleCloseModal = () => {
    closeModal();
    setSelectedTransaction(undefined);
  };

  const EditTransaction = () => {
    console.log("edited transaction id: ", selectedTransaction?.id);
    closeModal();
    setSelectedTransaction(undefined);
  };

  const deleteTransaction = () => {
    console.log("deleted transaction id: ", selectedTransaction?.id);
    closeModal();
    setSelectedTransaction(undefined);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "calc(100vh - 80px - 88px - 80px)" }}>
        <Table
          stickyHeader
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="transactions table"
        >
          <TableHead>
            <TableRow>
              {headCells.map((h) => (
                // TODO: вынести в отдельный компонент Item
                <TableCell key={h.value}>
                  {h.value === "actions" ? (
                    h.name
                  ) : (
                    <TableSortLabel
                      active={orderBy === h.value}
                      direction={orderBy === h.value ? order : "asc"}
                      onClick={createSortHandler(h.value)}
                    >
                      {h.name}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
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
                      onClick={() => handleOpen("edit", row)}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      aria-label="удалить"
                      onClick={() => handleOpen("delete", row)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {selectedTransaction && (
        <EditTransactionModal
          open={isOpen("edit")}
          onClose={handleCloseModal}
          confirmEdit={EditTransaction}
          transaction={selectedTransaction}
        />
      )}
      {selectedTransaction && (
        <DeleteTransactionModal
          open={isOpen("delete")}
          onClose={handleCloseModal}
          confirmDelete={deleteTransaction}
          transaction={selectedTransaction}
        />
      )}
    </Paper>
  );
};

export const TransactionsTable = memo(TransactionsTableComponent);
