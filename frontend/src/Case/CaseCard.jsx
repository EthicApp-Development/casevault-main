import React, { useState, useContext, useEffect } from 'react';
import { Card, CardContent, Typography, CardActionArea, IconButton, Box, Modal, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IosShareIcon from '@mui/icons-material/IosShare';
import Rating from "@mui/material/Rating";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AppContext from '../Contexts/AppContext';
import { useNavigate } from "react-router-dom";
import TextEllipsis from '../Utils/Ellipsis';
import SelectChannelDialog from './SelectChannelDialog';
import { saveCase, unsaveCase, postRatingToCase } from '../API/cases';
import { addCaseToChannel, deleteCaseFromChannel } from '../API/channels';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

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

export default function CaseCard({ title, description, image_url, case_id, owner, saved, owner_info, myChannels = [], inChannel = false, members = null, channelId = null, onCaseDeleted, onCaseAdded, ownerId , avgRating = null }) {
  const [open, setOpen] = useState(false);
  const [selectChannelDialogOpen, setSelectChannelDialogOpen] = useState(false);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [localSaved, setLocalSaved] = useState(saved);
  const [rating, setRating] = useState(avgRating);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSelectChannelDialogOpen = () => setSelectChannelDialogOpen(true);
  const handleSelectChannelDialogClose = () => setSelectChannelDialogOpen(false);

  async function handleSelectChannel(channelId) {
    const response = await addCaseToChannel({ id: channelId, user_id: user.id, case_id: case_id });
    handleSelectChannelDialogClose();
    onCaseAdded();
  };

    const handleCopy = () => {
        const codeToCopy = `<iframe id="casevault-iframe" src="${exportURL}/${case_id}" width="800px" height="900px"></iframe>`;
        navigator.clipboard.writeText(codeToCopy);
        alert('Código embebido copiado al portapapeles');
    };

  const ownerSession = owner_info == user.id;

  const handleSave = async (event) => {
    event.stopPropagation();
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

  const handleEdit = () => {
    navigate(`/create_case/${case_id}/text`);
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
    if (inChannel && channelId) {
      await deleteCaseFromChannel(channelId, case_id);
      onCaseDeleted(case_id);
    }
  };

  const handleRatingChange = async (newRatingValue) => {
    try {
      const roundedValue = Math.round(newRatingValue);
      const response = await postRatingToCase(case_id, roundedValue);
      if (response.status === 200){
        setRating(response.data.average_rating);
      }
    } catch (error) {
      console.error('Error en puntaje', error);
    }
  };
  
  useEffect(() => {
    setRating(avgRating);
  }, [avgRating])

  const isMember = members?.some(member => member?.email === user.email) || ownerId === user?.id;

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', minWidth: '100%', minHeight: '32vw' }}>
        <CardActionArea sx={{ flexGrow: 1 }}>
          <CardContent sx={{ minHeight: '23vw' }}>
            <img src={image_url} alt={title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: 1 }}>
              {title}
            </Typography>
            <TextEllipsis
              text={description ? description : "Este caso no tiene descripción"}
              variant="body1"
              showTooltip={true}
              maxLines={5}
            />
          </CardContent>
        </CardActionArea>
        <Box sx={{ display: 'flex', flexDirection: 'row' , justifyContent: 'flex-start', alignItems: 'center',  gap: 1, }}>
          <Rating
            name="interactive-rating"
            value={rating}
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
          <box sx={{ fontSize: '1rem', color: 'text.secondary' }}>
            {!isNaN(Number(rating)) ? Number(rating).toFixed(1) : ' '}
          </box>
        </Box>
        <Box>
          <Typography sx={{ padding: 2 }} variant="body1"> Creador: {owner.first_name} {owner.last_name}</Typography>
        </Box>
        <Box sx={tabsContainerStyle}>
          {ownerSession &&
            <>
              <IconButton
                onClick={(e) => { e.stopPropagation(); handleEdit(); }}
                sx={tabStyle}
              >
                <EditIcon />
              </IconButton>
            </>
          }
          {inChannel && isMember &&
            <IconButton
              onClick={(e) => { e.stopPropagation(); handleDelete(e); }}
              sx={tabStyle}
            >
              <DeleteIcon />
            </IconButton>
          }
          <IconButton
            onClick={(e) => { e.stopPropagation(); handleSelectChannelDialogOpen(); }}
            sx={tabStyle}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            onClick={(e) => { e.stopPropagation(); handleOpen(); }}
            sx={tabStyle}
          >
            <IosShareIcon />
          </IconButton>
          <IconButton
            onClick={(e) => { e.stopPropagation(); handleSave(e); }}
            sx={tabStyle}
          >
            {localSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
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
        <SelectChannelDialog
          open={selectChannelDialogOpen}
          onClose={handleSelectChannelDialogClose}
          channels={myChannels}
          onSelectChannel={handleSelectChannel}
        />
      </Card>
    );
}
