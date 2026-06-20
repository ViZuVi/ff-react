import { UModal } from "@/shared/components/ui/Modal/Modal"
import { Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, Snackbar, type SelectChangeEvent } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useBalance } from "@/entities/balance/hooks/use-balance";
import { useEffect, useState } from "react";
import { useCurrentSpace } from "@/entities/space/hooks/use-current-space";
import { useCurrency } from "@/entities/currency/hooks/use-currency";
import type { Account } from "@/shared/types/Account";
import { useSnackbarStore } from "@/shared/store/snackbar";

interface props {
    open: boolean;
    onClose: () => void;
}

export const BalanceModal = ({ open, onClose }: props) => {
    const { showSnackbar } = useSnackbarStore.getState()
    const { data: spaceResp } = useCurrentSpace()
    const { data: currencyResp } = useCurrency()

    const [currencyId, setCurrencyId] = useState<number>(0);

    const { data: balance, isLoading: isLoadingBalance } = useBalance(currencyId)

    const handleCurrencyChange = (e: SelectChangeEvent<number>) => {
        const id = Number(e.target.value);

        setCurrencyId(id);
        localStorage.setItem('currency', String(id));
    };

    useEffect(() => {
        const saved = localStorage.getItem('currency');

        if (saved) {
            setCurrencyId(Number(saved));
            return;
        }

        if (currencyResp?.data.length) {
            const defaultCurrency =
                currencyResp.data[currencyResp.data.length - 1].id;

            setCurrencyId(defaultCurrency);
            localStorage.setItem(
                'currency',
                String(defaultCurrency)
            );
        }
    }, [currencyResp]);

    const [selectedAccount, setSelectedAccount] = useState<Account>()

    const handleAccountDelete = (acc: Account) => {
        setSelectedAccount(acc)
        showSnackbar({
            mode: 'confirm',
            message: `Вы действительно хотите удалить счёт "${acc.name}?"`,
            type: 'warning',

            confirmAction: async () => {
                try {
                    // await api.delete(`/account/${acc.id}`)
                    new Promise((resolve) => {
                        setTimeout(() => {
                            console.log('delete', acc.name);
                            
                            resolve(true)
                        }, 2000);
                    }).then(() => {
                        showSnackbar({
                            message: 'Счёт удалён',
                            type: 'success',
                            mode: 'auto'
                        })

                    })

                } catch (e) {
                    showSnackbar({
                        message: 'Ошибка удаления',
                        type: 'error',
                    })
                }
            },

        })
    }

    const confirmDelete = () => {
        console.log('delete acc ', selectedAccount?.id, selectedAccount?.name);
        // setSnackVisability(false)
    }
    // TODO: acccounts logic to separate file, finish ConfirmSnackbar component

    const handleAccountEdit = (acc: Account) => {
        showSnackbar({
            message: `Изменения счета "${acc.name}" сохранены`,
            type: 'success',
        })
    }

    return (
        open && <UModal open={open} onClose={onClose} title="Счета и баланс">
            <div className="balance-modal">
                <div className="balance-modal__accounts">
                    <h3 className="balance-modal__block-title">Счета</h3>
                    <ul>
                        {spaceResp?.data.accounts.map(acc => {
                            return <li className="balance-modal__accounts-item" key={acc.id}>
                                <span className="balance-modal__account-name">{acc.name}</span>
                                <b className={parseFloat(acc.balance) < 0 ? 'text-error' : 'text-success'}>{parseFloat(acc.balance).toLocaleString('ru')}</b>
                                <span>{acc.currency.code}</span>
                                <span className="balance-modal__accounts-actions">
                                    <IconButton size='small' aria-label="редактировать" onClick={() => { handleAccountEdit(acc) }}><EditIcon fontSize="inherit" /></IconButton>
                                    <IconButton size='small' color="error" aria-label="удалить" onClick={() => handleAccountDelete(acc)}><DeleteIcon fontSize="inherit" /></IconButton>
                                </span>
                            </li>
                        })}
                    </ul>
                </div>
                {isLoadingBalance ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress aria-label="Loading…" /></div> : balance && <div className="balance-modal__totals">
                    <h3 className="balance-modal__block-title">Баланс</h3>
                    <div className="balance-modal__totals-wrapper">
                        <div className="balance-modal__total">
                            <h4>Общий баланс:</h4>
                            <div>
                                <b className={(balance?.totalAmount?.total ?? 0) < 0 ? 'text-error' : 'text-success'}>
                                    {balance?.totalAmount.total.toLocaleString('ru')} &nbsp;
                                </b>

                                <Select
                                    id="currency"
                                    size="small"
                                    value={currencyId}
                                    onChange={handleCurrencyChange}
                                >
                                    {currencyResp?.data.map(item => {
                                        return <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                                    })}
                                </Select>
                            </div>
                        </div>
                        <div className="balance-modal__by-curr">
                            <h4>Баланс по валютам:</h4>
                            <ul>
                                {balance.amountByCurrency.map(acc => {
                                    return <li className="balance-modal__curr-item" key={acc.currency.id}>
                                        <b className={acc.total < 0 ? 'text-error' : 'text-success'}>{acc.total.toLocaleString('ru')}&nbsp;</b>
                                        <span>{acc.currency.code}</span>
                                        <span>(курс {parseFloat(acc.currency.rate).toLocaleString('ru')})</span>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>}
            </div>
        </UModal>
    )
}