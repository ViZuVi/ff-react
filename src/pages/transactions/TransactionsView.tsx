import { MainActions } from '@/pages/transactions/components/actions/MainActions'
import './transactions.css'
import { FiltersForm } from './components/filters/FiltersForm'
import { TransactionsTable } from './components/table/TransactionsTable'
import { Skeleton } from '@mui/material'
import { NoSpaces } from './components/NoSpaces'
import { useTransactions } from '@/entities/transaction/hooks/use-transactions'
import { useSpaces } from '@/entities/space/hooks/use-spaces'
import { useDeferredValue, useState } from 'react'
import { useSpaceStore } from '@/app/store/space'
import type { Filters } from '@/shared/types/Filters'

export const TransactionsView = () => {
    const { data: spaces, isLoading: spacesLoading } = useSpaces()
    const currentSpaceId = useSpaceStore((s) => s.currentSpaceId)
    const [filters, setFilters] = useState<Filters>({
        search: '',
        category_id: null,
        type: null,
        space_id: currentSpaceId,
        user_id: null,
        account_id: null,
        date_from: "2026-06-01",
        date_to: ""
    })

    const deferredFilters = useDeferredValue(filters);
    const { data: transactions, isLoading: transactionsLoading } = useTransactions(deferredFilters)

    
    const handleChange = (type: keyof typeof filters, e: string) => {
        setFilters((prev) => ({ ...prev, [type]: e }))
    }

    return (

        spacesLoading ?
            <>
                <div style={{ display: 'flex', gap: '24px' }}>
                    <Skeleton animation="wave" variant="rectangular" width={1200} height={400} />
                    <Skeleton animation="wave" variant="rectangular" width={400} height={400} />
                </div>
            </>
            : spaces?.spaces.length ? <div className='transactions-view'>
                <div className='transactions-wrapper'>
                    <MainActions />
                    {transactions?.data ?  <TransactionsTable rows={transactions.data} /> : ''}
                    
                </div>
                <FiltersForm filters={filters} onChange={handleChange} />
            </div> : <NoSpaces />
    )
}