import { Box, TextField, IconButton, ToggleButtonGroup, ToggleButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCaseAudios, createCaseAudio, deleteCaseAudio } from '../../API/cases';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_API_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_API_CLIENT_SECRET;

const AudioFields = () => {
    const [accessToken, setAccessToken] = useState('');
    const [url, setUrl] = useState('');
    const [audios, setAudios] = useState([]);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [selectedOption, setSelectedOption] = useState('url');
    const { caseId } = useParams();

    useEffect(() => {
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
    }, {})

    useEffect(() => {
        fetchCaseAudios();
    }, []);

    const fetchCaseAudios = async () => {
        try {
            const response = await getCaseAudios(caseId);
            if (response.status === 200) {
                setAudios(response.data);
            } else {
                alert("Error al obtener los videos del caso");
            }
        } catch (error) {
            alert("Error al procesar la solicitud");
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

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    function extractFileName(url) {
        const parts = url.split('/');
        return parts[parts.length - 1];
    }

    return (
        <div>
            <Box sx={{ border: '1px solid black', padding: '10px', marginBottom: '10px', width: '800px' }}>
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
                <Button
                    onClick={handleSave}
                    variant="contained"
                    style={{ display: 'flex', marginLeft: 'auto' }}
                >
                    Guardar
                </Button>
            </Box>

            {audios.map((data, index) => (
                <Box key={index} sx={{ border: '1px solid black', padding: '10px', marginBottom: '10px', position: 'relative' }}>
                    {data.url && (
                        <iframe
                            style={{ borderRadius: '12px' }}
                            src={data.url}
                            width="95%"
                            height="152"
                            frameBorder="0"
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
                        <strong>Título:</strong> {data.title}
                    </div>
                    <IconButton
                        onClick={() => handleDelete(index, data.id)}
                        style={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            )).reverse()}
        </div>
    );
};

export default AudioFields;
