import './button.css'

interface ButtonProps {
    onClick: () => void,
    label?: string;
    children?: React.ReactNode
}

export const Button = ({label, onClick, children}: ButtonProps) => {
    return (
        <button className='u-button' onClick={onClick}>{
            label || children
        }</button>
    )
}