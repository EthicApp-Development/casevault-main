import { Typography, Box, List, ListItem, ListItemText, Grid, ListItemButton, Card, CardContent, Avatar, IconButton, Tooltip, Snackbar, Button } from '@mui/material';
import CaseCard from '../Case/CaseCard';
import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../Contexts/AppContext';
import { inline_buttons, inline_space_end, title_style } from '../Utils/defaultStyles';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import EditIcon from '@mui/icons-material/Edit';
import { getAllUsers, getUser } from '../API/user';
import { useParams, useNavigate } from 'react-router-dom';
import { getChannel, getMyChannels, removeMember } from '../API/channels';
import SelectUsersDialog from '../Components/SelectUser';
import useToggle from '../Hooks/ToggleHook';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
const ShowChannel = () => {
  const { user } = useContext(AppContext);
  const [channel, setChannel] = useState([]);
  const { channelId } = useParams();
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const [myChannels, setMyChannels] = useState([]);
  const [openUsers, toggleOpenUsers] = useToggle(false);
  const [currentMembers, setCurrentMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (channel.creator_id) {
        const response = await getUser(channel.creator_id);
        setUserInfo(response.data.info);
      }
    }
    fetchData();
  }, [channel.creator_id]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getChannel({ id: channelId, user_id: user.id });
        setChannel(response.data);
        setCurrentMembers(response.data.users);
      } catch (error) {
        console.log('Error al obtener el canal');
      }
    }
    if (user) {
      fetchData();
    }
  }, [channelId, user]);

  useEffect(() => {
    if (user) {
      async function fetchData() {
        try {
          const response = await getMyChannels({ user_id: user.id });
          setMyChannels(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchData();
    } else {
      console.log('No hay usuario logueado');
    }
  }, [user]);

  const handleClick = (caseId) => (event) => {
    event.stopPropagation();
    navigate(`/show_case/${caseId}`);
  };

  const handleMembersUpdate = (members) => {
    setCurrentMembers(members);
  };

  const handleCaseDeleted = (caseId) => {
    setChannel((prevChannel) => ({
      ...prevChannel,
      cases: prevChannel.cases.filter((caseData) => caseData.id !== caseId)
    }));
    setSnackbarMessage('Caso eliminado con éxito');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLeaveChannel = async () => {
    try {
      await removeMember(channelId, user.id);
      setCurrentMembers((prevMembers) => prevMembers.filter(member => member.id !== user.id));
      setSnackbarMessage('Has abandonado el canal');
      setSnackbarOpen(true);
      navigate('/channels'); // Navega a la página de canales del usuario después de salir del canal
    } catch (error) {
      console.error('Error leaving the channel:', error);
      setSnackbarMessage('Error al abandonar el canal');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box>
      <Box sx={inline_space_end}>
        <Box sx={inline_buttons}>
          <RecentActorsIcon fontSize="large" sx={{ marginRight: 2 }} />
          <Typography variant="h1" color="primary">
            Canal: {channel.name}
          </Typography>
        </Box>
      </Box>
      <Box sx={{...inline_buttons, marginTop: 3}}>
        <Typography variant='subtitle2'>Descripción: </Typography>
        <Typography sx={{ padding: 1 }} variant='body2'>{channel?.description}</Typography>
      </Box>
      <Box sx={inline_buttons}>
        <Typography variant='subtitle2'>Creado por: </Typography>
        <Typography sx={{ padding: 1 }} variant='body2'>{userInfo?.first_name} {userInfo?.last_name} ({userInfo?.email})</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
        <Typography variant='subtitle2'>Miembros del canal: </Typography>
        {channel.creator_id === user?.id && (
          <Tooltip title="Editar miembros">
            <IconButton onClick={toggleOpenUsers}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Grid container spacing={2} sx={{ padding: 1, maxHeight: 200, overflow: 'auto' }}>
        {currentMembers.map(member => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={member.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar>{member.first_name[0]}{member.last_name[0]}</Avatar>
                  <Box sx={{ marginLeft: 2 }}>
                    <Typography variant="body1">{member.first_name} {member.last_name}</Typography>
                    <Typography variant="body2" color="textSecondary">{member.email}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {currentMembers.some(member => member.id === user.id) && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button startIcon={<ExitToAppIcon/>} variant="contained" color="primary" onClick={handleLeaveChannel} sx={{ textTransform: 'none' }}>
            Salir del canal
          </Button>
        </Box>
      )}
      <Typography variant="h5" sx={{ ...title_style, marginTop: 3 }}>Casos pertenecientes al canal</Typography>
      {channel?.cases &&
        <Grid container spacing={8}>
          {channel?.cases.map(caseData => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={caseData.id}>
              <ListItemButton onClick={handleClick(caseData.id)}>
                <CaseCard
                  title={caseData.title}
                  description={caseData.description}
                  image_url={caseData.main_image_url}
                  case_id={caseData.id}
                  owner={caseData.user_info}
                  owner_info={caseData.user_id}
                  saved={caseData.saved}
                  channels={myChannels}
                  inChannel = {true}
                  channelId = {channelId}
                  members = {currentMembers}
                  ownerId = {channel?.creator_id}
                  onCaseDeleted={handleCaseDeleted} 
                  onCaseAdded={() => {
                    setSnackbarMessage('Caso agregado con éxito');
                    setSnackbarOpen(true);
                  }}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                />
              </ListItemButton>
            </Grid>
          ))}
        </Grid>
      }
      <SelectUsersDialog
        open={openUsers}
        onClose={toggleOpenUsers}
        users={users}
        setMembers={setCurrentMembers}
        channel_id={channelId}
        user={userInfo}
        members={currentMembers}
        onMembersUpdate={handleMembersUpdate}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ShowChannel;
