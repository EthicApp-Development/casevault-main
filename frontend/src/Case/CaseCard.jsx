import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextEllipsis from '../Utils/Ellipsis';
import { useContext} from 'react';
import AppContext from '../Contexts/AppContext';
import { useNavigate } from "react-router-dom";
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import IosShareIcon from '@mui/icons-material/IosShare';
import { saveCase, unsaveCase } from '../API/cases';

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

export default function CaseCard({ title, description, image_url, case_id, owner, saved}) {
    const [open, setOpen] = useState(false);
    const {user, setAvatar,avatar} = useContext(AppContext)
    const navigate = useNavigate();
    const [localSaved, setLocalSaved] = useState(saved);
    const [selectedTab, setSelectedTab] = useState(0);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCopy = () => {
        const codeToCopy = `<iframe id="casevault-iframe" src="http://localhost:3000/cases/${case_id}" width="800px" height="900px"></iframe>`;
        navigator.clipboard.writeText(codeToCopy);
        alert('Código embebido copiado al portapapeles');
    };


    const ownerSession = owner == user.id 

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

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', minWidth: '100%', minHeight: '32vw'}}>
        <CardActionArea sx={{ flexGrow: 1 }}>
          <CardContent sx={{minHeight: '23vw'}}>
            <img src={image_url} alt={title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <Typography gutterBottom variant="h5" component="div" sx={{marginTop:1}}>
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
        <Box sx={tabsContainerStyle}>
                {ownerSession && 
                    <IconButton
                        onClick={(e) => { e.stopPropagation(); handleEdit(); }}
                        sx={tabStyle}
                   
                    >
                        <EditIcon />
                    </IconButton>
                }
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
              {`<iframe id="casevault-iframe" src="http://localhost:3000/cases/${case_id}" width="800px" height="900px"></iframe>`}
            </Box>
            <Button variant="contained" color="primary" onClick={(e) => { e.stopPropagation(); handleCopy(); }} sx={{ mt: 2 }}>
              Copiar
            </Button>
          </Box>
        </Modal>
      </Card>
    );
}
