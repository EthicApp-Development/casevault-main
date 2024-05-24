import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import { Box, Grid, Container, Button } from "@mui/material";
import axios from "axios";
import CaseCard from "./Case/CaseCard";
import { createCase } from './API/cases';
import getCurrentUser from './Hooks/GetUser';

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
    const currentUser = getCurrentUser();
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const response = await axios.get(CASES_API);
                setCases(response.data.info);
            } catch (error) {
                console.log(error);
            }
            const loggedInUser = localStorage.getItem("authenticated");
            if (loggedInUser) {
                setAuthenticated(loggedInUser);
            }
        };
        fetchCases();
    }, []);

    async function handleCreateCase() {
        const response = await fetch("src/assets/default_case_img.webp");
        const blob = await response.blob();
        const defaultImg = new File([blob], "default_case_img.webp");
        const formData = new FormData();
        formData.append('case[user_id]', currentUser.id);
        formData.append('case[main_image]', defaultImg);
        try {
            const response = await createCase(formData);
            const createdCase = response?.data?.info;
            navigate(`/create_case/${createdCase.id}/text`);
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
                        src="src/assets/images/front_image.jpg"
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
                            <ListItem>
                                <CaseCard
                                    title={caseData.title}
                                    description={caseData.description}
                                    image_url={caseData.main_image_url}
                                    onEdit={() => navigate(`/create_case/${caseData.id}/text`)}
                                />
                            </ListItem>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }
}
