import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCaseContext } from "../CreateCase";
import { createCaseVideo } from "../../API/cases";
import { TextField, Button, Collapse, Typography } from "@mui/material";

const YT_API_KEY = import.meta.env.VITE_YT_API_KEY;

const VideoField = ({ open, toggleOpen }) => {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const { caseId } = useParams();
    const { videos, setVideos } = useCaseContext();
    
    const handleSave = async () => {
        let embedUrl = '';
        let videoTitle = '';
        try {
            const videoId = getYouTubeVideoId(url);
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YT_API_KEY}`);
            const data = await response.json();
            
            if (data.items.length > 0) {
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
                videoTitle = data.items[0].snippet.title;
            } else {
                alert("El video no existe en YouTube.");
                return;
            }
        } catch (error) {
            alert("Hubo un error al verificar el video.");
            return;
        }
        let newVideoData = {
            url: embedUrl,
            title: title || videoTitle,
        };
        try {
            const response = await createCaseVideo(caseId, newVideoData);
            if (response.status === 200) {
                setVideos(response.data.info);
                setUrl('');
                setTitle('');
            } else {
                alert('Hubo un error al guardar el video.');
            }
        } catch (error) {
            alert('Hubo un error al procesar la solicitud.');
        }
        toggleOpen();
    };

    const getYouTubeVideoId = (url) => {
        const regExp = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[1].length === 11) {
            return match[1];
        } else {
            throw new Error("No se pudo obtener el ID del video de YouTube.");
        }
    };

    return (
        <Collapse in={open} unmountOnExit>
            <TextField
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                label={
                    <Typography sx={{ fontWeight: 600 }} color={"primary"}>
                        Url de YouTube
                    </Typography>
                }
                variant="outlined"
                fullWidth
                style={{ margin: "12px 0" }}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />
            <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label={
                    <Typography sx={{ fontWeight: 600 }} color={"primary"}>
                        Título Alternativo
                    </Typography>
                }
                variant="outlined"
                fullWidth
                style={{ margin: "12px 0" }}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />
            <Button
                onClick={handleSave}
                variant="contained"
                style={{ textTransform: 'none', display: 'flex', marginLeft: 'auto', marginBottom: 10}}
            >
                Guardar
            </Button>
        </Collapse>
    );
};

export default VideoField;
