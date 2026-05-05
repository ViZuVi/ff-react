import { Icon } from '../Icon/Icon';
import './button.css'

interface ButtonProps {
    label?: string;
    children?: React.ReactNode
    icon?: string
    onClick: () => void,
}

export const Button = ({ label, children, icon, onClick }: ButtonProps) => {
    return (
        <button className='u-button' onClick={onClick}>
            {icon ? <Icon name={icon} /> : label || children}
        </button>
    )
}