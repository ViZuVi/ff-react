import { Autocomplete, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Filters } from "@/shared/types/Filters";
import { useCurrentSpace } from "@/entities/space/hooks/use-current-space";
import { FiltersSkeleton } from "./FiltersSkeleton";
import { memo } from "react";
import { CategoriesSelect } from "./CategoriesSelect";
import { SearchInput } from "./SearchInput";
import { TransactionTypeSelect } from "./TransactionTypeSelect";



type Props = {
    filters: Filters;
    onChange: <K extends keyof Filters>(
        key: K,
        value: Filters[K]
    ) => void;
}

const FiltersFormComponent = ({ filters, onChange }: Props) => {
    const { data: space, isLoading, isError } = useCurrentSpace()
    // TODO if error && is Loading

    const handleChange = <K extends keyof typeof filters>(type: K, value: (typeof filters)[K]) => {
        onChange(type, value)
    }

    return (
        space?.data ?
            <div className="filters">
                <SearchInput value={filters.search} onChange={(e) => handleChange('search', e)} />
                <CategoriesSelect value={filters.category_id} categories={space.data.categories} onChange={(e) => handleChange('category_id', e)} />
                <TransactionTypeSelect value={filters.type} onChange={(e) => onChange("type", e)} />


                {/* <FormControl fullWidth size="small">
                    <InputLabel id="users-label">Создатель</InputLabel>
                    <Select
                        labelId="users-label"
                        id="users"
                        value={filters.user_id}
                        label="Создатель"
                        onChange={() => onChange("user_id")}
                    >
                        {space.data.users.map(item => {
                            return <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                    <InputLabel id="account-label">Счет</InputLabel>
                    <Select
                        labelId="account-label"
                        id="account"
                        value={filters.account_id}
                        label="Счет"
                        onChange={() => onChange("account_id")}
                    >
                        {space.data.accounts.map(item => {
                            return <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <div className="filters__date-picker-range">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker disableFuture label="Дата от" />
                        <span>-</span>
                        <DesktopDatePicker disableFuture label="Дата до" />
                    </LocalizationProvider>
                </div> */}

            </div >
            : <FiltersSkeleton />
    )
}

export const FiltersForm = memo(FiltersFormComponent)