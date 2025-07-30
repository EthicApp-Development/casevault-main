import React, { useState, useContext, useEffect } from 'react';
import { Card, CardContent, Typography, CardActionArea, IconButton, Box, Modal, Button, CardMedia, Chip } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IosShareIcon from '@mui/icons-material/IosShare';
import Rating from "@mui/material/Rating";
import { useCaseContext } from "/src/ShowCase/ShowCase.jsx";
import AppContext from '../Contexts/AppContext';
import { useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { postRatingToCase } from '../API/cases';

const exportURL = import.meta.env.VITE_API_EXPORT_CASE_URL;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const codeBoxStyle = {
  fontFamily: 'monospace',
  backgroundColor: '#f5f5f5',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ddd',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word'
};

const tabStyle = {
  borderRight: '1px solid #ddd',
  '&:last-of-type': {
    borderRight: 'none'
  },
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
  textTransform: 'none',
};

const tabsContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  borderTop: '1px solid #ddd',
  borderBottom: '1px solid #ddd'
};

export default function InsideCaseImageCard({ image_url, case_id, tags }) {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const {avgeRating, SetAvgeRating} = useCaseContext();

  const handleCopy = () => {
      const codeToCopy = `<iframe id="casevault-iframe" src="${exportURL}/${case_id}" width="800px" height="900px"></iframe>`;
      navigator.clipboard.writeText(codeToCopy);
      alert('Código embebido copiado al portapapeles');
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRatingChange = async (newRatingValue) => {
    try {
      const roundedValue = Math.round(newRatingValue);
      const response = await postRatingToCase(case_id, roundedValue);
      if (response.status === 200){
        SetAvgeRating(response.data.average_rating);
      }
    } catch (error) {
      console.error('Error en puntaje', error);
    }
  };
  
  useEffect(() => {
    SetAvgeRating(avgeRating);
  }, [avgeRating]);

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', minWidth: '100%' }}>
          <CardMedia
            component="img"
            height="auto"
            width="100%"
            image={image_url}
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {tags.map(tag => (
                  <Chip key={tag.id} label={tag.name} 
                      sx={{ 
                          margin: '4px',
                          fontSize: '1.1rem',
                          padding: '10px',
                      }} 
                  />
              ))}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' , justifyContent: 'center', alignItems: 'center',  gap: 1, marginLeft: 2 }}>
            <Rating
              name="interactive-rating"
              value={avgeRating}
              precision={0.5}
              max={5}
              onChange={(e, newValue) => {
                e.stopPropagation();
                handleRatingChange(newValue);
              }}
              onClick={(e) => e.stopPropagation()}
              icon={<StarIcon fontSize="inherit" />}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
            <Box sx={{ fontSize: '1rem', color: 'text.secondary' }}>
              {!isNaN(Number(avgeRating)) ? Number(avgeRating).toFixed(1) : ' '}
            </Box>
          </Box>
          <Box sx={tabsContainerStyle}>
            <IconButton
              onClick={(e) => { e.stopPropagation(); handleOpen(); }}
              sx={tabStyle}
            >
              <IosShareIcon />
            </IconButton>
          </Box>
          <Modal open={open} onClose={(e) => { e.stopPropagation(); handleClose(); }}>
            <Box sx={modalStyle}>
              <Typography variant="h6" component="h2">
                Código embebido
              </Typography>
              <Box sx={codeBoxStyle}>
                {`<iframe id="casevault-iframe" src="${exportURL}/${case_id}" width="800px" height="900px"></iframe>`}
              </Box>
              <Button variant="contained" color="primary" onClick={(e) => { e.stopPropagation(); handleCopy(); }} sx={{ mt: 2 }}>
                Copiar
              </Button>
            </Box>
          </Modal>
      </Card>
    );
}
