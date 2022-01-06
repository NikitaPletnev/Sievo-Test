import React from 'react';
import { TextField } from '@material-ui/core';

interface SearchInterface {
    setSearch(searchString: string): void;
}

const Search = ({ setSearch }: SearchInterface) => {
    return (
        <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            fullWidth
            onChange={(e) => {
                setSearch(e.target.value);
            }}
        />
    );
};

export default Search;
