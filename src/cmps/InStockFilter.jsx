import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function InStockFilter({ inStock, onInStockChange }) {

    const handleChange = (event) => {
        onInStockChange(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="in-stock-select-label">In stock</InputLabel>
                <Select
                    labelId="in-stock-select-label"
                    id="in-stock-select"
                    value={inStock}
                    label="In stock"
                    onChange={handleChange}
                >
                    <MenuItem value="all"><em>All</em></MenuItem>
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
