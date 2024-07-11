import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Container, Button, TextField, Avatar, Typography, Chip } from "@mui/material";
import CaseCard from "./Case/CaseCard";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import axios from "axios";
import { createCase, getAllTags } from './API/cases';
import {inline_buttons, title_style} from  './Utils/defaultStyles'
import AppContext from './Contexts/AppContext';

const CASES_API = import.meta.env.VITE_API_CASES_URL;

const CreateCaseButton = styled(Button)({
    position: 'relative',
});

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


function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}


function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export default function Home() {
    const [cases, setCases] = useState([]);
    const navigate = useNavigate();
    const {user, setAvatar,avatar} = useContext(AppContext)
    const [authenticated, setauthenticated] = useState(null);
    const [caseTitle, setCaseTitle] = useState("");
    const [tags, setTags] = useState([])

    useEffect(() => {
        const fetchCases = async () => {
            if (user){
                setAvatar(stringAvatar(user?.first_name +" "+ user?.last_name))
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
            const loggedInUser = localStorage.getItem("authenticated");
            if (loggedInUser) {
                setauthenticated(loggedInUser);
            }else{
                navigate("/login")
            }
        };
        fetchCases();
    }, []); 

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
        navigate(`/show_case/${caseId}`);
    };

    const handleClickTag = (tag) => {
        const tagNameWithHash = `${encodeURIComponent("#"+tag.name)}`;
        navigate(`/search/${tagNameWithHash}`);
    };
    

    return (
        (user?.first_name? 
            <Box sx={css.container}>
                <Box sx={{ ...css.createContainer, height: 150 }}>
                    <Typography sx={{...title_style,marginBottom: 5}} variant="h1" color="primary">¡Te damos la bienvenida a CaseVault!</Typography>
                    <Box sx={{...css.centerAlign, inline_buttons}}>
                        <Avatar {...avatar} />
                        <TextField 
                            required
                            id="outlined-basic" 
                            label="Título del caso..." 
                            variant="outlined" 
                            value={caseTitle}
                            onChange={(e) => setCaseTitle(e.target.value)}
                            sx={css.inputRounded} 
                        />
                        <CreateCaseButton variant="contained" onClick={handleCreateCase} disabled={caseTitle===""}>
                            Crear Caso
                        </CreateCaseButton>
                    </Box>
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
            </Box>
        :
        <Box>
        </Box>)
    );
}

