import type { Category } from "@/shared/types/Category";
import { Autocomplete, FormControl, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export const CategoriesSelect = ({
  categories,
  onChange,
}: {
  categories: Category[];
  value: number[];
  onChange: (v: number[]) => void;
}) => {
  const handleSelect = (e: Category[]) => {
    const payload = e.map((cat) => cat.id);
    onChange(payload);
  };
  return (
    <FormControl fullWidth size="small">
      <Autocomplete
        multiple
        size="small"
        id="categories"
        options={categories}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          const SelectionIcon = selected
            ? CheckBoxIcon
            : CheckBoxOutlineBlankIcon;

          return (
            <li key={key} {...optionProps}>
              <SelectionIcon
                fontSize="small"
                style={{ marginRight: 8, padding: 9, boxSizing: "content-box" }}
              />
              {option.name}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField {...params} label="Категория" rows={1} maxRows={1} />
        )}
        onChange={(e, v) => handleSelect(v)}
      />
    </FormControl>
  );
};
