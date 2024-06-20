import React from 'react';
import newTheme from '../Components/Theme';
import { useCaseContext } from "./ShowCase";
import { dialog_style, title_style } from '../Utils/defaultStyles';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Typography, IconButton } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const css = {
    link: {
        cursor: 'pointer',
        fontWeight: 600,
        textDecoration: 'underline',
        color: newTheme.palette.info.main,
    },
    container: {
        marginBottom: 3,
    },
    interspace: {
        background: 'black',
        height: 12,
    },
    item: {
        margin: '6px 0',
        borderRadius: 1,
        padding: 0.5,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        flexWrap: 'wrap',
    },
    item_name: {
        flexBasis: '60%',
        flexGrow: 1,
    },
    item_actions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1,
    },
};

const handleDownload = (url, title) => {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = title;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(error => console.error('Download error:', error));
};

export default function ShowCaseDocuments() {
    const { documents } = useCaseContext();

    return (
        <Box marginTop={3} sx={{ width: '80%' }}>
            <Typography variant='h2' sx={title_style}>Documentos relacionados al caso</Typography>
            <Box sx={{ marginTop: 3 }}>
                {documents.map((document) => (
                    <Box sx={dialog_style} key={document.id}>
                        <Box sx={css.item}>
                            <InsertDriveFileIcon />
                            <Box sx={{ ...css.item_name }}>
                                <Typography variant='subtitle1'>{document.title}</Typography>
                            </Box>
                            <Box sx={css.item_actions}>
                                <IconButton onClick={() => handleDownload(document.document_url, document.title)}>
                                    <DownloadIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
