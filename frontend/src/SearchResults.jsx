import { Typography, Box, List, ListItem, Grid, Chip} from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CaseCardSearch from './Case/CaseCardSearch';
import { searchCases } from './API/cases';
import AppContext from './Contexts/AppContext';
import { useContext, useState } from 'react';
import { getSearchedTags } from './API/cases';
import {dialog_style_white, title_style } from './Utils/defaultStyles';
import { useNavigate } from 'react-router-dom';
const SearchResults = () => {
    const { searchTerm } = useParams();
    const {user, setAvatar,avatar} = useContext(AppContext)
    const [cases, setCases] = useState([])
    const [tags, setTags] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
      if (user) {
        async function fetchData() {
          try {
            const [casesResponse, tagsResponse] = await Promise.all([
              searchCases(searchTerm, user.id),
              getSearchedTags(searchTerm) 
            ]);
            setCases(casesResponse.data.info);
            setTags(tagsResponse.data.info);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
  
        fetchData();
      } else {
        console.log('No hay usuario logueado');
      }
    }, [searchTerm, user]);

    const handleClickTag = (tag) => {
      const tagNameWithHash = `${encodeURIComponent("#"+tag.name)}`;
      navigate(`/search/${tagNameWithHash}`);
    };

    return (
        <Box>
          <Typography variant="h6">Resultados de búsqueda para "{searchTerm}"</Typography>
          {cases.length == 0 && tags.length == 0 ? (
            <Typography>No hay casos ni etiquetas que coincidan con la búsqueda</Typography>
          ) : (
              <> 

            <Box sx={dialog_style_white}>
                {tags.length > 0 && <Typography variant="h2" sx={title_style}>Etiquetas</Typography>}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 2, width: '100%', marginLeft: 5 }}>
                  
                {tags.slice(0, 10).map((tag) => (
                  <Chip
                      key={tag.id}
                      label={tag.name}
                      onClick={() => handleClickTag(tag)}
                      sx={{ marginBottom: 1 }}
                  />
              ))}
              </Box>
            </Box>
            <Box sx={dialog_style_white}>
              <Typography variant="h2" sx={title_style}>Casos</Typography>
              <Grid container spacing={2} direction="column">
                {cases.map(caseData => (
                  <Grid item xs={12} key={caseData.id} sx={{paddingRight: 5}}> 
                    <CaseCardSearch
                      title={caseData.title}
                      description={caseData.description}
                      image_url={caseData.main_image_url}
                      case_id={caseData.id}
                      owner={caseData.user_id}
                      saved = {caseData.saved}
                      owner_info = {caseData.user_info}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            </>
          )}
        </Box>
      );
    }


export default SearchResults;
