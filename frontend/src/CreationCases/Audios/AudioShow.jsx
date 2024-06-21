import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import Typography from '@mui/material/Typography';
import { deleteCaseAudio } from '../../API/cases';
import { useCaseContext } from '../CreateCase';
import { dialog_style } from "../../Utils/defaultStyles";

const css = {
    item: {
        margin: '6px 0',
        borderRadius: 1,
        padding: 0.5,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        flexWrap: 'wrap',
    },
    fixedSizeCard: {
        width: '800px',
        height: '220px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        padding: '10px',
    },
    downloadCard: {
        width: '800px',
        height: '100px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        padding: '10px',
    },
    itemName: {
        marginLeft: 2,
        wordWrap: 'break-word',
        whiteSpace: 'normal',
    },
    iframeContainer: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px',
        marginBottom: '25px',
    },
};

const AudioShow = () => {
    const { caseId } = useParams();
    const { audios, setAudios } = useCaseContext();

    const handleDelete = async (index, audioId) => {
        try {
            const response = await deleteCaseAudio(caseId, audioId);
            if (response.status === 204) {
                const newAudios = [...audios];
                newAudios.splice(index, 1);
                setAudios(newAudios);
            }
        } catch (error) {
            alert('Hubo un error al eliminar el audio.');
        }
    };

    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {audios.map((data, index) => {
                    const isDownloadable = Boolean(data.file_url);
                    return (
                        <Box
                            sx={{
                                ...dialog_style,
                                ...(isDownloadable ? css.downloadCard : css.fixedSizeCard),
                            }}
                            key={index}
                        >
                            <Box sx={css.itemName}>
                                <Typography variant='h2'>{data.title}</Typography>
                                {data.file_url && (
                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                        <a href={data.file_url} download>
                                            {data.title}
                                        </a>
                                        <IconButton href={data.file_url} download>
                                            <DownloadIcon />
                                        </IconButton>
                                    </div>
                                )}
                            </Box>
                            <Box sx={css.item}>
                                {data.url && (
                                    <Box sx={css.iframeContainer}>
                                        <iframe
                                            style={{ borderRadius: '12px' }}
                                            src={data.url}
                                            width="100%"
                                            height="152"
                                            frameBorder="0"
                                            allowFullScreen=""
                                            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                            loading="lazy"
                                        ></iframe>
                                    </Box>
                                )}
                            </Box>
                            <IconButton
                                onClick={() => handleDelete(index, data.id)}
                                sx={{ position: 'absolute', top: '10px', right: '10px'}}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    );
                }).reverse()}
            </Box>
        </div>
    );
};

export default AudioShow;
