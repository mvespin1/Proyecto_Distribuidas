import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#10454F' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#ffffff' }}>
          BIBLIOTECA
        </Typography>
        <Button sx={{ color: '#ffffff', '&:hover': { backgroundColor: '#506266' } }} component={Link} to="/usuarios">
          Usuarios
        </Button>
        <Button sx={{ color: '#ffffff', '&:hover': { backgroundColor: '#506266' } }} component={Link} to="/libros">
          Libros
        </Button>
        <Button sx={{ color: '#ffffff', '&:hover': { backgroundColor: '#506266' } }} component={Link} to="/inventarios">
          Inventarios
        </Button>
        <Button sx={{ color: '#ffffff', '&:hover': { backgroundColor: '#506266' } }} component={Link} to="/pagos">
          Pagos
        </Button>
        <Button sx={{ color: '#ffffff', '&:hover': { backgroundColor: '#506266' } }} component={Link} to="/prestamos">
          Prestamos
        </Button>
        <Button sx={{ color: '#ffffff', '&:hover': { backgroundColor: '#506266' } }} component={Link} to="/notificaciones">
          Notificaciones
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
