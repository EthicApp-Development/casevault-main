import { Avatar, Card, CardActions, IconButton, Typography, Box, Grid, Tooltip } from "@mui/material";
import newTheme from "../Components/Theme";
import { title_style } from "../Utils/defaultStyles";
import { useContext, useEffect, useState } from "react";
import { getUser } from "../API/user";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import SelectUsersDialog from "../Components/SelectUser";
import useToggle from "../Hooks/ToggleHook";
import AppContext from "../Contexts/AppContext";
import { useNavigate } from "react-router-dom";

const ChannelCard = ({ id, title, user_id, description, users, members, onMembersUpdate }) => {
    const [userInfo, setUserInfo] = useState();
    const [hovered, setHovered] = useState(false);
    const [openUsers, toggleOpenUsers] = useToggle(false);
    const [currentMembers, setCurrentMembers] = useState(members);
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const response = await getUser(user_id);
            setUserInfo(response.data.info);
        }
        fetchData();
    }, [user_id]);

    function handleClick() {
        navigate(`/show_channel/${id}`);
    }

    const handleMembersUpdate = (updatedMembers) => {
        setCurrentMembers(updatedMembers);
        if (onMembersUpdate) {
            onMembersUpdate(updatedMembers); 
        }
    };

    const displayCount = currentMembers.length > 2 ? 2 : currentMembers.length;
    const extraCount = currentMembers.length > 2 ? currentMembers.length - 2 : 0;

    const icons = [];
    for (let i = 0; i < displayCount; i++) {
        icons.push(<AccountCircleOutlinedIcon key={i} fontSize="small" />);
    }

    return (
        <>
            <Card onClick={handleClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                sx={{
                    display: 'flex', alignItems: "center", marginBottom: 5, padding: 2, cursor: 'pointer', boxShadow: hovered ? '8px 8px 8px 8px rgba(0.1, 0.1, 0.1, 0.1)' : '2px 2px 2px 2px rgba(0.1, 0.1, 0.1, 0.1)',
                    transition: 'box-shadow 0.3s ease',
                    width: "95%"
                }}>
                <Avatar
                    alt="Playlist cover"
                    sx={{ width: 56, height: 56 }} />
                <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 2, flex: 1 }}>
                    <Typography variant="h4" sx={title_style} component="div">
                        {title}
                    </Typography>
                    <Typography variant="subtitle" color={newTheme.secondary}>
                        {description}
                    </Typography>
                    <Typography sx={{ marginTop: 1, marginBottom: 1 }} variant="subtitle" color={newTheme.secondary}>
                        Creado por: {userInfo?.email}
                    </Typography>
                    <Grid container alignItems="center" sx={{ marginTop: 1 }}>
                        {icons}
                        {extraCount > 0 && (
                            <Typography>
                                +{extraCount} miembros
                            </Typography>
                        )}
                    </Grid>
                </Box>
                <CardActions>
                    {user.id === user_id && 
                    <Tooltip title={"Editar miembros"}>
                        <IconButton onClick={(event) => { event.stopPropagation(); toggleOpenUsers(); }}>
                            <PersonAddOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    }
                </CardActions>
            </Card>
            <SelectUsersDialog open={openUsers} onClose={toggleOpenUsers} users={users}  setMembers ={setCurrentMembers}  channel_id={id} user={userInfo} members={currentMembers} onMembersUpdate={handleMembersUpdate} />
        </>
    );
};

export default ChannelCard;
