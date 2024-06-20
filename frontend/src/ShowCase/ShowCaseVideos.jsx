import React from 'react';
import { Box, Typography } from "@mui/material";
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
    iframeContainer: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

const ShowCaseVideos = () => {
    const { videos } = useCaseContext();

    return (
        <>
            {videos.map((video, index) => (
                <Box sx={{ ...dialog_style, ...css.fixedSizeCard, marginTop: 5 }} key={index}>
                    <Box sx={css.itemName}> 
                        <Typography variant='h2'>{video.title}</Typography>
                    </Box>
                    <Box sx={css.item}>
                        {video.url && (
                            <Box sx={css.iframeContainer}>
                                <iframe
                                    width="500"
                                    height="315"
                                    src={video.url}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </Box>
                        )}
                    </Box>
                </Box>
            )).reverse()}
        </>
    );
}

export default ShowCaseVideos;
