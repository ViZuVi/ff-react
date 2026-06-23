import type { Currency } from "@/shared/types/Currency";
import { MenuItem, Select, type SelectChangeEvent } from "@mui/material";

type Props = {
  value: number;
  options: Currency[];
  label?: string;
  labelId?: string;
  onChange: (e: SelectChangeEvent<number>) => void;
};
export const CurrencySelect = ({
  value,
  options,
  label,
  labelId,
  onChange,
}: Props) => {
  return (
    <Select
      id="currency"
      size="small"
      label={label}
      labelId={labelId}
      value={value}
      onChange={onChange}
    >
      {options.map((item) => {
        return (
          <MenuItem value={item.id} key={item.id}>
            {item.name}
          </MenuItem>
        );
      })}
    </Select>
  );
};
