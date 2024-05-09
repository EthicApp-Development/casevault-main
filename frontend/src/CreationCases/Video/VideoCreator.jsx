import { Box, Typography } from '@mui/material'
import { useState } from 'react';
import React from 'react';
import { title_style } from '../../Utils/defaultStyles';
import VideoField from './VideoDataField';
import newTheme from '../../Components/Theme';


const css = {
    link: {
        cursor: 'pointer',
        fontWeight: 600,
        textDecoration: 'underline',
        color: newTheme.palette.info.main
    },
    container: {
        marginBottom: 3
    },
    interspace: {
        background: 'black',
        height: 12,

    }
}

export default function VideoCreator() {
    const [open, setOpen] = useState(false);

    return (
        <Box marginTop={3}>
            <Typography variant='h2' sx={title_style}>Videos relacionados al caso</Typography>
            <Box>
                <VideoField />
            </Box>
        </Box>
    );
}
