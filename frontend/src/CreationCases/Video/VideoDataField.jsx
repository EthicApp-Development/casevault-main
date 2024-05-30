import { useState, useEffect } from "react"
import { Box, TextField, Button, IconButton, Collapse, Typography} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import { getCaseVideos, createCaseVideo, deleteCaseVideo } from "../../API/cases"
import { useParams } from 'react-router-dom'
import { useCaseContext } from "../CreateCase"
import { dialog_style } from "../../Utils/defaultStyles"
const YT_API_KEY = "AIzaSyCRaU7KOSkcfLlK0ncd2732bcEYtBQDnxA"
const css = {
  item:{
    margin: '6px 0',
    borderRadius: 1,
    padding: 0.5,
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    flexWrap: 'wrap'
  },
}
const VideoFields = ({open, toggleOpen}) => {
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const { caseId } = useParams()
    const {videos, setVideos} = useCaseContext()
    

    const handleSave = async () => {
        let embedUrl = ''
        let videoTitle = ''
        try {
            const videoId = getYouTubeVideoId(url)
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YT_API_KEY}`)
            const data = await response.json()
            
            if (data.items.length > 0) {
                embedUrl = `https://www.youtube.com/embed/${videoId}`
                videoTitle = data.items[0].snippet.title
            } else {
                alert("El video no existe en YouTube.")
                return;
            }
        } catch (error) {
            alert("Hubo un error al verificar el video.")
            return;
        }
        let newVideoData = {
          url: embedUrl,
          title: title || videoTitle,
        };
        try {
          const response = await createCaseVideo(caseId, newVideoData)
          if (response.status === 200) {
              setVideos(response.data.info)
              setUrl('')
              setTitle('')
          } else {
              alert('Hubo un error al guardar el video.');
          }
        } catch (error) {
            alert('Hubo un error al procesar la solicitud.');
        }
        toggleOpen()
    }

    const handleDelete = async (index, videoId) => {
        try {
          const response = await deleteCaseVideo(caseId, videoId);
          if (response.status === 200){
            const newVideos = [...videos];
            newVideos.splice(index, 1)
            setVideos(newVideos);
          }
        } catch (error) {
          alert('Hubo un error al eliminar el video.')
        }
    }

    const getYouTubeVideoId = (url) => {
        const regExp = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[1].length === 11) {
            return match[1];
        } else {
            throw new Error("No se pudo obtener el ID del video de YouTube.");
        }
    }
    return (
      <>
        <Collapse in={open} unmountOnExit>
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
        </Collapse>
        {videos.map((video, index) => (
          <Box sx={{...dialog_style,marginTop: 5}} key={index}>
              <Box sx={{...css.item_name, marginLeft: 2}}> 
                <Typography variant='subtitle1'>Título</Typography>
                <Typography variant='body1'>{video.title}</Typography>
              </Box>
            <Box sx={css.item}>
              {video.url && (
                <div>
                  <iframe
                      width="315"
                      height="315"
                      src={video.url}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                  ></iframe>
                </div>  
              )}
              <Box sx={css.item_actions}>
                <IconButton onClick={() => handleDelete(index, video.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        )).reverse()}
      </>
    );
  };

export default VideoFields;
