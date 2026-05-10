import { Button } from '../Button/Button';
import './modal.css'
import Modal from '@mui/material/Modal';

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
                    {closeIcon && <Button icon='close' onClick={onClose} />}
                    <div>{content || children}</div>
                </div>
            </Modal>
        </div>
    )
}