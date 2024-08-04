import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { getUsuarios } from '../services/userService'; 
import { getLibros } from '../services/libroService'; 

const PrestamoDetails = ({ prestamo, onClose }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    fetchUsuarios();
    fetchLibros();
  }, []);

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

  const getUsuarioNombre = (id) => {
    const usuario = usuarios.find((u) => u.id === id);
    return usuario ? usuario.nombre : 'Desconocido';
  };

  const getLibroTitulo = (id) => {
    const libro = libros.find((l) => l.id === id);
    return libro ? libro.titulo : 'Desconocido';
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Detalles del Préstamo</DialogTitle>
      <DialogContent>
        <p>Usuario: {getUsuarioNombre(prestamo.usuario)}</p>
        <p>Libro: {getLibroTitulo(prestamo.libro)}</p>
        <p>Fecha de Préstamo: {new Date(prestamo.fechaPrestamo).toLocaleDateString()}</p>
        <p>Fecha de Devolución: {new Date(prestamo.fechaDevolucion).toLocaleDateString()}</p>
        <p>Estado: {prestamo.estado}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrestamoDetails;
