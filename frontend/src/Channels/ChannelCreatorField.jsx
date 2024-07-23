import { Typography, Box, TextField, Button, Collapse, RadioGroup, FormControlLabel, Radio, Tooltip, IconButton } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import AppContext from '../Contexts/AppContext';
import { useContext, useState } from 'react';
import { createChannel } from '../API/channels';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const ChannelCreatorField = ({ open, user_id, setPublicChannels, setPrivateChannels, toggleOpen }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState("private");
    const [openTooltip, setOpenTooltip] = useState('');
    const iconRefs = useRef({});

    async function handleSave() {
        try {
            const response = await createChannel({ name: title, description: description, user_id: user_id, visibility: visibility });
            const newChannel = response.data;

            if (!newChannel.users) {
                newChannel.users = [];
            }
         
            if (visibility === "public") {
                setPublicChannels((prevChannels) => [...prevChannels, newChannel]);
            } else {
                setPrivateChannels((prevChannels) => [...prevChannels, newChannel]);
            }

            setTitle("");
            setDescription("");
            setVisibility("private");
            toggleOpen();
        } catch (error) {
            console.log("No se pudo crear el canal");
        }
    }

    const handleTooltipToggle = (type) => {
        setOpenTooltip((prev) => (prev === type ? '' : type));
    };

    const handleVisibilityChange = async (event) => {
        const newVisibility = event.target.value;
        setVisibility(newVisibility);
    };

    return (
        <Collapse in={open} unmountOnExit sx={{ marginTop: 5 }}>
            <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label={
                    <Typography sx={{ fontWeight: 600 }} color={"primary"}>
                        Título Alternativo
                    </Typography>
                }
                variant="outlined"
                sx={{ marginRight: 0, width: "90%" }}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />
            <TextField
                value={description}
                multiline
                onChange={(e) => setDescription(e.target.value)}
                label={
                    <Typography sx={{ fontWeight: 600 }} color={"primary"}>
                        Descripción (opcional)
                    </Typography>
                }
                variant="outlined"
                sx={{ width: "90%" }}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />
            <RadioGroup value={visibility} onChange={handleVisibilityChange}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <FormControlLabel
                        value="private"
                        control={<Radio />}
                        label="Privado"
                    />
                    <Tooltip
                        PopperProps={{
                            disablePortal: true,
                        }}
                        onClose={() => setOpenTooltip('')}
                        open={openTooltip === 'private'}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title={"Al tener el caso privado, solo será visible para tí y los miembros del canal."}
                    >
                        <IconButton
                            ref={(el) => (iconRefs.current['private'] = el)}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleTooltipToggle('private');
                            }}
                            aria-label="show-more"
                        >
                            <HelpOutlineIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <FormControlLabel
                        value="public"
                        control={<Radio />}
                        label="Público"
                    />
                    <Tooltip
                        PopperProps={{
                            disablePortal: true,
                        }}
                        onClose={() => setOpenTooltip('')}
                        open={openTooltip === 'public'}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title={"Al tener el caso público, será visible para todos y sólo podrán editarlo los miembros del canal"}
                    >
                        <IconButton
                            ref={(el) => (iconRefs.current['public'] = el)}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleTooltipToggle('public');
                            }}
                            aria-label="show-more"
                        >
                            <HelpOutlineIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </RadioGroup>
            <Button
                onClick={handleSave}
                variant="contained"
                style={{ textTransform: 'none', display: 'flex', marginLeft: 'auto', marginBottom: 10 }}
            >
                Guardar
            </Button>
        </Collapse>
    );
}

export default ChannelCreatorField;
