import { Box, Button, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import RTE from '../../Utils/RTE';
import React, { useState, useEffect } from 'react';
import { useCaseContext } from '../CreateCase';
import { useLocation, useNavigate } from 'react-router-dom';

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

const CASES_API = import.meta.env.VITE_API_CASES_URL;

export default function TextCreator() {
    const [open, setOpen] = React.useState(false);
    const { text, setText, title, setTitle } = useCaseContext();
    const location = useLocation();
    const [caseId, setCaseId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const path = location.pathname;
        const segments = path.split('/');
        const idIndex = segments.findIndex(segment => segment === 'create_case');
        
        if (idIndex !== -1 && segments.length > idIndex + 1) {
            const id = segments[idIndex + 1];
            setCaseId(id);
        }
    }, [location]);

    const handleSave = async () => {
        try {
            const response = await fetch(`${CASES_API}/${caseId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, description: text })
            });
    
            if (response.ok) {
                console.log('Guardado exitoso');
                navigate('/home')
            } else {
                console.error('Error al guardar:', response.statusText);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };

    // const toggleDrawer = (newOpen) => () => {
    //     setOpen(newOpen);
    // };

    // const DrawerList = (
    //     <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
    //         <List>

    //             <ListItem disablePadding>
    //                 <ListItemButton>
    //                     <Typography>Texto</Typography>

    //                 </ListItemButton>
    //             </ListItem>
    //             <ListItem disablePadding>
    //                 <ListItemButton>
    //                     <Typography>Preguntas</Typography>

    //                 </ListItemButton>
    //             </ListItem>
    //             <ListItem disablePadding>
    //                 <ListItemButton>
    //                     <Typography>Links</Typography>
    //                 </ListItemButton>
    //             </ListItem>
    //             <ListItem disablePadding>
    //                 <ListItemButton>
    //                     <Typography>Edición colaborativa</Typography>
    //                 </ListItemButton>
    //             </ListItem>

    //         </List>
    //     </Box>
    // );

    return (
        <Box marginTop={5}>
            <Typography variant="h5" textAlign='center' gutterBottom>
                Creación de casos
            </Typography>
            <TextField
                label="Título"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Box marginTop={2}>
                <Typography variant="subtitle1" gutterBottom>
                    Descripción
                </Typography>
            </Box>
            <Box marginTop={1}>
                <RTE text={text} setText={setText} />
            </Box>
            {/* <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer> */}
            {/* <Button onClick={toggleDrawer(true)}>Cambiar sección de texto</Button> */}
            <SaveCaseButton onClick={handleSave}>Guardar</SaveCaseButton>
        </Box >
    );
}
