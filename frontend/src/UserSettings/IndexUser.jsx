import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Container, Button, TextField, Switch, Typography, Card, Divider, Stack } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import AppContext from '../Contexts/AppContext';
import { title_style } from '../Utils/defaultStyles';
import newTheme from "../Components/Theme";
import { patchUser } from '../API/user';

const css = {
    container: {
        width: "100%"
    },
    createContainer: {

    },
    inputRounded: {
        width: '70%',
        borderRadius: '50px',
        '& .MuiOutlinedInput-root': {
            borderRadius: '50px',
        },
    },
    centerAlign: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
    },
};

export default function IndexUser() {
  const { user, setUser } = useContext(AppContext);
  const [checked, setChecked] = useState(user?.track_tag_searches ?? true);

  const handleChange = async (event) => {
    const newValue = event.target.checked;
    setChecked(newValue);
    try {
      await patchUser(user.id, { track_tag_searches: newValue });

      // Update context
      setUser(prev => ({...prev, track_tag_searches: newValue}));
    } catch (error) {
      console.error('Error al actualizar las preferencias: ', error);
    }
  };
  useEffect(() => {
    if (user) {
      setChecked(user.track_tag_searches);
    }
  }, [user]);
  
  return (
        <Box sx={{ flex: 1, width: '100%' }}>
          <Box
            sx={{
              position: 'sticky',
              top: { sm: -100, md: -110 },
              bgcolor: 'background.body',
              zIndex: 9995,
              spacing: 4,
            }}
          >
            <Typography sx={{...title_style,marginBottom: 5}} variant="h1" color="primary">Mi Perfil</Typography>
          </Box>
          <Divider />
          <Stack
            spacing={4}
            sx={{
              display: 'flex',
              maxWidth: '800px',
              mx: 'auto',
              px: { xs: 2, md: 6 },
              py: { xs: 2, md: 3 },
            }}
          >
            <Card variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ mb: 1}}>
                <Typography level="title-md" variant="h4" sx={title_style}>Preferencias</Typography>
                <Typography level="body-sm" variant="subtitle" color={newTheme.secondary}>Personaliza tus preferencias y opciones.</Typography>
              </Box>
              <Divider />
              <Stack 
                direction="column"
                spacing={3}
                sx={{ display: { xs: 'none', md: 'flex' }, my: 1 , pt: 1}}
              >
                <Typography level="body-md" variant="h4" sx={title_style}>Recordar las busquedas</Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                >
                  <Typography level="body-sm">Elige cómo se comportará tu página principal. Puedes activar o desactivar la opción para que recordemos tus búsquedas de etiquetas y así, mejorar tu experiencia.</Typography>
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                    color="success"
                  />
                </Stack>
              </Stack>
              <Divider />
            </Card>
          </Stack>
        </Box>
    );
}