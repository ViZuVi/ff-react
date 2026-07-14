import { useModal } from "@/shared/hooks/useModal";
import { BalanceModal } from "@/features/show-balance/ui/BalanceModal";
import { Button, IconButton, useMediaQuery } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import { CategoryModal } from "@/features/show-categories/ui/CategoryModal";
import { ConverterModal } from "@/features/currency-converter/ui/ConverterModal";
import { NewTransactionModal } from "@/features/create-transaction/ui/NewTransactionModal";
import { useState } from "react";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";

type ModalType = "balance" | "categories" | "converter" | "new";
type NewTransType = "income" | "expense";

export const MainActions = () => {
  const { t } = useTranslation("main");

  const isMobile = useMediaQuery("(max-width:768px)");
  const { openModal, closeModal, isOpen } = useModal<ModalType>();

  const [newTransType, setNewTransType] = useState<NewTransType>("income");

  const toggleNewTransModal = (type: NewTransType) => {
    setNewTransType(type);
    openModal("new");
  };

  return (
    <div className={styles["transactions-actions"]}>
      <div className={styles["transactions-actions__block"]}>
        {isMobile ? (
          <IconButton
            aria-label={t("balance")}
            size="small"
            color="primary"
            onClick={() => openModal("balance")}
          >
            <AccountBalanceWalletOutlinedIcon />
          </IconButton>
        ) : (
          <Button
            variant="outlined"
            size="small"
            onClick={() => openModal("balance")}
          >
            {t("balanceBtn")}
          </Button>
        )}
        {isMobile ? (
          <IconButton
            aria-label={t("categories")}
            size="small"
            color="primary"
            onClick={() => openModal("categories")}
          >
            <SummarizeOutlinedIcon />
          </IconButton>
        ) : (
          <Button
            variant="outlined"
            size="small"
            onClick={() => openModal("categories")}
          >
            {t("categoryBtn")}
          </Button>
        )}
        {!isMobile && (
          <>
            <IconButton
              aria-label={t("converterBtn")}
              disabled
              size="small"
              color="primary"
              onClick={() => openModal("converter")}
            >
              <CurrencyExchangeIcon />
            </IconButton>
            <IconButton
              aria-label={t("analitycsBtn")}
              disabled
              size="small"
              color="primary"
              href="/charts"
            >
              <BarChartIcon />
            </IconButton>
          </>
        )}
      </div>

      {isMobile ? (
        <div
          className={`${styles["transactions-actions__block"]} ${styles["transactions-actions__block--add"]}`}
        >
          <IconButton
            size="small"
            aria-label={t("AddIncomeBtn")}
            color="primary"
            onClick={() => toggleNewTransModal("income")}
          >
            <AddBoxIcon />
          </IconButton>
          <IconButton
            size="small"
            aria-label={t("AddExpenseBtn")}
            color="primary"
            onClick={() => toggleNewTransModal("expense")}
          >
            <IndeterminateCheckBoxIcon />
          </IconButton>
        </div>
      ) : (
        <div
          className={`${styles["transactions-actions__block"]} ${styles["transactions-actions__block--add"]}`}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => toggleNewTransModal("income")}
          >
            {t("AddIncomeBtn")}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => toggleNewTransModal("expense")}
          >
            {t("AddExpenseBtn")}
          </Button>
        </div>
      )}

      <BalanceModal open={isOpen("balance")} onClose={closeModal} />
      <CategoryModal open={isOpen("categories")} onClose={closeModal} />
      <ConverterModal open={isOpen("converter")} onClose={closeModal} />
      <NewTransactionModal
        open={isOpen("new")}
        type={newTransType}
        onClose={closeModal}
      />
    </div>
  );
};
