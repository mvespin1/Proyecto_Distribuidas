import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { createUsuario, updateUsuario } from '../services/userService';

const CreateUserForm = ({ onClose, onCreate, usuario }) => {
  const [formValues, setFormValues] = useState({ username: '', nombre: '', apellido: '', email: '', password: '' });

  useEffect(() => {
    if (usuario) {
      setFormValues({ username: usuario.username, nombre: usuario.nombre, apellido: usuario.apellido, email: usuario.email, password: '' });
    } else {
      setFormValues({ username: '', nombre: '', apellido: '', email: '', password: '' });
    }
  }, [usuario]);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (usuario) {
      await updateUsuario(usuario.id, formValues);
    } else {
      await createUsuario(formValues);
    }
    onCreate();
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{usuario ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="username"
          label="Username"
          type="text"
          fullWidth
          value={formValues.username}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="nombre"
          label="Nombre"
          type="text"
          fullWidth
          value={formValues.nombre}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="apellido"
          label="Apellido"
          type="text"
          fullWidth
          value={formValues.apellido}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={formValues.email}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          value={formValues.password}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {usuario ? 'Actualizar' : 'Crear'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserForm;
