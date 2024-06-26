import { Typography, Box, List, ListItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CaseCardSearch from './Case/CaseCardSearch';
import { searchCases } from './API/cases';
import AppContext from './Contexts/AppContext';
import { useContext } from 'react';

const SearchResults = () => {
    const { searchTerm } = useParams();
    const {user, setAvatar,avatar} = useContext(AppContext)
    useEffect(() => {
        if(user){
            async function fetchData() {
                console.log(user,searchTerm)
                const response = await searchCases(searchTerm,user.id)
                console.log("respuesta",response.data.info)
            }
            fetchData()
        }
    },[searchTerm])

    return (
        <Box>
            <Typography variant="h1">Resultados de búsqueda para "{searchTerm}"</Typography>
            <List>
                <ListItem>
                    
                </ListItem>
            </List>
        </Box>
    );
}

export default SearchResults;
