import type { Transaction } from "@/shared/types/TransactionDraft";
import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  useMediaQuery,
} from "@mui/material";
import { memo, useState, type ChangeEvent, type MouseEvent } from "react";
import { useModal } from "@/shared/hooks/useModal";
import { EditTransactionModal } from "./EditTransactionModal";
import { TransactionTableRow } from "./TransactionTableRow";
import { useSnackbarStore } from "@/shared/store/snackbar";
import { useDeleteTransaction } from "@/entities/transaction/hooks/use-transactions";
import { MobileCards } from "./MobileCards";

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
  const { showSnackbar } = useSnackbarStore.getState();
  const { mutate, isPending } = useDeleteTransaction();

  const onRequestSort = (
    _: MouseEvent<unknown>,
    property: keyof Transaction,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler =
    (property: keyof Transaction) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const isMobile = useMediaQuery("(max-width:768px)");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
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

  const deleteTransaction = (tr: Transaction) => {
    showSnackbar({
      mode: "confirm",
      message: `Вы действительно хотите удалить транзакцию`,
      loading: isPending,
      type: "warning",

      confirmAction: async () => {
        mutate(tr.id, {
          onSuccess: () => {
            showSnackbar({
              message: "Транзакция успешно удалена",
              type: "success",
              mode: "auto",
            });
          },
          onError: () => {
            showSnackbar({
              message: "Ошибка удаления",
              type: "error",
              mode: "auto",
            });
          },
        });
      },
    });
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer
        sx={{
          maxHeight: "calc(100vh - 80px - 88px - 160px)",
        }}
      >
        {isMobile ? (
          rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <MobileCards
                transaction={row}
                key={row.id}
                openEditModal={() => handleOpen("edit", row)}
                onDeleteClick={() => deleteTransaction(row)}
              ></MobileCards>
            ))
        ) : (
          <Table stickyHeader size="small" aria-label="transactions table">
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
                  <TransactionTableRow
                    row={row}
                    key={row.id}
                    openEditModal={() => handleOpen("edit", row)}
                    onDeleteClick={() => deleteTransaction(row)}
                  />
                ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Divider />
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        labelRowsPerPage="Строк:"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        slotProps={{
          select: { sx: { margin: "0 8px 0 0" } },
        }}
      />
      {selectedTransaction && (
        <EditTransactionModal
          open={isOpen("edit")}
          onClose={handleCloseModal}
          transaction={selectedTransaction}
        />
      )}
    </Paper>
  );
};

export const TransactionsTable = memo(TransactionsTableComponent);
