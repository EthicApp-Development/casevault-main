import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getCase } from '../API/cases';
import { Box, Typography, TextField, Grid } from '@mui/material';

function ViewCase() {
    const [mainImage, setMainImage] = useState();
    const [title, setTitle] = useState('');
    const { caseId } = useParams();
    const [description, setDescription] = useState('');

    useEffect(() => {
        async function fetchCase() {
            try {
                const response = await getCase(caseId);
                if (response.status === 200) {
                    setTitle(response.data.title);
                    setMainImage(response.data.main_image_url);
                    setDescription(response.data.description || '');
                } else {
                    console.error('Error al obtener el caso:', response.statusText);
                }
            } catch (error) {
                console.error('Error al procesar la solicitud:', error);
            }
        }
        fetchCase();
    }, [caseId]);

    return (
        <Box marginTop={5}>
            <Typography variant="h1" align='center' gutterBottom>
                <strong>{title}</strong>
            </Typography>
            <Grid container spacing={2}>
                <Grid item container xs={12}>
                    <Grid item xs={8}>
                        <Box marginTop={2}>
                            <div dangerouslySetInnerHTML={{ __html: description }} />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <img src={mainImage} alt={title} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ViewCase;
