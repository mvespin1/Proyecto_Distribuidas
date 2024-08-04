import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { createLibro, updateLibro } from '../services/libroService';
import { ESTADOS_LIBRO } from '../constants/constants'; // Asegúrate de importar las constantes

const CreateLibroForm = ({ onClose, onCreate, libro }) => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [fechaPublicacion, setFechaPublicacion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [estado, setEstado] = useState('');
  const [fechaCreacion, setFechaCreacion] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (libro) {
      setTitulo(libro.titulo);
      setAutor(libro.autor);
      setIsbn(libro.isbn);
      setFechaPublicacion(libro.fechaPublicacion);
      setCategoria(libro.categoria);
      setEstado(libro.estado);
      setFechaCreacion(libro.fechaCreacion.split('T')[0]); // Ajusta el formato de fecha si es necesario
    }
  }, [libro]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newLibro = { titulo, autor, isbn, fechaPublicacion, categoria, estado, fechaCreacion };

    if (libro) {
      await updateLibro(libro.id, newLibro);
    } else {
      await createLibro(newLibro);
    }

    onCreate();
    onClose();
  };

  return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
                label="Título"
                fullWidth
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                label="Autor"
                fullWidth
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                label="ISBN"
                fullWidth
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                label="Fecha de Publicación"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={fechaPublicacion}
                onChange={(e) => setFechaPublicacion(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                label="Categoría"
                fullWidth
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  label="Estado"
              >
                {ESTADOS_LIBRO.map((estado) => (
                    <MenuItem key={estado} value={estado}>
                      {estado}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
                label="Fecha de Creación"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={fechaCreacion}
                onChange={(e) => setFechaCreacion(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#10454F',
                  color: '#ffff',
                  '&:hover': { backgroundColor: '#818274' },
                }}
            >
              {libro ? 'Actualizar' : 'Crear'}
            </Button>
            <Button
                onClick={onClose}
                variant="outlined"
                sx={{
                  color: '#BDE038',
                  borderColor: '#BDE038',
                  '&:hover': {
                    backgroundColor: '#ffff',
                    borderColor: '#BDE038',
                  },
                }}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
  );
};

export default CreateLibroForm;
