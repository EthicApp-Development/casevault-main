import React, { useState } from 'react';
import { redirect } from 'react-router-dom';
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
import { authLogin } from '../API/login';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../Contexts/AppContext';
import { setInLocalStorage } from '../storage-commons'

const defaultTheme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(AppContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = new FormData(event.currentTarget);
            const params = { email: data.get('email'), password: data.get('password') };
            const response = await authLogin({ user: params });
            
            const account = {
                id: response.data.data.id,
                email: response.data.data.email,
                jti: response.data.data.jti,
                first_name: response.data.data.first_name,
                last_name: response.data.data.last_name,
                track_tag_searches: response.data.data.track_tag_searches
            };
            console.log(response)
            setUser(account);
            const token = response.headers['authorization'];
            setInLocalStorage('token', token);
            setInLocalStorage('account', JSON.stringify(account));
            setInLocalStorage('authenticated', true);
            navigate('/home');
        } catch (error) {
            console.error('Error during authentication:', error);
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
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar
                            src="/images/default_case_img.png"
                            sx={{ m: 1, width: 140, height: 140, borderRadius: 0 }}
                        />
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo electrónico"
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
                            label="Recordarme"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Iniciar sesión
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                ¿Olvidaste tu contraseña?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"¿No tienes una cuenta? Regístrate"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
