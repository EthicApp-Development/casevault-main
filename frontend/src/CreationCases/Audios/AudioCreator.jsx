import { Drawer, Box, Typography, Paper, Button } from '@mui/material'
import { useState } from 'react';
import React from 'react';
import { paper_style, title_style } from '../../Utils/defaultStyles';
import { italic, inline } from '../../Utils/defaultStyles';
import newTheme from '../../Components/Theme';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';

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

export default function AudioCreator() {
    const [open, setOpen] = useState(false);


    return (
        <Box marginTop={3}>
            <Typography variant='h2' sx={title_style}>Audios relacionados al caso</Typography>
            <Paper>
                <Box sx={inline}>
                    <AudiotrackIcon />
                    <Typography>
                        <span>
                            nombredocumento.pdf
                        </span>
                    </Typography>
                </Box>

            </Paper>
            <Box marginTop={10}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUploadIcon />}

                >
                    Upload
                </Button>
            </Box>
        </Box>
    );
}
