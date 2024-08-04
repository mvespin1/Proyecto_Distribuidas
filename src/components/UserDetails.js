import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const UserDetails = ({ usuario, onClose }) => (
  <Dialog open onClose={onClose}>
    <DialogTitle>Detalles del Usuario</DialogTitle>
    <DialogContent>
      <p>Nombre: {usuario.nombre}</p>
      <p>Email: {usuario.email}</p>
      <p>Username: {usuario.username}</p>
      <p>Apellido: {usuario.apellido}</p>
      <p>ID: {usuario.id}</p>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cerrar
      </Button>
    </DialogActions>
  </Dialog>
);

export default UserDetails;
