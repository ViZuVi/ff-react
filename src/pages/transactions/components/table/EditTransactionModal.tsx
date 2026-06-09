import NumberField from "@/shared/components/ui/Input/NumberField";
import { UModal } from "@/shared/components/ui/Modal/Modal";
import type { Transaction, UpdateTransaction } from "@/shared/types/TransactionDraft";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

interface props {
    transaction: Transaction
    open: boolean;
    onClose: () => void;
    confirmEdit: () => void;
}

export const EditTransactionModal = ({ transaction, open, onClose, confirmEdit }: props) => {
    const [updatedTransaction, setUpdatedTransaction] = useState<UpdateTransaction>({
        created_at: transaction.created_at,
        amount: transaction.amount,
        comment: transaction.comment,
        id: transaction.id,
        account_id: transaction.account.id,
        category_id: transaction.category.id,
        space_id: 31,
    })

    const handleChange = <K extends keyof UpdateTransaction>(
        field: K,
        value: UpdateTransaction[K]
    ) => {
        console.log(field, value);

        setUpdatedTransaction(prev => ({
            ...prev,
            [field]: value,
        }))
    }

    return (
        <UModal open={open} onClose={onClose} title="Редактирование транзакции">
            <div className="edit-transaction-modal">
                <TextField id="comment" label="Описание" size="small" value={updatedTransaction.comment} onChange={(e) => handleChange('comment', e.target.value)} />
                <TextField id="created_at" label="Дата" size="small" value={updatedTransaction.created_at} onChange={(e) => handleChange('created_at', e.target.value)} />
                <NumberField label="Сумма" value={Number(updatedTransaction.amount)} size="small" min={1} onValueChange={(e) => handleChange('amount', `${e}`)} />
                <FormControl size="small">
                    <InputLabel id="category">Категория</InputLabel>
                    <Select
                        labelId="category"
                        id="category"
                        value={updatedTransaction.category_id}
                        label="Категория"
                        onChange={(e) => handleChange('category_id', Number(e.target.value))}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small">
                    <InputLabel id="account">Счёт</InputLabel>
                    <Select
                        labelId="account"
                        id="account"
                        value={updatedTransaction.account_id}
                        label="Счёт"
                        onChange={(e) => handleChange('account_id', Number(e.target.value))}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Button sx={{m: '0 auto 24px'}} variant="contained" size="small" onClick={confirmEdit}>Подтверить изменения</Button>
        </UModal>
    )

}