import { UModal } from "@/shared/components/ui/Modal/Modal";
import { useTransactionStore } from "@/app/store/transaction";
import { useEffect } from "react";
import { TransactionFields } from "./TransactionFields";
import { Button } from "@mui/material";

interface props {
    open: boolean;
    type: 'income' | 'expense'
    onClose: () => void;
}

export const NewTransactionModal = ({ open, type, onClose }: props) => {
    const title = `Добавить ${type === 'income' ? "Доход" : "Расход"}`


    const drafts = useTransactionStore((s) => s.drafts)
    const init = useTransactionStore((s) => s.init)

    const spaceId = 31 //TODO magic number

    useEffect(() => {
        init(spaceId)
    }, [init, spaceId])


    return (
        <UModal open={open} onClose={onClose} title={title}>
            <div className="new-transaction-modal">
                <div className="new-transaction-modal__form">
                    {drafts.map((draft, i) => <TransactionFields key={draft.localId} draft={draft} showRemoveIcon={i>0} spaceId={spaceId} />)}
                </div>
                <Button variant="contained">Сохранить</Button>
            </div>
        </UModal>
    )
}