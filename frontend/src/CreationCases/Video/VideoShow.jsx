import { Drawer, Box, Typography } from '@mui/material'
import RTE from '../../Utils/RTE'
import { useState } from 'react';
import useToggle from '../../Hooks/ToggleHook';
import React from 'react';
import { paper_style, title_style } from '../../Utils/defaultStyles';
import VideoField from './VideoDataField';
import { italic, inline } from '../../Utils/defaultStyles';
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

export default function VideoShow({ url, description }) {
    const [open, setOpen] = useState(false);

    return (
        <Box marginTop={3}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>

            <Typography variant='subtitle1' sx={italic}>
                {description}
            </Typography>

        </Box>
    )
}
