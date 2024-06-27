import React, { useContext, useEffect, useState } from 'react';
import { CardContent, Card, Typography, Box, CardMedia, IconButton } from '@mui/material';
import TextEllipsis from '../Utils/Ellipsis';
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import IosShareIcon from '@mui/icons-material/IosShare';
import AppContext from '../Contexts/AppContext';
import { saveCase, unsaveCase, savedCase } from '../API/cases';

export default function CaseCardSearch({ title, description, image_url, case_id, owner, saved }) {
    const [localSaved, setLocalSaved] = useState(saved)
    const {user} = useContext(AppContext)
    const navigate = useNavigate();

    const handleCopy = () => {
        const codeToCopy = `<iframe id="casevault-iframe" src="http://localhost:3000/cases/${case_id}" width="800px" height="900px"></iframe>`;
        navigator.clipboard.writeText(codeToCopy);
        alert('Código embebido copiado al portapapeles');
    };

    const handleEdit = () => {
        navigate(`/create_case/${case_id}/text`);
    };

    const handleSaveToggle = async () => {
        if (user) {
            try {
                if (!saved) {
                    await saveCase(case_id, user.id);
                    setLocalSaved(true)
                } else {
                    await unsaveCase(case_id, user.id);
                    setLocalSaved(false)
                }
            } catch (error) {
                console.error('Error al guardar o desguardar el caso:', error.message);
            }
        } else {
            alert('Debes iniciar sesión para guardar el caso.');
        }
    };

    const handleCopyLink = () => {
        const codeToCopy = `${window.location.origin}/show_case/${case_id}/text`;
        navigator.clipboard.writeText(codeToCopy)
          .then(() => alert('Enlace copiado al portapapeles'))
          .catch((error) => console.error('Error al copiar enlace:', error));
      };

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', padding: 2, marginBottom: 2, position: 'relative', minheight: 180 }}>
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
                    </CardContent>
                </Box>
                <Box sx={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)' }}>
                    <IconButton onClick={handleSaveToggle}>
                        {localSaved ? <BookmarkIcon fontSize='large'/> : <BookmarkBorderIcon fontSize='large' color='primary'/>}
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{ height: '10%', width: '100%',display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 2  }} >
                    <IconButton>
                        <IosShareIcon onClick={handleCopy}/>
                    </IconButton>
                    <IconButton onClick={handleCopyLink}>
                        <InsertLinkIcon/>
                    </IconButton>
            </Box>
        </Card>
    );
}
