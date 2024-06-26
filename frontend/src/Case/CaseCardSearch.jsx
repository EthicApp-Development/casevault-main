import React, { useState } from 'react';
import {CardContent,Card, Typography, Box, CardMedia, IconButton} from '@mui/material';
import TextEllipsis from '../Utils/Ellipsis';
import { useContext} from 'react';
import AppContext from '../Contexts/AppContext';
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'; 
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function CaseCardSearch({ title, description, image_url, case_id, owner }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCopy = () => {
        const codeToCopy = `<iframe id="casevault-iframe" src="http://localhost:3000/cases/${case_id}" width="800px" height="900px"></iframe>`;
        navigator.clipboard.writeText(codeToCopy);
        alert('Código embebido copiado al portapapeles');
    }; 


    const handleEdit = () => {
        navigate(`/create_case/${case_id}/text`);
    };

    return (
        <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, marginBottom: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 151, height: 151, backgroundColor: '#f0f0f0' }}
            image={image_url}
            alt={title}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, ml: 2 }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {description}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <IconButton aria-label="save">
                {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            </Box>
          </Box>
        </Card>

    );
}
