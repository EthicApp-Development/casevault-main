import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useToggle from '../../Hooks/ToggleHook';
import AudioField from './AudioField';
import AudioShow from './AudioShow';

export default function AudioCreator() {
    const [openMenu, toggleMenu] = useToggle(false);

    return (
        <Box marginTop={3} sx={{ width: '80%' }}>
            <Typography variant='h2'>Audios relacionados al caso</Typography>
            <IconButton onClick={toggleMenu}>
                <AddCircleOutlineIcon />
            </IconButton>
            <AudioField open={openMenu} toggleMenu={toggleMenu} />
            <AudioShow />
        </Box>
    );
}
