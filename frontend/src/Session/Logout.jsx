import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../Contexts/AppContext';
import { MenuItem } from '@mui/material';

const defaultTheme = createTheme();

export default function Logout() {
    const navigate = useNavigate();
    const { setUser } = useContext(AppContext);

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            localStorage.removeItem("account")
            localStorage.setItem("authenticated",false)
            setUser(null)
            navigate('login')
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    };

    return (
        <MenuItem onClick={handleLogout}>
            <Typography>Cerrar sesión</Typography>
        </MenuItem>
    );
}
