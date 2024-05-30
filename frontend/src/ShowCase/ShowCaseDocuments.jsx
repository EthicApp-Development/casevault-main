import { Box, Typography, IconButton } from '@mui/material'
import { useCaseContext } from "./ShowCase"
import React from 'react';
import { dialog_style, title_style } from '../Utils/defaultStyles';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import newTheme from '../Components/Theme';
import DownloadIcon from '@mui/icons-material/Download';
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

    },
    item:{
        margin: '6px 0',
        borderRadius: 1,
        padding: 0.5,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        flexWrap: 'wrap'
    },
    item_name: {
        flexBasis: '60%',
        flexGrow: 1
    },
    item_actions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1
    }
}

export default function ShowCaseDocuments() {
    const {documents, setDocuments} = useCaseContext()

    return (
        <Box marginTop={3} sx={{width: '80%'}}>
            <Typography variant='h2' sx={title_style}>Documentos relacionados al caso</Typography>
            <Box sx={{marginTop: 3}}>
                {documents.map((document) => (
                    <Box sx={dialog_style} key={document.id}>
                        <Box sx={css.item}>
                            <InsertDriveFileIcon />
                            <Box sx={{...css.item_name, marginLeft: 2}}> 
                                <Typography variant='subtitle1'>{document.title}</Typography>
                                <Typography variant='body1'>{document.description}</Typography>
                            </Box>
                            <Box sx={css.item_actions}>
                                <a href={document.download_url} target="_blank" rel="noreferrer" style={css.link}>
                                    <IconButton>
                                        <DownloadIcon />
                                    </IconButton>
                                </a>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
