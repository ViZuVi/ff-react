import { UModal } from "@/shared/components/ui/Modal/Modal";
import type { CreateTransaction } from "@/shared/types/TransactionDraft";
import { useForm, type SubmitHandler } from 'react-hook-form';

interface props {
    open: boolean;
    type: 'income' | 'expense'
    onClose: () => void;
}

export const NewTransactionModal = ({ open, type, onClose }: props) => {
    const title = `Добавить ${type === 'income' ? "Доход" : "Расход"}`
    const { register, handleSubmit, formState: { errors } } = useForm<CreateTransaction>()
    const onSubmit: SubmitHandler<CreateTransaction> = data => console.log(data);
    console.log(errors);

    return (
        <UModal open={open} onClose={onClose} title={title}>
            <div className="new-transaction-modal">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input defaultValue="null" {...register("comment")} />
                    <input defaultValue="null" {...register("created_at")} />
                    <input type="number" defaultValue={0} {...register("amount", { valueAsNumber: true })} />
                    <input defaultValue="null" {...register("category_id")} />
                    <input defaultValue="null" {...register("account_id")} />
                    <input type="submit" value="Save" />
                </form>
            </div>
        </UModal>
    )
}