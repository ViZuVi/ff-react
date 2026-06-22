import { UModal } from "@/shared/components/ui/Modal/Modal"
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useEditAccount } from "@/entities/balance/hooks/use-account";
import { useSnackbarStore } from "@/shared/store/snackbar";
import type { Account } from "@/shared/types/Account";

interface Props {
    open: boolean;
    account: Account;
    onClose: () => void;
}

export const EditAccount = ({ open, account, onClose }: Props) => {
    const [newAccount, setNewAccount] = useState(account.name)

    const { mutate, isPending } = useEditAccount()
    const { showSnackbar } = useSnackbarStore.getState()

    const handleEdit = () => {
        mutate(({ id: account.id, name: newAccount }), {
            onSuccess: () => {
                showSnackbar({
                    message: `Изменения счета "${newAccount}" сохранены`,
                    type: 'success',
                    mode: 'auto'
                })
                onClose()
            },
            onError: () => {
                showSnackbar({
                    message: 'Ошибка изменения',
                    type: 'error',
                    mode: 'auto',
                })
            },
        })
    }

    return (
        <UModal open={open} onClose={onClose} title="Редактирование счёта">
            <Box sx={{ p: '12px', minWidth: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TextField required label="Наименование счёта" value={newAccount} size="small" onChange={(e) => setNewAccount(e.target.value)} />

            </Box>
            <Button sx={{ margin: '12px auto', width: '240px' }} loading={isPending} variant="contained" onClick={handleEdit}>Подтвердить</Button>
        </UModal>
    )
}