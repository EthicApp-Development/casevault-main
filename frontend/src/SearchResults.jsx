import { Typography } from '@mui/material';
import React from 'react';

const SearchResults = ({ match }) => {
    const searchTerm = match.params.searchTerm;
    console.log(searchTerm)


    return (
        <Box>
            <Typography>Resultados de búsqueda para "{searchTerm}"</Typography>
        </Box>
    );
}

export default SearchResults;
