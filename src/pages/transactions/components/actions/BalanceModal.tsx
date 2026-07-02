import { UModal } from "@/shared/components/ui/Modal/Modal";
import {
  CircularProgress,
  Divider,
  type SelectChangeEvent,
} from "@mui/material";
import { useBalance } from "@/entities/balance/hooks/use-balance";
import { useState } from "react";
import { useCurrency } from "@/entities/currency/hooks/use-currency";
import { BalanceAccounts } from "./BalanceAccounts";
import { CurrencySelect } from "./CurrencySelect";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const BalanceModal = ({ open, onClose }: Props) => {
  const { data: currencyResp } = useCurrency();

  const [selectedCurrencyId, setSelectedCurrencyId] = useState<number | null>(
    () => {
      const saved = localStorage.getItem("currency");
      return saved ? Number(saved) : null;
    },
  );

  const currencyId =
    selectedCurrencyId ??
    currencyResp?.data[currencyResp.data.length - 1]?.id ??
    0;

  const { data: balance, isLoading: isLoadingBalance } = useBalance(currencyId);

  const handleCurrencyChange = (e: SelectChangeEvent<number>) => {
    const id = Number(e.target.value);

    setSelectedCurrencyId(id);
    localStorage.setItem("currency", String(id));
  };

  return (
    open && (
      <UModal open={open} onClose={onClose} title="Счета и баланс">
        <div className="balance-modal">
          <BalanceAccounts />
          {isLoadingBalance ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress aria-label="Loading…" />
            </div>
          ) : (
            balance && (
              <div className="balance-modal__totals">
                <h3 className="balance-modal__block-title">Баланс</h3>
                <div className="balance-modal__totals-wrapper">
                  <div className="balance-modal__total">
                    <h4>Общий баланс:</h4>
                    <div>
                      <b
                        className={
                          (balance?.totalAmount?.total ?? 0) < 0
                            ? "text-error"
                            : "text-success"
                        }
                      >
                        {balance?.totalAmount.total.toLocaleString("ru")} &nbsp;
                      </b>

                      {currencyResp && (
                        <CurrencySelect
                          value={currencyId}
                          options={currencyResp.data}
                          onChange={handleCurrencyChange}
                        />
                      )}
                    </div>
                  </div>
                  <div className="balance-modal__by-curr">
                    <h4>Баланс по валютам:</h4>
                    <ul>
                      {balance.amountByCurrency.map((acc) => {
                        // TODO: вынести в отдельный компонент Item
                        return (
                          <div key={acc.currency.id}>
                            <li className="balance-modal__curr-item">
                              <b
                                className={
                                  acc.total < 0 ? "text-error" : "text-success"
                                }
                              >
                                {acc.total.toLocaleString("ru")}&nbsp;
                              </b>
                              <span>{acc.currency.code}</span>
                              <span>
                                (курс{" "}
                                {parseFloat(acc.currency.rate).toLocaleString(
                                  "ru",
                                )}
                                )
                              </span>
                            </li>
                            <Divider />
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </UModal>
    )
  );
};
