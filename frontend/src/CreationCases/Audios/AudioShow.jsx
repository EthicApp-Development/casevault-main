import { Box, IconButton, Typography } from '@mui/material'
import { useState } from 'react';
import useToggle from '../../Hooks/ToggleHook';
import React from 'react';
import { paper_style, title_style } from '../../Utils/defaultStyles';
import { italic} from '../../Utils/defaultStyles';
import newTheme from '../../Components/Theme';
import DeleteIcon from '@mui/icons-material/Delete';

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


const handleDelete = async (index, audioId) => {
    try {
        const response = await deleteCaseAudio(caseId, audioId)
        if (response.status === 204){
            const newAudios= [...audios];
            newAudios.splice(index, 1);
            setAudios(newAudios);
        }
    } catch (error) {
        alert('Hubo un error al eliminar el video.');
    }
};

function extractFileName(url) {
    const parts = url.split('/');
    return parts[parts.length - 1];
}

export default function AudioShow({ data }) {

    return (
        <Box marginTop={3}>
                    {data.url && (
                        <iframe
                            style={{ borderRadius: '12px' }}
                            src={data.url}
                            width="95%"
                            height="152"
                            allowFullScreen=""
                            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                    )}
                    {data.file_url && (
                        <div style={{ marginBottom: '10px' }}>
                            <a href={data.file_url} download>{extractFileName(data.file_url)}</a> 
                        </div>
                    )}
                    <div>
                        <strong>Titulo</strong>
                        {data.title}
                    </div>
                    <IconButton
                    onClick={()=> handleDelete(index, data.id)}
                    >
                        <DeleteIcon/>
                    </IconButton>
        </Box>
    )
}
