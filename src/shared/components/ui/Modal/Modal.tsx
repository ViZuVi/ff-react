import { useState } from 'react';
import { Button } from '../Button/Button';
import './modal.css'

interface ModalProps {
    opened: boolean;
    title?: string;
    content?: string
    children?: React.ReactNode;
    onClose?: () => void;
}

export const Modal = ({ opened, title, content, children }: ModalProps) => {

    const [closed, setClosed] = useState(false);

    return (
        <div className={`modal ${opened && 'modal--opened'}`}>
            <div className='modal__overlay'></div>
            <div className='modal__wrapper'>
                {title && <h3>{title}</h3>}
                <Button icon='close' onClick={() => setClosed(!closed)} />
                <div>
                    {content || children}
                </div>
            </div>
        </div>
    )
}