import { InputAdornment, TextField } from "@mui/material"
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import type { ChangeEvent } from "react";

type TextFieldProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
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