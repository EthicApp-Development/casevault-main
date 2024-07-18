import React, { useContext, useState } from 'react';
import { CardContent, Card, Typography, Box, CardMedia, IconButton } from '@mui/material';
import TextEllipsis from '../Utils/Ellipsis';
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import IosShareIcon from '@mui/icons-material/IosShare';
import AppContext from '../Contexts/AppContext';
import { saveCase, unsaveCase } from '../API/cases';
import EditIcon from '@mui/icons-material/Edit';

const exportURL = import.meta.env.VITE_API_EXPORT_CASE_URL;

export default function CaseCardSearch({ title, description, image_url, case_id, owner, saved, owner_info }) {
    const [localSaved, setLocalSaved] = useState(saved);
    const { user } = useContext(AppContext);
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);

    const handleCopy = () => {
        const codeToCopy = `<iframe id="casevault-iframe" src="${exportURL}/${case_id}" width="800px" height="900px"></iframe>`;
        navigator.clipboard.writeText(codeToCopy);
        alert('Código embebido copiado al portapapeles');
    };

    const handleCopyLink = () => {
        const codeToCopy = `${window.location.origin}/show_case/${case_id}`;
        navigator.clipboard.writeText(codeToCopy)
            .then(() => alert('Enlace copiado al portapapeles'))
            .catch((error) => console.error('Error al copiar enlace:', error));
    };

    const handleEdit = () => {
        navigate(`/create_case/${case_id}/text`);
    };

    const handleSaveToggle = async (event) => {
        event.stopPropagation(); // Detener la propagación del evento al hacer clic en el botón
        if (user) {
            try {
                if (!localSaved) {
                    await saveCase(case_id, user.id);
                    setLocalSaved(true);
                } else {
                    await unsaveCase(case_id, user.id);
                    setLocalSaved(false);
                }
            } catch (error) {
                console.error('Error al guardar o desguardar el caso:', error.message);
            }
        } else {
            alert('Debes iniciar sesión para guardar el caso.');
        }
    };

    const handleClick = () => {
        navigate(`/show_case/${case_id}`);
    };

    return (
        <Card onClick={handleClick} 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{ display: 'flex', flexDirection: 'column', padding: 2, marginBottom: 2, position: 'relative', minHeight: 180, cursor: 'pointer', boxShadow: hovered ? '8px 8px 8px 8px rgba(0.1, 0.1, 0.1, 0.1)' : '2px 2px 2px 2px rgba(0.1, 0.1, 0.1, 0.1)',
            transition: 'box-shadow 0.3s ease' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 151, height: 151, backgroundColor: '#f0f0f0', marginLeft: '40px' }}
                    image={image_url}
                    alt={title}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, ml: 2, maxWidth: '60%' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Box sx={{ padding: 2 }}>
                            <Typography variant="h7">
                                {title}
                            </Typography>
                            <TextEllipsis text={description || "Este caso no tiene descripción"} variant="body1" showTooltip maxLines={3} />
                        </Box>
                        <Box>
                            <Typography sx={{padding: 2}} variant="subtitle">Creador: {owner_info.first_name} {owner_info.last_name}</Typography>
                        </Box>
                    </CardContent>
                </Box>
                <Box sx={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)' }}>
                    <IconButton onClick={handleSaveToggle}>
                        {localSaved ? <BookmarkIcon fontSize='large' /> : <BookmarkBorderIcon fontSize='large' color='primary' />}
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{ height: '10%', width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 2 }} >
                {user.id == owner && <IconButton onClick={(e) => { e.stopPropagation(); handleEdit(); }}>
                    <EditIcon />
                </IconButton>    }           
                <IconButton onClick={(event) => { event.stopPropagation(); handleCopy(); }}>
                    <IosShareIcon />
                </IconButton>
                <IconButton onClick={(event) => { event.stopPropagation(); handleCopyLink(); }}>
                    <InsertLinkIcon />
                </IconButton>
            </Box>
        </Card>
    );
}
