import React from 'react';
import Input from '@mui/material/Input';

export default function SearchBar(props){

    const { searchTitle , searchId } = props
    const ariaLabel = { 'aria-label': 'description' };

    return (
        <div>
            <Input placeholder="Title" inputProps={ariaLabel} onChange={searchTitle} />
            <Input placeholder="Id" inputProps={ariaLabel} onChange={searchId} />
        </div>
    )
}