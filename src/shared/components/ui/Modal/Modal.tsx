import { IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import './modal.css'

interface ModalProps {
    open: boolean;
    closeIcon?: boolean,
    title?: string;
    content?: string
    children?: React.ReactNode;
    onClose: () => void;
}

export const UModal = ({ open, closeIcon = true, title, content, children, onClose }: ModalProps) => {

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
            >
                <div className='u-modal'>
                    <h3 className='u-modal__title'>{title}</h3>
                    {closeIcon && <IconButton className='u-modal__close-btn' size='small' aria-label="закрыть"onClick={onClose}><CloseIcon /></IconButton>}
                    <div>{content || children}</div>
                </div>
            </Modal>
        </div>
    )
}