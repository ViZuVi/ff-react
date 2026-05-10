import './modal.css'
import Modal from '@mui/material/Modal';

interface ModalProps {
    open: boolean;
    title?: string;
    content?: string
    children?: React.ReactNode;
    onClose: () => void;
}

export const UModal = ({ open, title, content, children, onClose }: ModalProps) => {

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
            >
                <div className='u-modal'>
                    <h3>{title}</h3>
                    <div>{content || children}</div>
                </div>
            </Modal>
        </div>
    )
}