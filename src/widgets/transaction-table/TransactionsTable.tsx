import type { Transaction } from "@/entities/transaction";
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
import {
  memo,
  useMemo,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import { useModal } from "@/shared/hooks/useModal";
import { EditTransactionModal } from "@/features/edit-transaction/ui/EditTransactionModal";
import { TransactionTableRow } from "./TransactionTableRow";
import { useSnackbarStore } from "@/shared/store/snackbar";
import { useDeleteTransaction } from "@/entities/transaction";
import { MobileCards } from "./MobileCards";

type HeadCell = {
  value: keyof Transaction | "actions";
  name: string;
  width: number | string;
};

type Order = "asc" | "desc" | null;

type ModalType = "delete" | "edit";

const headCells: readonly HeadCell[] = [
  { value: "created_at", name: "дата", width: 160 },
  { value: "category", name: "категория", width: 260 },
  { value: "amount", name: "сумма", width: 150 },
  { value: "account", name: "счёт", width: 190 },
  { value: "user_name", name: "создатель", width: 190 },
  { value: "comment", name: "описание", width: "auto" },
  { value: "actions", name: "действия", width: 140 },
];

const TransactionsTableComponent = ({ rows }: { rows: Array<Transaction> }) => {
  const [order, setOrder] = useState<Order>(null);
  const [orderBy, setOrderBy] = useState<keyof Transaction | null>(null);
  const { showSnackbar } = useSnackbarStore.getState();
  const { mutate, isPending } = useDeleteTransaction();

  const onRequestSort = (
    _: MouseEvent<unknown>,
    property: keyof Transaction,
  ) => {
    if (orderBy !== property) {
      setOrderBy(property);
      setOrder("asc");
      return;
    }

    switch (order) {
      case null:
        setOrder("asc");
        break;
      case "asc":
        setOrder("desc");
        break;
      case "desc":
        setOrder(null);
        setOrderBy(null);
        break;
    }
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

  const getSortValue = (row: Transaction, key: keyof Transaction) => {
    switch (key) {
      case "created_at":
        return new Date(row.created_at).getTime();
      case "amount":
        return Number(row.amount);
      case "account":
        return row.account.name;
      case "category":
        return row.category.name;
      case "type":
        return row.type.name;
      default:
        return row[key];
    }
  };

  const sortedRows = useMemo(() => {
    if (order === null || orderBy === null) {
      return rows;
    }

    return [...rows].sort((a, b) => {
      const av = getSortValue(a, orderBy);
      const bv = getSortValue(b, orderBy);

      if (typeof av === "string" && typeof bv === "string") {
        const result = av.localeCompare(bv, "ru");
        return order === "asc" ? result : -result;
      }

      const result = Number(av) - Number(bv);
      return order === "asc" ? result : -result;
    });
  }, [rows, order, orderBy]);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer
        sx={{
          maxHeight: "calc(100vh - 80px - 88px - 160px)",
        }}
      >
        {isMobile ? (
          sortedRows
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
                  <TableCell key={h.value} width={h.width}>
                    {h.value === "actions" ? (
                      h.name
                    ) : (
                      <TableSortLabel
                        active={orderBy === h.value}
                        direction={
                          orderBy === h.value ? (order ?? "asc") : "asc"
                        }
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
              {sortedRows
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
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} из ${count !== -1 ? count : `более ${to}`}`
        }
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
