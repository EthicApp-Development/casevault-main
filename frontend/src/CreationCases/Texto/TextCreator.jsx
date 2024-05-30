import { Box, Button, Typography, TextField, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import RTE from '../../Utils/RTE';
import React, { useEffect } from 'react';
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
    const { text, setText, title, setTitle, mainImage, setMainImage, setCaseObject } = useCaseContext();
    const { caseId, } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCase() {
            try {
                const response = await getCase(caseId);
                if (response.status === 200) {
                    setText(response.data.description || '');
                    setTitle(response.data.title);
                    setMainImage(response.data.main_image_url);
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            setMainImage(reader.result);
        };
    
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    async function handleSave() {
        const formData = new FormData();
        formData.append('case[title]', title);
        formData.append('case[description]', text);
        const blob = await fetch(mainImage).then((response) => response.blob());
        formData.append('case[main_image]', blob);
        try {
            const response = await updateCase(caseId, formData);
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
        <Box marginTop={4}>
            <Grid container spacing={10} columns={16}>
                <Grid item xs={12}>
                    <TextField
                        label="Título"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Typography variant="subtitle1" gutterBottom marginTop={2}>
                        Descripción
                    </Typography>
                    <Box>
                        <RTE text={text} setText={setText} />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Box>
                            <img
                                src={mainImage}
                                alt={title}
                                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="center" marginTop={1}>
                            <input
                                id="image-input"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            <label htmlFor="image-input">
                                <Button variant="contained" component="span">
                                    Cambiar Imagen
                                </Button>
                            </label>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box marginTop={3}>
                <SaveCaseButton onClick={handleSave}>Guardar y salir</SaveCaseButton>
            </Box>
        </Box>
    );
}
