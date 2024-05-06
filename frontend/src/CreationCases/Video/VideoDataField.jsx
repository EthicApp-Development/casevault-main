import { useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const YT_API_KEY = "AIzaSyCRaU7KOSkcfLlK0ncd2732bcEYtBQDnxA";

const VideoFields = () => {
    const [url, setUrl] = useState('');
    const [alternativeTitle, setAlternativeTitle] = useState('');
    const [savedData, setSavedData] = useState([]);
  
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
            console.error("Error al verificar el video:", error);
            alert("Hubo un error al verificar el video.");
            return;
        }
        
        const newDatas = {
            url: url,
            alternativeTitle: alternativeTitle || videoTitle,
            embedUrl: embedUrl
        };
        setSavedData([newDatas, ...savedData]);
  
        setUrl('');
        setAlternativeTitle('');
    };

    const handleDelete = (index) => {
        const newData = [...savedData];
        newData.splice(index, 1);
        setSavedData(newData);
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
      <div>
        <Box sx={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
          <TextField
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Título Alternativo"
            value={alternativeTitle}
            onChange={(e) => setAlternativeTitle(e.target.value)}
            variant="outlined"
            size="small"
            rows={4}
            fullWidth
            margin="normal"
          />
          <IconButton onClick={handleSave}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>
  
        {savedData.map((data, index) => (
          <Box key={index} sx={{ border: '1px solid black', padding: '10px', marginBottom: '10px', position: 'relative' }}>
            {data.embedUrl && (
                <div>
                    <iframe
                        width="315"
                        height="315"
                        src={data.embedUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
            <div>
              <strong>Título:</strong> {data.alternativeTitle}
            </div>
            <IconButton
                onClick={() => handleDelete(index)}
                style={{ position: 'absolute', top: 0, right: 0 }}
            >
                <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </div>
    );
  };

export default VideoFields;
