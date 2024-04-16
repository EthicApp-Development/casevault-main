import { Drawer, Box, List, ListItem, ListItemIcon, ListItemButton, ListItemText, Divider, Button, Typography } from '@mui/material'
import RTE from '../../Utils/RTE'
import { useState } from 'react';
import useToggle from '../../Hooks/ToggleHook';
import React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CreateCaseTab from '../CreateCase';

export default function TextCreator() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>

                <ListItem disablePadding>
                    <ListItemButton>
                        <Typography>Texto</Typography>

                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <Typography>Preguntas</Typography>

                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <Typography>Links</Typography>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <Typography>Edición colaborativa</Typography>
                    </ListItemButton>
                </ListItem>

            </List>
        </Box>
    );

    return (
        <Box marginTop={5}>
            <Button onClick={toggleDrawer(true)}>Cambiar sección de texto</Button>
            <Box marginTop={3}>
                <RTE />
            </Box>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Box >
    );
}
