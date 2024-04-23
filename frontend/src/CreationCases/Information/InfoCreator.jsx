import { Drawer, Box, Typography, Paper, Button, TextField } from '@mui/material';
import { useState } from 'react';
import React from 'react';
import { paper_style, title_style } from '../../Utils/defaultStyles';
import newTheme from '../../Components/Theme';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useContext } from 'react';
import { useCaseContext } from '../CreateCase';

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

export default function InfoCreator() {
    const [open, setOpen] = useState(false);
    const { title, setTitle, summary, setSummary } = useCaseContext();

    return (
        <Box marginTop={3}>
            <Typography variant='h2' sx={title_style}>Información</Typography>
            <Paper>
                <TextField
                    id="standard-basic"
                    label="Título"
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    id="standard-multiline-static"
                    label="Resumen"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                    variant="standard"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                />
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
