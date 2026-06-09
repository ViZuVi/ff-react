import { UModal } from "@/shared/components/ui/Modal/Modal"
import { Box } from "@mui/material";

interface props {
    open: boolean;
    onClose: () => void;
}

export const SettingsModal = ({ open, onClose }: props) => {
    return (
        <UModal open={open} onClose={onClose} title="Настройки" >
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224, minWidth: '60vw', p: 3 }}>
                sett
            </Box>
        </UModal>
    )
}