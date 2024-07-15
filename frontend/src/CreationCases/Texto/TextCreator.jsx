import { Box, Button, Typography, TextField, Grid, Chip, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import RTE from '../../Utils/RTE';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { useCaseContext } from '../CreateCase';
import { useParams } from 'react-router-dom';
import { updateCase, getAllTags, createTag, addTagToCase, deleteTagFromCase } from '../../API/cases';
import { inline_buttons } from "../../Utils/defaultStyles";
import AddIcon from '@mui/icons-material/Add';
import AppContext from '../../Contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { getCase } from '../../API/cases';
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
    const { text, setText, title, setTitle, mainImage, setMainImage, setCaseObject, tags, setTags, description, setDescription } = useCaseContext();
    const { caseId } = useParams();
    const {user} = useContext(AppContext)
    const navigate = useNavigate();
    const [allTags, setAllTags] = useState([]);
    const [search, setSearch] = useState('');
    const [saveStatus, setSaveStatus] = useState('');
    const saveStatusRef = useRef(null);
    const [loading, setLoading] = useState('')


    useEffect(() => {
        async function fetchCase() {
            
            setLoading(true)
            if(user) {
            try {
                const response = await getCase(caseId, user.id);
                if (response.status === 200) {
                    setText(response.data.text || '');
                    setTitle(response.data.title);
                    setDescription(response.data.description || '')
                    setMainImage(response.data.main_image_url);
                    setCaseObject(response.data);
                    setLoading(false)
                } else {
                    console.error('Error al obtener el caso:', response.statusText);
                }
            } catch (error) {
                console.error('Error al procesar la solicitud:', error);
            }
        }
        }
        fetchCase();
    }, [caseId,user]);

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

    useEffect(() => {
        if (saveStatus) {
            saveStatusRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [saveStatus]);

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

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = async () => {
            const imageUrl = reader.result;
            setMainImage(imageUrl);
            await handleImageSave(imageUrl);
            setSaveStatus(`Cambios han sido guardados a las ${new Date().toLocaleTimeString()}`);
            setTimeout(() => setSaveStatus(''), 3000);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    async function handleImageSave(imageUrl) {
        const formData = new FormData();
        const blob = await fetch(imageUrl).then((response) => response.blob());
        formData.append('case[main_image]', blob);
        try {
            const response = await updateCase(caseId, formData);
            if (response.status === 200) {
                console.log('Imagen guardada correctamente');
            } else {
                console.error('Error al guardar la imagen:', response.statusText);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    }

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
        .slice(0, 5);

    const handleSave = async (field) => {
        const formData = new FormData();
        formData.append('case[title]', title);
        formData.append('case[description]', description);
        formData.append('case[text]', text);
        if (field === 'image') {
            const blob = await fetch(mainImage).then((response) => response.blob());
            formData.append('case[main_image]', blob);
        }
        try {
            const response = await updateCase(caseId, formData);
            if (response.status === 200) {
                setSaveStatus(`Cambios han sido guardados a las ${new Date().toLocaleTimeString()}`);
                setTimeout(() => setSaveStatus(''), 3000);
            } else {
                console.error('Error al guardar:', response.statusText);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    }
    const handleFieldChange = (setter) => (event) => {
        setter(event.target.value);
    };

    if (loading) {
        return <CircularProgress/>
    }

    return (
        <Box marginTop={5} marginRight={2}>
            <Grid container spacing={2}>
                {/* Left Column */}
                <Grid item xs={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                value={title}
                                onChange={handleFieldChange(setTitle)}
                                onBlur={() => handleSave('title')}
                                label={
                                    <Typography sx={{ fontWeight: 600 }} color={"primary"}>
                                        Título
                                    </Typography>
                                }
                                variant="outlined"
                                fullWidth
                                style={{ margin: "12px 0" }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={inline_buttons}>
                            <Typography variant="subtitle1">Etiquetas</Typography>
                                <Box>
                                    {tags.map((tag, index) => (
                                        <Chip
                                            sx={{ marginLeft: 0, marginRight: 2 }}
                                            key={tag.id}
                                            label={tag.name}
                                            onDelete={() => handleDeleteTag(tag.id)}
                                        />
                                    ))}
                                </Box>
                            </Box>
                            <Box sx={{ ...inline_buttons }}>
                                <TextField
                                    value={search}
                                    onChange={handleFieldChange(setSearch)}
                                    label={
                                        <Typography sx={{ fontWeight: 600 }} color={"primary"}>
                                            Etiquetas
                                        </Typography>
                                    }
                                    variant="outlined"
                                    fullWidth
                                    style={{ margin: "12px 0" }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
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
                                    sx={{ marginTop: 2, textTransform: 'none' }}
                                >
                                    Añadir etiqueta
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={description}
                                onChange={handleFieldChange(setDescription)}
                                onBlur={() => handleSave('description')}
                                label={
                                    <Typography sx={{ fontWeight: 600 }} color={"primary"}>
                                        Descripción del caso
                                    </Typography>
                                }
                                variant='outlined'
                                fullWidth
                                multiline
                                style={{ margin: "12px 0" }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                Texto del caso
                            </Typography>
                            <Box marginTop={2}>
                                <RTE text={text} setText={setText} onBlur={() => handleSave('text')} />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Right Column */}
                <Grid item xs={4} sx={{ position: 'fixed', top: '80px', right: '20px', width: '320px' }}>
                    <Box display="flex" justifyContent="center" marginTop={16}>
                        <Box>
                            <img src={mainImage} alt="Main" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                            <Box display="flex" justifyContent="center" marginTop={1}>
                                <input
                                    id="image-input"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                                <label htmlFor="image-input">
                                    <Button
                                        variant="contained"
                                        component="span"
                                        sx={{ textTransform: 'none' }}
                                    >
                                        Cambiar imagen
                                    </Button>
                                </label>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box ref={saveStatusRef}>
                {saveStatus && <Typography variant="success">{saveStatus}</Typography>}
            </Box>
        </Box>
    );
}
