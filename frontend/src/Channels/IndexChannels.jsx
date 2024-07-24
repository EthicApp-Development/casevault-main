import { Typography, Box, IconButton, Tooltip, Tabs, Tab, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import AppContext from '../Contexts/AppContext';
import { useContext, useState } from 'react';
import { inline_buttons, inline_space_end } from '../Utils/defaultStyles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getPublicChannels, getMyChannels } from '../API/channels';
import ChannelCreatorField from './ChannelCreatorField';
import useToggle from '../Hooks/ToggleHook';
import ChannelCard from './ChannelCard';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { getAllUsers } from '../API/user';

const IndexChannels = () => {
  const { user } = useContext(AppContext);
  const [publicChannels, setPublicChannels] = useState([]);
  const [privateChannels, setPrivateChannels] = useState([]);
  const [openCreator, toggleCreator] = useToggle();
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllUsers();
        setUsers(response.data.info);
      } catch (error) {
        console.log('Error al obtener usuarios');
      }
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    if (user) {
      async function fetchData() {
        try {
          const [publicResponse, privateResponse] = await Promise.all([
            getPublicChannels(),
            getMyChannels({ user_id: user.id }),
          ]);
          setPublicChannels(publicResponse.data);
          setPrivateChannels(privateResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchData();
    } else {
      console.log('No hay usuario logueado');
    }
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMembersUpdate = (channelId, updatedMembers) => {
    const updateChannels = (channels) => channels.map(channel =>
      channel.id === channelId ? { ...channel, users: updatedMembers } : channel
    );
    setPublicChannels(updateChannels(publicChannels));
    setPrivateChannels(updateChannels(privateChannels));
  };

  const channelsToShow = selectedTab === 0 ? publicChannels : privateChannels;
  const filteredChannels = channelsToShow.filter(channel =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={inline_space_end}>
        <Box sx={inline_buttons}>
          <RecentActorsIcon fontSize="large" sx={{ marginRight: 2 }} />
          <Typography variant="h1" color="primary">
            Canales
          </Typography>
        </Box>
        <Tooltip title="Crear nuevo canal">
          <IconButton onClick={toggleCreator}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      <ChannelCreatorField
        open={openCreator}
        setPublicChannels={setPublicChannels}
        setPrivateChannels={setPrivateChannels}
        user_id={user?.id}
        toggleOpen={toggleCreator}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 5 }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
          <Tabs aria-label="basic tabs example" value={selectedTab} onChange={handleTabChange}>
            <Tab label="Canales públicos" value={0} sx={{ textTransform: 'none' }} />
            <Tab label="Mis canales" value={1} sx={{ textTransform: 'none' }} />
          </Tabs>
        </Box>
        <TextField
          label="Buscar canales"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginTop: 4, width: "95%" }}
        />
      </Box>
      {filteredChannels.length === 0 ? (
        <Typography>No hay canales disponibles</Typography>
      ) : (
        <Box>
          {filteredChannels.map((channel) => (
            <ChannelCard
              key={channel.id}
              title={channel.name}
              user_id={channel.creator_id}
              description={channel.description || ''}
              members={channel.users}
              id={channel.id}
              users={users}
              onMembersUpdate={(updatedMembers) => handleMembersUpdate(channel.id, updatedMembers)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default IndexChannels;
