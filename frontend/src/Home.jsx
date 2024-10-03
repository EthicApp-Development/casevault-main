import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles'
import ListItemButton from '@mui/material/ListItemButton';
import { Box, Grid, Button, TextField, Chip, FormControl, Snackbar } from "@mui/material";
import CaseCard from "./Case/CaseCard";
import AppContext from './Contexts/AppContext';
import { createCase, getAllTags } from './API/cases';
import { inline_buttons } from  './Utils/defaultStyles';
import { getMyChannels } from "./API/channels";
import { getFromLocalStorage } from './storage-commons'

const CASES_API = import.meta.env.VITE_API_CASES_URL;

const CreateCaseButton = styled(Button)({
    position: 'relative',
    textTransform: 'none',
});

const css = {
    container: {
        width: "100%"
    },
    createContainer: {
        padding: '20px',
        marginBottom: '20px'
    },
    inputRounded: {
        width: '40%',
        borderRadius: '50px',
        '& .MuiOutlinedInput-root': {
            borderRadius: '50px',
        },
    },
    centerAlign: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
    },
    formLabel: {
        textAlign: 'center',
        marginBottom: '10px',
        width: '100%',
    },
};

export default function Home() {
    const [cases, setCases] = useState([]);
    const navigate = useNavigate();
    const {user} = useContext(AppContext)
    const [authenticated, setauthenticated] = useState(null);
    const [caseTitle, setCaseTitle] = useState("");
    const [tags, setTags] = useState([])
    const [myChannels, setMyChannels] = useState([])
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchCases = async () => {
            if (user){
                try {
                    const response = await axios.get(CASES_API, {
                        params: {
                            user_id: user.id // Enviar user_id como parámetro
                        }
                    });
                    setCases(response.data.info);
                    
                } catch (error) {
                    console.log(error);
                }
            }
            const loggedInUser = getFromLocalStorage("authenticated");
            if (loggedInUser) {
                setauthenticated(loggedInUser);
            } else {
                navigate("/login")
            }
        };
        fetchCases();
    }, [user, navigate]); 

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await getAllTags()
                setTags(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTags();
    }, []); 

    useEffect(() => {
        if (user) {
          async function fetchData() {
            try {
              const response = await getMyChannels({ user_id: user.id });
              setMyChannels(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
          fetchData();
        } else {
          console.log('No hay usuario logueado');
        }
      }, [user]);

    async function handleCreateCase() {
        const response = await fetch("src/assets/default_case_img.png");
        const blob = await response.blob();
        const defaultImg = new File([blob], "default_case_img.png");
        const formData = new FormData();
        formData.append('case[user_id]', user.id);
        formData.append('case[main_image]', defaultImg);
        formData.append('case[title]',caseTitle)
        try {
            const response = await createCase(formData);
            const createdCase = response?.data?.info;
            navigate(`/create_case/${createdCase.id}/text`)
        } catch (error) {
            console.error("Error al crear el caso:", error);
        }
    }
    
    const handleClick = (caseId) => (event) => {
        event.stopPropagation();
        navigate(`/show_case/${caseId}/text`);
    };

    const handleClickTag = (tag) => {
        const tagNameWithHash = `${encodeURIComponent("#"+tag.name)}`;
        navigate(`/search/${tagNameWithHash}`);
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
                <Box sx={css.createContainer}>
                    <FormControl fullWidth>
                        <Box sx={{ ...css.centerAlign, ...inline_buttons }}>
                            <TextField 
                                required
                                id="case-title"
                                label="Título del caso..."
                                variant="outlined"
                                value={caseTitle}
                                onChange={(e) => setCaseTitle(e.target.value)}
                                sx={css.inputRounded}
                            />
                            <CreateCaseButton 
                                variant="contained" 
                                onClick={handleCreateCase} 
                                disabled={caseTitle === ""}
                            >
                                Crear caso
                            </CreateCaseButton>
                        </Box>
                    </FormControl>
                </Box>
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
                <Grid container spacing={8}>
                    {cases?.map(caseData => (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={caseData.id}>
                            <ListItemButton onClick={handleClick(caseData.id)}>
                                <CaseCard
                                    title={caseData.title}
                                    description={caseData.description}
                                    image_url={caseData.main_image_url}
                                    case_id={caseData.id}
                                    owner = {caseData.user_info}
                                    owner_info = {caseData.user_id}
                                    saved = {caseData.saved}
                                    myChannels={myChannels}
                                    onCaseAdded={handleCaseAdded}
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
        <Box></Box>
    );
}
