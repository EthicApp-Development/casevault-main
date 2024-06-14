import { Box, Button, Typography, TextField, Grid, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import RTE from '../../Utils/RTE';
import React, { useEffect, useState } from 'react';
import { useCaseContext } from '../CreateCase';
import { useNavigate, useParams } from 'react-router-dom';
import { updateCase, getCase, getAllTags, createTag, addTagToCase, deleteTagFromCase } from '../../API/cases';
import { inline_buttons } from "../../Utils/defaultStyles";
import AddIcon from '@mui/icons-material/Add';

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
    const { text, setText, title, setTitle, mainImage, setMainImage, setCaseObject, setTags, tags, description, setDescription } = useCaseContext();
    const { caseId } = useParams();
    const navigate = useNavigate();
    const [allTags, setAllTags] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function fetchCase() {
            try {
                const response = await getCase(caseId);
                if (response.status === 200) {
                    setText(response.data.text || '');
                    setTitle(response.data.title);
                    setDescription(response.data.description || '')
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

    useEffect(() => {
        async function fetchTags() {
            try {
                const response = await getAllTags();
                if (response.status === 200) {
                    setAllTags(response.data);
                } else {
                    console.error('Error al obtener los tags', response.statusText);
                }
            } catch (error) {
                console.error('Error al procesar la solicitud:', error);
            }
        }
        fetchTags();
    }, []);

    const handleAddTag = async (tag) => {
        try {
            const response = await addTagToCase(caseId, tag.id);
            if (response.status === 200) {
                setTags((prevTags) => [...prevTags, tag]);
            } else {
                console.error('Error al agregar la etiqueta:', response.statusText);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };

    const handleCreateTag = async () => {
        try {
            const response = await createTag(search);
            if (response.status === 200) {
                const newTag = response.data;
                await handleAddTag(newTag);
                setSearch('');
            } else {
                console.error('Error al crear la etiqueta:', response.statusText);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };

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

    const handleDeleteTag = async (tagId) => {
        try {
          const response = await deleteTagFromCase(caseId, tagId);
          if (response.status === 200) {
            setTags((prevTags) => prevTags.filter(tag => tag.id !== tagId));
          } else {
            console.error('Error al eliminar la etiqueta:', response.statusText);
          }
        } catch (error) {
          console.error('Error al procesar la solicitud:', error);
        }
      };

    const filteredTags = allTags
        .filter(tag => tag.name.toLowerCase().includes(search.toLowerCase()))
        .filter(tag => !tags.some(caseTag => caseTag.id === tag.id))
        .slice(0, 5); // Limitar a 5 etiquetas

    async function handleSave() {
        const formData = new FormData();
        formData.append('case[title]', title);
        formData.append('case[description]', description);
        formData.append('case[text]', text);
        const blob = await fetch(mainImage).then((response) => response.blob());
        formData.append('case[main_image]', blob);
        try {
            const response = await updateCase(caseId, formData);
            if (response.status === 200) {
                navigate('/home');
            } else {
                console.error('Error al guardar:', response.statusText);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    }

    return (
        <Box marginTop={5} marginRight={2}>
            <Typography variant="h5" textAlign='center' gutterBottom>
                Creación de casos
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Título</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        sx={{marginBottom: 2, marginTop: 2}}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={inline_buttons}>
                    <Typography variant="subtitle1">Etiquetas</Typography>
                        <Box >
                            {tags.map((tag, index) => (
                                <Chip
                                    sx={{marginLeft: 0, marginRight: 2}}
                                    key={tag.id}
                                    label={tag.name}
                                    onDelete={() => handleDeleteTag(tag.id)}
                                />
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{...inline_buttons}}>
                        <TextField
                            label="Buscar Etiqueta"
                            variant="outlined"
                            fullWidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{ marginTop: 2, marginRight: 8}}
                        />
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 2 }}>
                            {filteredTags.map((tag) => (
                                <Chip
                                    key={tag.id}
                                    label={tag.name}
                                    onClick={() => handleAddTag(tag)}
                                />
                            ))}
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCreateTag}
                            disabled={!search}
                            startIcon={<AddIcon />}
                            sx={{ marginTop: 2 }}
                        >
                        </Button>
                    </Box>
                </Grid>
                <Grid item container xs={12}>
                    <Grid item xs={8}>
                        <Box marginTop={2}>
                            <Typography variant="subtitle1" gutterBottom>
                                Descripción
                            </Typography>
                        </Box>
                        <Box marginTop={1}>
                            <TextField
                            label="Descripción del caso"
                            variant='outlined'
                            fullWidth
                            multiline
                            rows={7}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            sx={{ marginTop: 2, marginRight: 7}}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <img src={mainImage} alt={title} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
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
                                <Button variant="subtitle1" component="span">
                                    Cambiar Imagen
                                </Button>
                            </label>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Box marginTop={2}>
                <Typography variant="subtitle1" gutterBottom>
                    Texto del caso
                </Typography>
            </Box>
            <Box marginTop={2}>
                <RTE text={text} setText={setText} />
            </Box>
            <SaveCaseButton onClick={handleSave}>Guardar y salir</SaveCaseButton>
        </Box>
    );
}
