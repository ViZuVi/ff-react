import { UModal } from "@/shared/components/ui/Modal/Modal";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ThemeSwitch } from "./ThemeSwitch";
import { useSpaces } from "@/entities/space/hooks/use-spaces";
import { useSpaceStore } from "@/app/store/space";

interface props {
  open: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ open, onClose }: props) => {
  const currentSpaceId = useSpaceStore((s) => s.currentSpaceId);
  const setCurrentSpaceId = useSpaceStore((s) => s.setCurrentSpaceId);

  const { data } = useSpaces();

  const handleSpaceSelect = (id: string | null) => {
    if (!id) return;
    setCurrentSpaceId(id.toString());
  };

  return (
    <UModal open={open} onClose={onClose} title="Настройки">
      <div className="settings-modal">
        <FormControl size="small">
          <InputLabel id="active-space">Активное пространство</InputLabel>
          <Select
            labelId="active-space"
            id="active-space"
            value={currentSpaceId}
            label="Активное пространство"
            onChange={(e) => handleSpaceSelect(e.target.value)}
          >
            {data?.spaces.map((item) => {
              return (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <ThemeSwitch />
      </div>
    </UModal>
  );
};
