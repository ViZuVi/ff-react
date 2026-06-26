import type { Transaction } from "@/shared/types/TransactionDraft";
import { Box, Card, Divider, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

interface Props {
  transaction: Transaction;
  openEditModal: () => void;
  onDeleteClick: () => void;
}

export const MobileCards = ({
  transaction,
  openEditModal,
  onDeleteClick,
}: Props) => {
  return (
    <Card
      sx={{
        marginBottom: "12px",
        padding: "8px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ flexGrow: 1, padding: "0 8px" }}>
        <div
          style={{
            fontWeight: 700,
            display: "flex",
            justifyContent: "space-between",
            color: "var(--mui-palette-grey-400)",
          }}
        >
          <span>{dayjs(transaction.created_at).format("YY-MM-DD")}:&nbsp;</span>
          <span>{transaction.user_name}</span>
        </div>
        <div>
          <b>Категория: </b>
          {transaction.category.name}
        </div>
        <div>
          <b>Сумма: </b>
          <span
            className={
              transaction.type.id === 1 ? "text-error" : "text-success"
            }
          >
            {transaction.amount}
          </span>
        </div>
        <div>
          <b>Счёт: </b>
          {transaction.account.name}
        </div>
        <div>
          <b>Описание: </b>
          {transaction.comment || "------"}
        </div>
      </Box>
      <Divider orientation="vertical" variant="fullWidth" flexItem />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "32px",
          gap: "12px",
          padding: "0 8px",
        }}
      >
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
      </Box>
    </Card>
  );
};
