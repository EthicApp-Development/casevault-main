import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextEllipsis from '../Utils/Ellipsis';
import { useContext} from 'react';
import AppContext from '../Contexts/AppContext';
import { useNavigate } from "react-router-dom";

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
    }
};

const tabsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    borderTop: '1px solid #ddd',
    borderBottom: '1px solid #ddd'
};

export default function CaseCard({ title, description, image_url, case_id, owner }) {
    const [open, setOpen] = useState(false);
    const {user, setAvatar,avatar} = useContext(AppContext)
    const navigate = useNavigate();
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCopy = () => {
        const codeToCopy = `<iframe id="casevault-iframe" src="http://localhost:3000/cases/${case_id}" width="800px" height="900px"></iframe>`;
        navigator.clipboard.writeText(codeToCopy);
        alert('Código embebido copiado al portapapeles');
    };


    const ownerSession = owner == user.id 


    const handleEdit = () => {
        navigate(`/create_case/${case_id}/text`);
    };

    return (
        <Card sx={{ maxWidth: 700 }}>
            <CardActionArea>
                <CardContent>
                    <img src={image_url} alt={title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <TextEllipsis 
                        text={description ? description : ""} 
                        variant="body1" 
                        showTooltip={true} 
                        maxLines={5} 
                    />
                </CardContent>
            </CardActionArea>
            <Box sx={tabsContainerStyle}>
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {ownerSession && 
                    <Tab label="Editar" sx={tabStyle} onClick={(e) => { e.stopPropagation(); handleEdit(); }} />
                    }

                    <Tab label="Compartir" sx={tabStyle} onClick={(e) => { e.stopPropagation(); handleOpen(); }} />
                </Tabs>
            </Box>
            <Modal open={open} onClose={(e) => { e.stopPropagation(); handleClose(); }}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2">
                        Código embebido
                    </Typography>
                    <Box sx={codeBoxStyle}>
                        {`<iframe id="casevault-iframe" src="http://localhost:3000/cases/${case_id}" width="800px" height="900px"></iframe>`}
                    </Box>
                    <Button variant="contained" color="primary" onClick={(e) => {e.stopPropagation(); handleCopy(); }} sx={{ mt: 2 }}>
                        Copiar
                    </Button>
                </Box>
            </Modal>
        </Card>
    );
}
