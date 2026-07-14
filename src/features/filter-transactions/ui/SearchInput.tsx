import { IconButton, InputAdornment, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

export const SearchInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const { t } = useTranslation("main");
  return (
    <TextField
      id="search"
      size="small"
      label={t("search")}
      value={value}
      slotProps={{
        input: {
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton onClick={() => onChange("")} edge="end">
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
