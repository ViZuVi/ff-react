import type { Account } from "@/shared/types/Account"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

export const AccountSelect = ({ accounts, value, onChange }: { accounts: Account[], value: string, onChange: (v: string) => void }) => {
    return (
        <FormControl fullWidth size="small">
            <InputLabel id="account-label">Счет</InputLabel>
            <Select
                labelId="account-label"
                id="account"
                value={value}
                label="Счет"
                onChange={() => onChange("account_id")}
            >
                {accounts.map(item => {
                    return <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                })}
            </Select>
        </FormControl>
    )
}