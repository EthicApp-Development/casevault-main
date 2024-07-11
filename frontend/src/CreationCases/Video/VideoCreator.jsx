import React from 'react';
import VideoShow from './VideoShow';
import VideoField from './VideoField';
import useToggle from '../../Hooks/ToggleHook';
import { title_style } from '../../Utils/defaultStyles';
import { Box, Typography, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function VideoCreator() {
    const [open, toggleOpen] = useToggle(false);

    return (
        <Box marginTop={3}>
            <Typography variant='h2' sx={title_style}>Videos relacionados al caso</Typography>
            <IconButton onClick={toggleOpen}>
                <AddCircleOutlineIcon />
            </IconButton>
            <Box>
                <VideoField open={open} toggleOpen={toggleOpen} />
                <VideoShow />
            </Box>
        </Box>
    );
}
