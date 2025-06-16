import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Typography, Snackbar } from "@mui/material";
import CaseCard from '../Case/CaseCard';
import { useNavigate } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import AppContext from '../Contexts/AppContext';
import { getUserSavedCases } from '../API/cases';
import { getMyChannels } from '../API/channels';
import { title_style } from '../Utils/defaultStyles';

const css = {
    container: {
        width: "100%"
    },
    createContainer: {

    },
    inputRounded: {
        width: '70%',
        borderRadius: '50px',
        '& .MuiOutlinedInput-root': {
            borderRadius: '50px',
        },
    },
    centerAlign: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px', // Space between avatar and input
    },
};

export default function SavedCases() {
    const [cases, setCases] = useState([]);
    const [myChannels, setMyChannels] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();
    const { user } = useContext(AppContext);

    useEffect(() => {
        const fetchCases = async () => {
            if (user) {
                try {
                    const response = await getUserSavedCases(user.id);
                    setCases(response.data.saved_cases);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchCases();
    }, [user]);

    useEffect(() => {
        if (user) {
            const fetchMyChannels = async () => {
                try {
                    const response = await getMyChannels({ user_id: user.id });
                    setMyChannels(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchMyChannels();
        } else {
            console.log('No hay usuario logueado');
        }
    }, [user]);

    const handleClick = (caseId) => (event) => {
        event.stopPropagation();
        navigate(`/show_case/${caseId}/text`);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleCaseAdded = () => {
        setSnackbarMessage('Caso agregado con éxito');
        setSnackbarOpen(true);
    };

    return (
        user?.first_name ? 
            <Box sx={css.container}>
                <Typography sx={{ ...title_style, marginBottom: 5 }} variant="h1" color="primary">Mis casos guardados</Typography>
                <Grid container spacing={8}>
                    {cases?.map(caseData => (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={caseData.id}>
                            <ListItemButton onClick={handleClick(caseData.id)}>
                                <CaseCard
                                    title={caseData.title}
                                    description={caseData.description}
                                    image_url={caseData.main_image_url}
                                    case_id={caseData.id}
                                    owner={caseData.user_info}
                                    owner_info={caseData.user_id}
                                    saved={caseData.saved}
                                    myChannels={myChannels}
                                    onCaseAdded={handleCaseAdded}
                                    avgRating={caseData.average_rating}
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                />
                            </ListItemButton>
                        </Grid>
                    ))}
                </Grid>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                />
            </Box>
            :
            <Box>
            </Box>
    );
}
