import { TextField, Button, Typography,Box, IconButton, Collapse, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { Backup } from "@mui/icons-material";
import { addDocumentToCase } from "../../API/cases";
import { useParams } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { inline_buttons } from '../../Utils/defaultStyles';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_API_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_API_CLIENT_SECRET;


export function AudioCreatorField({setAudios,open, accessToken}) {

  const [title, setTitle] = useState("");
  const [audio, setAudio] = useState(null);
  const { caseId} = useParams()
  const [selectedOption, setSelectedOption] = useState('url')
  const [fileName, setFileName] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);


  const handleChange = (e) => {
    const selectedAudio = e.target.files[0];
    if (selectedAudio) {
        setFile(selectedAudio);
        setFileName(selectedAudio.name);
    }
    };

  const handleOptionChange = (event, newOption) => {
    setSelectedOption(newOption);
    };

    const handleSave = async () => {
        let embedUrl = '';
        let audioTitle = '';
        
        if (file && selectedOption === 'file') {
            const formData = new FormData();
            formData.append('audio[file]', file);
            formData.append('audio[title]', title || fileName);
            let newAudioData = {
                title: title || audioTitle,
            };
            try {
                const response = await createCaseAudio(caseId, formData);
                if (response.status === 201) {
                    newAudioData.id = response.data.id;
                    newAudioData.type = selectedOption;
                    setAudios([...audios, response.data]);
                    setFile(null);
                    setFileName('');
                } else {
                    alert('Hubo un error al guardar el audio.');
                }
            } catch (error) {
                alert('Hubo un error al procesar la solicitud.');
            }
        } else if (url.includes('spotify.com') && selectedOption === 'url') {
            const spotifyId = url.split('/').pop();
            const searchParams = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            }
            try {
                const responseTracks = await fetch(`https://api.spotify.com/v1/tracks/${spotifyId}`, searchParams);
                const responseEpisodes = await fetch(`https://api.spotify.com/v1/episodes/${spotifyId}`, searchParams);
                const dataTrack = await responseTracks.json();
                const dataEpisode = await responseEpisodes.json();
                if (responseTracks.status === 200){
                    embedUrl = `https://open.spotify.com/embed/track/${spotifyId}`;
                    audioTitle = dataTrack.name;
                } else if (responseEpisodes.status === 200) {
                    embedUrl = `https://open.spotify.com/embed/episode/${spotifyId}`;  // episodes API not working
                    audioTitle = dataEpisode.name;
                } else {
                    alert('Error al obtener los detalles de la pista de Spotify');
                    return
                }
            } catch (error) {
                alert('Error al obtener los detalles de la pista de Spotify');
                return
            }

            let newAudioData = {
                url: embedUrl,
                title: title || audioTitle,
            };

            try {
                const response = await createCaseAudio(caseId, newAudioData);
                if (response.status === 201) {
                    newAudioData.id = response.data.id;
                    newAudioData.type = selectedOption;
                    setAudios([...audios, newAudioData]);
                    setUrl('');
                    setTitle('');
                } else {
                    alert('Hubo un error al guardar el audio.');
                }
            } catch (error) {
                alert('Hubo un error al procesar la solicitud.');
            }
        } else {
            alert('Formato inválido');
            return
        }
    };

  return (
    <Collapse in={open} unmountOnExit>
        <TextField
            label="Título Alternativo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            size="small"
            rows={4}
            fullWidth
            margin="normal"
            sx={{ marginBottom: '10px' }}
        />
        <ToggleButtonGroup
            value={selectedOption}
            exclusive
            onChange={handleOptionChange}
            aria-label="Elija la opción"
            size="small"
            sx={{ marginBottom: '10px' }}
        >
            <ToggleButton value="url">Desde URL</ToggleButton>
            <ToggleButton value="file">Desde Archivo</ToggleButton>
        </ToggleButtonGroup>
        {selectedOption === 'url' ? (
                    <TextField
                        label="URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        variant="outlined"
                        size="small"
                        fullWidth
                        margin="normal"
                        sx={{ marginBottom: '10px' }}
                    />
                ) : (
                    <>
                        <div style={{alignItems: 'center' }}>
                            <input
                                id="audio-input"
                                type="file"
                                accept=".mp3,.wav"
                                style={{ display: 'none' }}
                                onChange={handleChange}
                            />
                            <label htmlFor="audio-input">
                                <Button variant="contained" component="span">
                                    Subir archivo .mp3/.wav
                                </Button>
                            </label>
                            {fileName && (
                                <span style={{ marginLeft: '10px' }}>{fileName}</span>
                            )}
                        </div>
                    </>
                )}
      <Button onClick={handleSave} sx={{ marginLeft: 10, marginTop: 5 }} variant="outlined">
        Agregar
      </Button>
      </Collapse>
  );
}
