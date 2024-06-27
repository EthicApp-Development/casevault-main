import { Typography, Box, List, ListItem, Grid} from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CaseCardSearch from './Case/CaseCardSearch';
import { searchCases } from './API/cases';
import AppContext from './Contexts/AppContext';
import { useContext, useState } from 'react';
import CaseCard from './Case/CaseCard';

const SearchResults = () => {
    const { searchTerm } = useParams();
    const {user, setAvatar,avatar} = useContext(AppContext)
    const [cases, setCases] = useState([])
    useEffect(() => {
        if(user){
            async function fetchData() {
                const response = await searchCases(searchTerm,user.id)
                setCases(response.data.info)
            }
            fetchData()
        }
        else{
            console.log("no hay user")
        }
    },[searchTerm])

    return (
        <Box>
          <Typography variant="h6">Resultados de búsqueda para "{searchTerm}"</Typography>
          {cases.length == 0 ? (
            <Typography>No hay casos</Typography>
          ) : (
            <Grid container spacing={2} direction="column">
              {cases.map(caseData => (
                <Grid item xs={12} key={caseData.id} sx={{paddingRight: 5}}> 
                  <CaseCardSearch
                    title={caseData.title}
                    description={caseData.description}
                    image_url={caseData.main_image_url}
                    case_id={caseData.id}
                    owner={caseData.user_id}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      );
    }


export default SearchResults;
