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
        </Box>
    );
}
