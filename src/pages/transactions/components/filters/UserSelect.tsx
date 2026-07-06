import type { User } from "@/shared/types/User";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const UserSelect = ({
  users,
  value,
  onChange,
}: {
  users: User[];
  value: string;
  onChange: (v: string) => void;
}) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="users-label">Создатель</InputLabel>
      <Select
        labelId="users-label"
        id="users"
        value={value}
        label="Создатель"
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
