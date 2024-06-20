import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useCaseContext } from "./ShowCase";
import { dialog_style } from "../Utils/defaultStyles";

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
        height: '250px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    downloadCard: {
        width: '800px',
        height: '100px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        marginBottom: '10px', // Para elevar el iframe
    },
};

const ShowCaseAudios = () => {
    const { audios } = useCaseContext();

    return (
        <div>
            {audios.map((data, index) => {
                const isDownloadable = Boolean(data.file_url);

                return (
                    <Box
                        sx={{
                            ...dialog_style,
                            ...(isDownloadable ? css.downloadCard : css.fixedSizeCard),
                            marginTop: 5,
                        }}
                        key={index}
                    >
                        <Box sx={css.itemName}>
                            <Typography variant='body1'>{data.title}</Typography>
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
                            {data.file_url && (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <a href={data.file_url} download>
                                        {data.title}
                                    </a>
                                    <IconButton href={data.file_url} download>
                                        <DownloadIcon />
                                    </IconButton>
                                </div>
                            )}
                        </Box>
                    </Box>
                );
            }).reverse()}
        </div>
    );
};

export default ShowCaseAudios;

