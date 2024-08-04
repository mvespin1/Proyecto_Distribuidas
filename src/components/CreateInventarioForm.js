import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { createInventario, updateInventario, getLibros } from '../services/inventarioService';

const CreateInventarioForm = ({ onClose, onCreate, inventario }) => {
  const [formValues, setFormValues] = useState({
    libro: '',
    cantidad: 0,
    ubicacion: '',
    ultimaActualizacion: new Date().toISOString().split('T')[0]
  });
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    if (inventario) {
      setFormValues({
        libro: inventario.libro,
        cantidad: inventario.cantidad,
        ubicacion: inventario.ubicacion,
        ultimaActualizacion: inventario.ultimaActualizacion.split('T')[0]
      });
    } else {
      setFormValues({
        libro: '',
        cantidad: 0,
        ubicacion: '',
        ultimaActualizacion: new Date().toISOString().split('T')[0]
      });
    }

    const fetchLibros = async () => {
      const librosData = await getLibros();
      setLibros(librosData);
    };

    fetchLibros();
  }, [inventario]);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (inventario) {
      await updateInventario(inventario.id, formValues);
    } else {
      await createInventario(formValues);
    }
    onCreate();
    onClose();
  };

  return (
      <Dialog open onClose={onClose}>
        <DialogTitle>{inventario ? 'Editar Inventario' : 'Crear Inventario'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="libro-label">Libro</InputLabel>
            <Select
                labelId="libro-label"
                name="libro"
                value={formValues.libro}
                onChange={handleInputChange}
                fullWidth
            >
              {libros.map((libro) => (
                  <MenuItem key={libro.id} value={libro.id}>
                    {libro.titulo} - {libro.autor}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
              margin="dense"
              name="cantidad"
              label="Cantidad"
              type="number"
              fullWidth
              value={formValues.cantidad}
              onChange={handleInputChange}
          />
          <TextField
              margin="dense"
              name="ubicacion"
              label="Ubicación"
              type="text"
              fullWidth
              value={formValues.ubicacion}
              onChange={handleInputChange}
          />
          <TextField
              margin="dense"
              name="ultimaActualizacion"
              label="Última Actualización"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formValues.ultimaActualizacion}
              onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {inventario ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default CreateInventarioForm;
