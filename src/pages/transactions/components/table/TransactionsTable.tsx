import type { Transaction } from "@/shared/types/TransactionDraft";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, type ChangeEvent, type MouseEvent } from "react";

type HeadCell = {
    value: keyof Transaction | 'actions'
    name: string
}

type Order = 'asc' | 'desc';

const headCells: readonly HeadCell[] = [
    { value: 'created_at', name: 'дата' },
    { value: 'category', name: 'категория' },
    { value: 'amount', name: 'сумма' },
    { value: 'account', name: 'счёт' },
    { value: 'user_name', name: 'создатель' },
    { value: 'comment', name: 'описание' },
    { value: 'actions', name: 'действия' },

];

export const TransactionsTable = ({ rows }: { rows: Array<Transaction> }) => {

    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof Transaction>('created_at');

    const onRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Transaction,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const createSortHandler =
        (property: keyof Transaction) => (event: MouseEvent<unknown>) => {
            console.log('createSortHandler');
            onRequestSort(event, property);
        };


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>

            <TableContainer sx={{ maxHeight: 'calc(100vh - 80px - 88px - 80px)' }}>

                <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="transactions table">
                    <TableHead>
                        <TableRow>
                            {headCells.map(h => (<TableCell key={h.value}>
                                {h.value === 'actions'
                                    ? h.name
                                    : <TableSortLabel
                                        active={orderBy === h.value}
                                        direction={orderBy === h.value ? order : 'asc'}
                                        onClick={createSortHandler(h.value)}
                                    >
                                        {h.name}
                                    </TableSortLabel>}
                            </TableCell>))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.created_at}</TableCell>
                                <TableCell>{row.category.name}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>{row.account.name}</TableCell>
                                <TableCell>{row.user_name}</TableCell>
                                <TableCell>{row.comment}</TableCell>
                                <TableCell>
                                    <IconButton size='small' aria-label="редактировать"><EditIcon fontSize="inherit" /></IconButton>
                                    <IconButton size='small' color="error" aria-label="удалить"><DeleteIcon fontSize="inherit" /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}