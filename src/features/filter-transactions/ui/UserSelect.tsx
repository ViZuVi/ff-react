import type { User } from "@/entities/user/model/types";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

export const UserSelect = ({
  users,
  value,
  onChange,
}: {
  users: User[];
  value: string;
  onChange: (v: string) => void;
}) => {
  const { t } = useTranslation("main");
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="users-label">{t("creator")}</InputLabel>
      <Select
        labelId="users-label"
        id="users"
        value={value}
        label={t("creator")}
        onChange={(e) => onChange(e.target.value)}
      >
        {users.map((item) => {
          return (
            <MenuItem value={item.id} key={item.id}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
      {value && (
        <IconButton
          size="small"
          onClick={() => onChange("")}
          sx={{
            position: "absolute",
            right: 32,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </FormControl>
  );
};
