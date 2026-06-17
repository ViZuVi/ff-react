import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField, type SelectChangeEvent } from "@mui/material"
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Filters } from "@/shared/types/Filters";
import { useCurrentSpace } from "@/entities/space/hooks/use-current-space";
import { FiltersSkeleton } from "./FiltersSkeleton";
import { memo } from "react";

const transactionTypes = [{ type: 1, name: "Доход" }, { type: 0, name: "Расход" }]

type Props = {
    filters: Filters;
    onChange: (field: string, value: string) => void
}

const FiltersFormComponent = ({ filters, onChange }: Props) => {
    const { data: space, isLoading, isError } = useCurrentSpace()
    // TODO if error && is Loading

    const handleChange = (type: keyof typeof filters, value: string) => {
        onChange(type, value)
    }

    return (
        space?.data ?
            <div className="filters">
                <TextField id="search" size="small" label="Поиск" value={filters.search} onChange={(e) => handleChange('search', e.target.value)} />

                <FormControl fullWidth size="small">
                    <Autocomplete
                        multiple
                        size="small"
                        id="categories"
                        options={space.data.categories}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option, { selected }) => {
                            const { key, ...optionProps } = props;
                            const SelectionIcon = selected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

                            return (
                                <li key={key} {...optionProps}>
                                    <SelectionIcon
                                        fontSize="small"
                                        style={{ marginRight: 8, padding: 9, boxSizing: 'content-box' }}
                                    />
                                    {option.name}
                                </li>
                            );
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Категория" rows={1} maxRows={1} />
                        )}
                    />
                </FormControl>

                <FormControl fullWidth size="small">
                    <InputLabel id="transaction-type-label">Тип транзакций</InputLabel>
                    <Select
                        labelId="transaction-type-label"
                        id="transaction-type"
                        value={filters.type}
                        label="Тип транзакций"
                        onChange={() => onChange("type")}
                    >
                        {transactionTypes.map(item => {
                            return <MenuItem value={item.type} key={item.type}>{item.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>


                <FormControl fullWidth size="small">
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
                </div>

            </div >
            : <FiltersSkeleton />
    )
}

export const FiltersForm = memo(FiltersFormComponent)