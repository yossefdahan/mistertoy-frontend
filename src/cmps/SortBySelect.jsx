import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function SortBySelect({ sortBy, onSetSortBy }) {
    const handleChange = (event) => {
        onSetSortBy(event.target.value);
    };

    return (
        <Box sx={{ width: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="sort-by-select-label">Sort By</InputLabel>
                <Select
                    labelId="sort-by-select-label"
                    id="sort-by-select"
                    value={sortBy}
                    label="Sort By"
                    onChange={handleChange}
                >
                    <MenuItem value="">----</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="createdAt">Date</MenuItem>
                    <MenuItem value="price">Price</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
