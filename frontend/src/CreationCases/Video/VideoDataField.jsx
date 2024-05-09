import { useState, useEffect } from "react";
import { Box, TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { getCaseVideos, createCaseVideo, deleteCaseVideo } from "../../API/cases";
import { useParams } from 'react-router-dom';

const YT_API_KEY = "AIzaSyCRaU7KOSkcfLlK0ncd2732bcEYtBQDnxA";

const VideoFields = () => {
    const [url, setUrl] = useState('');
    const [videos, setVideos] = useState([]);
    const [title, setTitle] = useState('');
    const { caseId, } = useParams();

    useEffect(() => {
      fetchCaseVideos();
    }, []);

    const fetchCaseVideos = async () => {
        try {
            const response = await getCaseVideos(caseId);
            if (response.status === 200) {
              setVideos(response.data);
            } else {
              alert("Error al obtener los videos del caso");
            }
        } catch (error) {
          alert("Error al procesar la solicitud");
        }
    };

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
        let newCaseData = {
          url: embedUrl,
          title: title || videoTitle,
        };
        try {
          const response = await createCaseVideo(caseId, newCaseData);
          if (response.status === 201) {
              newCaseData.id = response.data.id;
              setVideos([...videos, newCaseData]);
              setUrl('');
              setTitle('');
          } else {
              alert('Hubo un error al guardar el video.');
          }
        } catch (error) {
            alert('Hubo un error al procesar la solicitud.');
        }
    };

    const handleDelete = async (index, videoId) => {
        try {
          const response = await deleteCaseVideo(caseId, videoId)
          if (response.status === 204){
            const newVideos= [...videos];
            newVideos.splice(index, 1);
            setVideos(newVideos);
          }
        } catch (error) {
          alert('Hubo un error al eliminar el video.');
        }
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            size="small"
            rows={4}
            fullWidth
            margin="normal"
          />
          <Button
            onClick={handleSave}
            variant="contained"
            style={{ display: 'flex', marginLeft: 'auto' }}
          >
            Guardar
          </Button>
        </Box>

        {videos.map((video, index) => (
          <Box key={index} sx={{ border: '1px solid black', padding: '10px', marginBottom: '10px', position: 'relative' }}>
              {video.url && (
                  <div>
                      <iframe
                          width="315"
                          height="315"
                          src={video.url}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                      ></iframe>
                  </div>
              )}
              <div>
                <strong>Título:</strong> {video.title}
              </div>
              <IconButton
                  onClick={() => handleDelete(index, video.id)}
                  style={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
              >
                  <DeleteIcon />
              </IconButton>
          </Box>
        )).reverse()}
      </div>
    );
  };

export default VideoFields;
