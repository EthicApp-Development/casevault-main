import { Drawer, Box, Typography } from '@mui/material'
import RTE from '../../Utils/RTE'
import { useState } from 'react';
import useToggle from '../../Hooks/ToggleHook';
import React from 'react';
import { paper_style, title_style } from '../../Utils/defaultStyles';
import VideoField from './VideoDataField';
import newTheme from '../../Components/Theme';
import VideoShow from './VideoShow';


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

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <Box marginTop={3}>
            <Typography variant='h2' sx={title_style}>Videos relacionados al caso</Typography>
            <Box>
                <VideoField />
            </Box>
        </Box>
    );
}
