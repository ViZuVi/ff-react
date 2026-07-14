import type { Transaction } from "@/entities/transaction";
import { Box, Card, Divider, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("main");
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
          <b>{t("category")}: </b>
          {transaction.category.name}
        </div>
        <div>
          <b>{t("amount")}: </b>
          <span
            className={
              transaction.type.id === 1 ? "text-error" : "text-success"
            }
          >
            {transaction.amount}
          </span>
        </div>
        <div>
          <b>{t("account")}: </b>
          {transaction.account.name}
        </div>
        <div>
          <b>{t("description")}: </b>
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
      </Box>
    </Card>
  );
};
