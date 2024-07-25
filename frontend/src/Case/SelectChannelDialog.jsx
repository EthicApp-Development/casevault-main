import React, { useState } from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, Button, TextField } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const SelectChannelDialog = ({ open, onClose, channels, onSelectChannel }) => {
  const [searchText, setSearchText] = useState('');

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleItemClick = (e, channelId) => {
    e.stopPropagation();  // Evitar que el clic se propague
    onSelectChannel(channelId);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle} onClick={(e) => e.stopPropagation()}>
        <Typography variant="h6" component="h2">
          Seleccionar canal
        </Typography>
        <TextField
          fullWidth
          label="Buscar Canal"
          variant="outlined"
          margin="normal"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
        <List>
          {filteredChannels.map((channel) => (
            <ListItem button key={channel.id} onClick={(e) => handleItemClick(e, channel.id)}>
              <ListItemText primary={channel.name} />
            </ListItem>
          ))}
        </List>
        <Button onClick={(e) => { e.stopPropagation(); onClose(); }} sx={{ mt: 2 }}>Cancelar</Button>
      </Box>
    </Modal>
  );
};

export default SelectChannelDialog;
