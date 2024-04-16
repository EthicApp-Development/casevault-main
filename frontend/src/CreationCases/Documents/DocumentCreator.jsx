import { Drawer, Box, Typography, Paper, Button, TextField } from '@mui/material'
import { useState } from 'react';
import React from 'react';
import { paper_style, title_style } from '../../Utils/defaultStyles';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { italic, inline } from '../../Utils/defaultStyles';
import newTheme from '../../Components/Theme';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    axios.post('/upload', formData)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
};

export default function DocumentCreator() {
    const [open, setOpen] = useState(false);


    return (
        <Box marginTop={3}>
            <Typography variant='h2' sx={title_style}>Documentos relacionados al caso</Typography>
            <Paper>
                <Box sx={inline}>
                    <InsertDriveFileIcon />
                    <Typography>
                        <span>
                            nombredocumento.pdf
                        </span>
                    </Typography>
                </Box>

            </Paper>
            <Box marginTop={10}>
                <TextField type="file" />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                    onClick={handleFileUpload}
                >
                    Upload
                </Button>
            </Box>
        </Box>
    );
}
