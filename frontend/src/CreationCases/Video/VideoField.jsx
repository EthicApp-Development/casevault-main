import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCaseContext } from "../CreateCase";
import { createCaseVideo } from "../../API/cases";
import { TextField, Button, Collapse, Typography } from "@mui/material";

const VideoField = ({ open, toggleOpen }) => {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const { caseId } = useParams();
    const { videos, setVideos } = useCaseContext();
    
    const handleSave = async () => {
        let videoTitle = '';
        try {
            const response = await createCaseVideo(caseId, { video: { url: url, title: title || videoTitle,}});
            if (response.status === 200 || response.status === 201) {
                console.log('backend video response: ', response.data);
                if (Array.isArray(response.data.info)){
                    setVideos(response.data.info);
                }                
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
