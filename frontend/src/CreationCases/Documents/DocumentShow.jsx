import React from 'react';
import { useParams } from 'react-router-dom';
import { useCaseContext } from '../CreateCase';
import { deleteDocuments } from '../../API/cases';
import { dialog_style } from '../../Utils/defaultStyles';
import { Box, Typography, IconButton } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

const css = {
    link: {
        cursor: 'pointer',
        fontWeight: 600,
        textDecoration: 'underline',
        color: 'blue',
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

const DocumentShow = () => {
    const { caseId } = useParams();
    const { documents, setDocuments } = useCaseContext();
    console.log(documents);

    const handleDeleteDocument = async (documentId) => {
        try {
            const response = await deleteDocuments(caseId, documentId);
            setDocuments(response.data.info);
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    };

    return (
        <Box sx={{ marginTop: 3 }}>
            {documents.map((document) => (
                <Box sx={dialog_style} key={document.id}>
                    <Box sx={css.item}>
                        <InsertDriveFileIcon />
                        <Box sx={{ ...css.item_name, marginLeft: 2 }}>
                            <Typography variant='subtitle1'>{document.title}</Typography>
                            <Typography variant='body1'>{document.description}</Typography>
                        </Box>
                        <Box sx={css.item_actions}>
                            <IconButton onClick={() => handleDownload(document.document_url, document.title)}>
                                <DownloadIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteDocument(document.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default DocumentShow;
