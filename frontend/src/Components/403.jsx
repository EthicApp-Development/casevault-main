import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const Forbidden = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100vw', position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>¡No tienes permisos para acceder a esta página!</h1>
                <img
                    src="images/403.webp"
                    alt="Imagen Error 403"
                    style={{ width: '300px', height: '200px', objectFit: 'cover' }}
                />
                <Link to="/home">
                    <Button variant="contained" color="primary">Ir a la página principal</Button>
                </Link>
            </Box>
        </div>
    );
}

export default Forbidden;