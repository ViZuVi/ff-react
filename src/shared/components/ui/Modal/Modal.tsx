import './modal.css'
import Modal from '@mui/material/Modal';

interface ModalProps {
    open: boolean;
    title?: string;
    content?: string
    children?: React.ReactNode;
    handleClose: () => void;
}

export const UModal = ({ open, title, content, children, handleClose }: ModalProps) => {

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='u-modal'>
                    <h3>{title}</h3>
                    <div>{content || children}</div>
                </div>
            </Modal>
        </div>
    )
}