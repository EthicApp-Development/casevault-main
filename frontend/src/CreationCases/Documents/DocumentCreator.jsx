import React from 'react';
import useToggle from '../../Hooks/ToggleHook';
import { Box, Typography, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { title_style } from '../../Utils/defaultStyles';
import DocumentField from './DocumentField';
import DocumentShow from './DocumentShow';

export default function DocumentCreator() {
    const [openMenu, toggleMenu] = useToggle(false);

    return (
        <Box marginTop={3} sx={{ width: '80%' }}>
            <Typography variant='h2' sx={title_style}>Documentos relacionados al caso</Typography>
            <IconButton onClick={toggleMenu}>
                <AddCircleOutlineIcon />
            </IconButton>
            <DocumentField open={openMenu} toggleMenu={toggleMenu} />
            <DocumentShow />
        </Box>
    );
}
