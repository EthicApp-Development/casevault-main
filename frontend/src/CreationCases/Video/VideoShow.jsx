import React from 'react';
import { useParams } from 'react-router-dom';
import { useCaseContext } from "../CreateCase";
import { dialog_style } from "../../Utils/defaultStyles";
import { deleteCaseVideo } from "../../API/cases";
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography, IconButton } from "@mui/material";

const css = {
    item: {
        margin: '6px 0',
        borderRadius: 1,
        padding: 0.5,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        flexWrap: 'wrap'
    },
    fixedSizeCard: {
        width: '600px', 
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    itemName: {
        marginLeft: 1,
        wordWrap: 'break-word',
        whiteSpace: 'normal',
    },
};

const VideoShow = () => {
    const { caseId } = useParams();
    const { videos, setVideos } = useCaseContext();

    const handleDelete = async (index, videoId) => {
        try {
            const response = await deleteCaseVideo(caseId, videoId);
            if (response.status === 200) {
                const newVideos = [...videos];
                newVideos.splice(index, 1);
                setVideos(newVideos);
            }
        } catch (error) {
            alert('Hubo un error al eliminar el video.');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {videos.map((video, index) => (
                <Box sx={{ ...dialog_style, ...css.fixedSizeCard }} key={index}>
                    <Box sx={css.itemName}>  
                        <Typography variant='h2'>{video.title}</Typography>
                    </Box>
                    <Box sx={css.item}>
                        {video.url && (
                            <div>
                                <iframe
                                    width="500"
                                    height="315"
                                    src={video.url}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>  
                        )}
                        <Box>
                            <IconButton onClick={() => handleDelete(index, video.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            )).reverse()}
        </Box>
    );
};

export default VideoShow;
