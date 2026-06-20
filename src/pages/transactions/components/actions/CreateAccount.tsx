import NumberField from "@/shared/components/ui/Input/NumberField";
import { UModal } from "@/shared/components/ui/Modal/Modal"
import { Box, FormControl, InputLabel, TextField } from "@mui/material";
import { CurrencySelect } from "./CurrencySelect";
import { useCurrency } from "@/entities/currency/hooks/use-currency";
import type { AccountCreate } from "@/shared/types/Account";
import { useState } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
}

type AccountWithoutSpace = Omit<AccountCreate, 'space_id'>

export const CreateAccount = ({ open, onClose }: Props) => {
    const { data: currencyResp } = useCurrency()
    const [newAccount, setNewAccount] = useState<AccountWithoutSpace>({
        balance: 0,
        currency_id: currencyResp?.data[0].id || 0,
        name: '',
        // TODO space_id: in api
    })

    const handleChange = <K extends keyof AccountWithoutSpace>(field: K, value: AccountCreate[K]) => {
        setNewAccount({ ...newAccount, [field]: value })
        console.log('newAccount', newAccount, field, value);

    }

    return (
        <UModal open={open} onClose={onClose} title="Создание нового счёта">
            <Box sx={{ p: '12px', minWidth: '920px', display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', alignItems: 'center', gap: '12px' }}>
                <TextField label="Наименование счёта" value={newAccount.name} size="small" onChange={(e) => handleChange('name', e.target.value)} />
                <NumberField label="Сумма" value={newAccount.balance} onValueChange={(e) => handleChange("balance", e ?? 0)} size="small" min={0} />
                {currencyResp?.data &&
                    <FormControl size="small">
                        <InputLabel id="currency">Валюта</InputLabel>
                        <CurrencySelect labelId="currency" label="Валюта" value={newAccount.currency_id} options={currencyResp.data} onChange={(e) => handleChange("currency_id", e.target.value)} />
                    </FormControl>}
            </Box>
        </UModal>
    )
}