import React, { useState, useEffect } from 'react';
import { Box, Grid, Container, Button } from "@mui/material";
import CaseCard from "./Case/CaseCard";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import axios from "axios";
import getCurrentUser from './Hooks/GetUser';
import { Navigate } from 'react-router-dom';
import { createCase } from './API/cases';
const CASES_API = import.meta.env.VITE_API_CASES_URL;

const BackgroundBox = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '233px',
    backgroundColor: '#ccc',
    overflow: 'hidden',
});

const CreateCaseButton = styled(Button)({
    position: 'absolute',
    bottom: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
});

export default function Home() {
    const [cases, setCases] = useState([]);
    const navigate = useNavigate();
    const currentUser = getCurrentUser()
    const [authenticated, setauthenticated] = useState(null);
    
    useEffect(() => {
        const fetchCases = async () => {
            try {
                const response = await axios.get(CASES_API);
                setCases(response.data);
            } catch (error) {
                console.log(error);
            }
            const loggedInUser = localStorage.getItem("authenticated");
            if (loggedInUser) {
              setauthenticated(loggedInUser);
            }
        };
        fetchCases();
    }, []); 

    async function handleCreateCase() {
        const body = {user_id: currentUser.id}
        try {
            const response = await createCase(body);
            
            const createdCase = response?.data?.info;
            navigate(`/create_case/${createdCase.id}/text`)

        } catch (error) {
            console.error("Error al crear el caso:", error);
        }

    }
    
    if (!authenticated) {
        <Navigate replace to="/login" />;
        } else {
        return (
            
            <Container maxWidth="xl">
                <BackgroundBox>
                    <img
                        src="src/assets/Shutterstock_2072700533.jpg"
                        alt="Imagen de fondo"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <CreateCaseButton variant="contained" onClick={handleCreateCase}>
                        Crear Caso
                    </CreateCaseButton>
                </BackgroundBox>

                <Grid container spacing={2}>
                    {cases.map(caseData => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={caseData.id}>
                            <ListItemButton onClick={() => navigate(`/create_case/${caseData.id}/text`)}>
                                <CaseCard title={caseData.title} description={caseData.description} />
                            </ListItemButton>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }
}
