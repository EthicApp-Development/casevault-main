import { Box, Button, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import RTE from '../../Utils/RTE';
import React, { useState, useEffect } from 'react';
import { useCaseContext } from '../CreateCase';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { updateCase, getCase } from '../../API/cases';

const SaveCaseButton = styled(Button)({
    position: 'absolute',
    bottom: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white',
    backgroundColor: '#282828',
    '&:hover': {
        color: '#282828',
        backgroundColor: 'white',
    },
});

export default function TextCreator() {
    const { text, setText, title, setTitle, setCaseObject } = useCaseContext();
    const { caseId, } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCase() {
            try {
                const response = await getCase(caseId);
                if (response.status === 200) {
                    setText(response.data.description);
                    setTitle(response.data.title);
                    setCaseObject(response.data);
                } else {
                    console.error('Error al obtener el caso:', response.statusText);
                }
            } catch (error) {
                console.error('Error al procesar la solicitud:', error);
            }
        }
        fetchCase();
    }, [caseId]);


    async function handleSave() {
        const body = { title: title, description: text }
        try {
            const response = await updateCase(caseId, body);
            console.log(response);
            if (response.status === 200) {
                navigate('/home')
            } else {
                console.error('Error al guardar:', response.statusText);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };

    return (
        <Box marginTop={5}>
            <Typography variant="h5" textAlign='center' gutterBottom>
                Creación de casos
            </Typography>
            <TextField
                label="Título"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Box marginTop={2}>
                <Typography variant="subtitle1" gutterBottom>
                    Descripción
                </Typography>
            </Box>
            <Box marginTop={1}>
                <RTE text={text} setText={setText} />
            </Box>
            <SaveCaseButton onClick={handleSave}>Guardar</SaveCaseButton>
        </Box >
    );
}
