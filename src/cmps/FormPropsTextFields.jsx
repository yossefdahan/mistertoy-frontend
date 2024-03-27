import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export function FormPropsTextFields({ value, onChange }) {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-search"
                label="Search"
                type="search"

                value={value}
                onChange={onChange}
            />
        </Box>
    );
}


