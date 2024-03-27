import React, { useEffect, useState, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


export function MultiSelect({ selectedLabels, onChange, labels }) {
    const theme = useTheme();

    const handleChange = (event) => {
        const { target: { value } } = event;
        onChange(typeof value === 'string' ? value.split(',') : value);
    };


    const getStyles = useMemo(() => (name, selectedLabels, theme) => ({
        fontWeight:
            selectedLabels.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }), [selectedLabels, theme]);

    return (
        <div>
            <FormControl sx={{ m: 1, width: 250 }}>
                <InputLabel id="multi-select-label">Labels</InputLabel>
                <Select
                    labelId="multi-select-label"
                    id="multi-select"
                    multiple
                    value={selectedLabels}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Labels" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {labels.map((label) => (
                        <MenuItem
                            key={label}
                            value={label}
                            style={getStyles(label, selectedLabels, theme)}
                        >
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
