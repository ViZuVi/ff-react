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

type ModalType = "balance" | "categories" | "converter" | "new";
type NewTransType = "income" | "expense";

export const MainActions = () => {
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
            aria-label="баланс"
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
            баланс и счета
          </Button>
        )}
        {isMobile ? (
          <IconButton
            aria-label="категории"
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
            категории
          </Button>
        )}
        {!isMobile && (
          <>
            <IconButton
              aria-label="конвертер"
              disabled
              size="small"
              color="primary"
              onClick={() => openModal("converter")}
            >
              <CurrencyExchangeIcon />
            </IconButton>
            <IconButton
              aria-label="аналитика"
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
            aria-label="Добавить доход"
            color="primary"
            onClick={() => toggleNewTransModal("income")}
          >
            <AddBoxIcon />
          </IconButton>
          <IconButton
            size="small"
            aria-label="Добавить расход"
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
            Добавить доход
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => toggleNewTransModal("expense")}
          >
            Добавить расход
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
