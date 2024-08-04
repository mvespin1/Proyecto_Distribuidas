import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const LibroDetails = ({ libro, onClose }) => (
  <Dialog open onClose={onClose}>
    <DialogTitle>Detalles del Libro</DialogTitle>
    <DialogContent>
      <p>Título: {libro.titulo}</p>
      <p>Autor: {libro.autor}</p>
      <p>ISBN: {libro.isbn}</p>
      <p>Fecha de Publicación: {new Date(libro.fechaPublicacion).toLocaleDateString()}</p>
      <p>Categoría: {libro.categoria}</p>
      <p>Estado: {libro.estado}</p>
      <p>Fecha de Creación: {new Date(libro.fechaCreacion).toLocaleDateString()}</p>
      <p>ID: {libro.id}</p>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cerrar
      </Button>
    </DialogActions>
  </Dialog>
);

export default LibroDetails;
