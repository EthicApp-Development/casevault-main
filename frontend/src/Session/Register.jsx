import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {authRegister} from '../API/login';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../Contexts/AppContext';
import { SetInLocalStorage } from '../storage-commons'

const defaultTheme = createTheme();

export default function Register() {
    const navigate = useNavigate();
    const {user, setUser} = useContext(AppContext)

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const data = new FormData(event.currentTarget);
          const params = { 
            "email": data.get("email"), 
            "password": data.get("password"), 
            "first_name": data.get("first_name"), 
            "last_name": data.get("last_name")
          };
      
          const response = await authRegister({ user: params });
          console.log(response)
          if (response.status === 200) {
            const account = {
              id: response.data.data.id,
              email: response.data.data.email,
              jti: response.data.data.jti,
              first_name: response.data.data.first_name,
              last_name: response.data.data.last_name
            };
    
              setUser(account);
              const token = response.headers['authorization'];
              SetInLocalStorage('token', token);
              SetInLocalStorage("account", JSON.stringify(account));
              SetInLocalStorage("authenticated", true);
   
      
              navigate("/home");
          } else {
            console.error("Failed to register:", response.data.status.errors);
          }
        } catch (error) {
          console.error("Error during authentication:", error);
        }
      };
      
      
      

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registrarse
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="first_name"
                            label="Nombre"
                            name="first_name"
                            autoComplete="first name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="last_name"
                            label="Apellido"
                            name="last_name"
                            autoComplete="last name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Registrarme
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"¿Ya tienes una cuenta? Inicia sesión"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
