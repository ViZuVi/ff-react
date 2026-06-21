import { useCurrentSpace } from "@/entities/space/hooks/use-current-space"
import { Button, IconButton } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbarStore } from "@/shared/store/snackbar";
import type { Account } from "@/shared/types/Account";
import { useModal } from "@/shared/hooks/useModal";
import { CreateAccount } from "./CreateAccount";

export const BalanceAccounts = () => {
    const { data: spaceResp } = useCurrentSpace()
    const { showSnackbar } = useSnackbarStore.getState()

    const handleAccountDelete = (acc: Account) => {
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

    const handleAccountEdit = (acc: Account) => {
        showSnackbar({
            message: `Изменения счета "${acc.name}" сохранены`,
            type: 'success',
        })
    }

    type ModalType = 'edit' | 'create'

    const {
        openModal,
        closeModal,
        isOpen,
    } = useModal<ModalType>()

    return (
        <div className="balance-accounts">
            <h3 className="balance-accounts__title">Счета</h3>
            <ul className="balance-accounts__list">
                {spaceResp?.data.accounts.map(acc => {
                    return <li className="balance-accounts__item" key={acc.id}>
                        <span className="balance-accounts__name">{acc.name}</span>
                        <b className={parseFloat(acc.balance) < 0 ? 'text-error' : 'text-success'}>{parseFloat(acc.balance).toLocaleString('ru')}</b>
                        <span>{acc.currency.code}</span>
                        <span className="balance-accounts__actions">
                            <IconButton size='small' aria-label="редактировать" onClick={() => { handleAccountEdit(acc) }}><EditIcon fontSize="inherit" /></IconButton>
                            <IconButton size='small' color="error" aria-label="удалить" onClick={() => handleAccountDelete(acc)}><DeleteIcon fontSize="inherit" /></IconButton>
                        </span>
                    </li>
                })}
            </ul>
            <Button sx={{ m: 'auto' }} color="secondary" onClick={() => openModal('create')}>Создать новый счёт</Button>
            
            <CreateAccount open={isOpen('create')} onClose={closeModal} />
        </div>
    )
}