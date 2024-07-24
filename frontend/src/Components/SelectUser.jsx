import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { end_buttons, end_flex_buttons, dialog_style, inline_space_title, dialog_style_white } from '../Utils/defaultStyles';
import Clear from "@mui/icons-material/Clear";
import NewMultiSelectInput from './MultiSelectInput';
import { addUsersToChannel } from '../API/channels';

function SelectUsersDialog({ open, onClose, users = [], channel_id, user, members, setMembers, onMembersUpdate }) {
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (members && members.length > 0) {
            const preselected = members.map(member => member.id.toString());
            setSelectedOptions(preselected);
        }
    }, [members]);

    const handleChange = (event) => {
        setSelectedOptions(event.target.value);
    };

    const options = users.map(user => ({
        value: user.id.toString(),
        label: `${user.first_name} ${user.last_name} (${user.email})`,
        email: user.email
    }));

    async function onFinish() {
        const response = await addUsersToChannel(channel_id, { user_ids: selectedOptions, user_id: user.id });
        console.log("RESPUESTA", response?.data?.members)
        const updatedMembers = users.filter(user => selectedOptions.includes(user.id.toString()));
        setMembers(updatedMembers);
        onMembersUpdate(response?.data?.members);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <Box sx={dialog_style_white}>
                <Box sx={inline_space_title}>
                    <Typography variant='h4'>Seleccionar Usuarios</Typography>
                    <IconButton onClick={onClose}>
                        <Clear />
                    </IconButton>
                </Box>
                <Box>
                    <NewMultiSelectInput
                        value={selectedOptions}
                        onChange={handleChange}
                        options={options}
                        label="Usuarios"
                        name="categories"
                        required={true}
                    />
                </Box>
                <Box sx={end_flex_buttons}>
                    <Button onClick={onClose} variant="outlined">
                        Cancelar
                    </Button>
                    <Button onClick={onFinish} variant="contained">
                        Actualizar Usuarios
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}

export default SelectUsersDialog;
