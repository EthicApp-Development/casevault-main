import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Collapse, TextField, ToggleButtonGroup, ToggleButton, Button, Typography } from '@mui/material';
import { createCaseAudio } from '../../API/cases';
import { useCaseContext } from '../CreateCase';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_API_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_API_CLIENT_SECRET;

const AudioField = ({ open, toggleMenu }) => {
    const [accessToken, setAccessToken] = useState('');
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [selectedOption, setSelectedOption] = useState('url');
    const { caseId } = useParams();
    const { audios, setAudios } = useCaseContext();

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
                console.log(error);
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

        toggleMenu();
    };

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    return (
        <Collapse in={open} unmountOnExit>
            <ToggleButtonGroup
                value={selectedOption}
                exclusive
                onChange={handleOptionChange}
                aria-label="Elija la opción"
                size="small"
                sx={{ marginBottom: '10px' }}
            >
                <ToggleButton sx={{ textTransform: 'none' }} value="url">Desde URL</ToggleButton>
                <ToggleButton sx={{ textTransform: 'none' }} value="file">Desde Archivo</ToggleButton>
            </ToggleButtonGroup>
            {selectedOption === 'url' ? (
                <TextField
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    label={
                        <Typography sx={{ fontWeight: 600 }} color={"primary"}>
                            Url de Spotify
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
            ) : (
                <>
                    <div style={{ alignItems: 'center' }}>
                        <input
                            id="audio-input"
                            type="file"
                            accept=".mp3,.wav"
                            style={{ display: 'none' }}
                            onChange={handleChange}
                        />
                        <label htmlFor="audio-input">
                            <Button sx={{ textTransform: 'none' }} variant="contained" component="span">
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label={
                    <Typography sx={{ fontWeight: 600 }} color={"primary"}>
                        Título Alternativo
                    </Typography>
                }
                variant="outlined"
                fullWidth
                style={{ marginBottom: "12px 0" }}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />
            <Button
                onClick={handleSave}
                variant="contained"
                style={{ display: 'flex', marginLeft: 'auto', marginBottom: 10, textTransform: 'none' }}
            >
                Guardar
            </Button>
        </Collapse>
    );
};

export default AudioField;
