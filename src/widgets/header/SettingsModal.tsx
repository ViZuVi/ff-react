import { UModal } from "@/shared/components/ui/Modal/Modal"
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ThemeSwitch } from "./ThemeSwitch";

interface props {
    open: boolean;
    onClose: () => void;
}

export const SettingsModal = ({ open, onClose }: props) => {
    return (
        <UModal open={open} onClose={onClose} title="Настройки" >
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224, minWidth: '60vw', p: 3 }}>
                <div className="settings-modal">
                    <FormControl size="small">
                        <InputLabel id="active-space">Активное пространство</InputLabel>
                        <Select
                            labelId="active-space"
                            id="active-space"
                            value={31}
                            label="Активное пространство"
                        // onChange={(e) => handleChange('currency_id', Number(e.target.value))}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>

                    <ThemeSwitch />
                </div>
            </Box>
        </UModal>
    )
}