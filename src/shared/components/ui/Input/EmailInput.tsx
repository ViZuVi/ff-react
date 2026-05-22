import { InputAdornment, TextField } from "@mui/material"
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

type TextFieldProps = {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const EmailInput = ({value, onChange}: TextFieldProps) => {
    return (
        <TextField id="email" size="small" placeholder="Email" value={value} required
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <EmailOutlinedIcon />
                        </InputAdornment>
                    ),
                },
            }}
            onChange={onChange}
        />
    )
}