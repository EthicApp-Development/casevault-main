import { Drawer, Box, List, ListItem, ListItemButton, Button, Typography } from '@mui/material'
import RTE from '../../Utils/RTE'
import { useState, useContext } from 'react';
import React from 'react';
import { useCaseContext } from '../CreateCase';

export default function TextCreator() {
    const [open, setOpen] = React.useState(false);
    const { text, setText } = useCaseContext();

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
                <RTE text={text} setText={setText} />
            </Box>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Box >
    );
}
