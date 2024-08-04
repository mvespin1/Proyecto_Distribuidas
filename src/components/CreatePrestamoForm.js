import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem } from '@mui/material';
import { createPrestamo, updatePrestamo } from '../services/prestamoService';
import { getUsuarios } from '../services/userService'; 
import { getLibros } from '../services/libroService'; 

const CreatePrestamoForm = ({ onClose, onCreate, prestamo }) => {
  const [formValues, setFormValues] = useState({ usuario: '', libro: '', fechaPrestamo: '', fechaDevolucion: '', estado: '' });
  const [usuarios, setUsuarios] = useState([]);
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    if (prestamo) {
      setFormValues({ usuario: prestamo.usuario, libro: prestamo.libro, fechaPrestamo: prestamo.fechaPrestamo, fechaDevolucion: prestamo.fechaDevolucion, estado: prestamo.estado });
    } else {
      setFormValues({ usuario: '', libro: '', fechaPrestamo: '', fechaDevolucion: '', estado: '' });
    }

    fetchUsuarios();
    fetchLibros();
  }, [prestamo]);

  const fetchUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    }
  };

  const fetchLibros = async () => {
    try {
      const data = await getLibros();
      setLibros(data);
    } catch (error) {
      console.error('Error fetching libros:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (prestamo) {
      await updatePrestamo(prestamo.id, formValues);
    } else {
      await createPrestamo(formValues);
    }
    onCreate();
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{prestamo ? 'Editar Préstamo' : 'Crear Préstamo'}</DialogTitle>
      <DialogContent>
        <Select
          label="Usuario"
          name="usuario"
          value={formValues.usuario}
          onChange={handleInputChange}
          fullWidth
        >
          {usuarios.map((usuario) => (
            <MenuItem key={usuario.id} value={usuario.id}>
              {usuario.nombre}
            </MenuItem>
          ))}
        </Select>
        <Select
          label="Libro"
          name="libro"
          value={formValues.libro}
          onChange={handleInputChange}
          fullWidth
        >
          {libros.map((libro) => (
            <MenuItem key={libro.id} value={libro.id}>
              {libro.titulo}
            </MenuItem>
          ))}
        </Select>
        <TextField
          margin="dense"
          name="fechaPrestamo"
          label="Fecha de Préstamo"
          type="date"
          fullWidth
          value={formValues.fechaPrestamo}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          name="fechaDevolucion"
          label="Fecha de Devolución"
          type="date"
          fullWidth
          value={formValues.fechaDevolucion}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
        <Select
          label="Estado"
          name="estado"
          value={formValues.estado}
          onChange={handleInputChange}
          fullWidth
        >
          <MenuItem value="PRESTADO">Prestado</MenuItem>
          <MenuItem value="DEVUELTO">Devuelto</MenuItem>
          <MenuItem value="ATRASADO">Atrasado</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {prestamo ? 'Actualizar' : 'Crear'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePrestamoForm;
