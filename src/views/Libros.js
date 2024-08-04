import React from 'react';
import { Container } from '@mui/material';
import LibroTable from '../components/LibroTable';

const Libros = () => {
  return (
    <Container>
      <h1>Gestión de Libros</h1>
      <LibroTable />
    </Container>
  );
};

export default Libros;
