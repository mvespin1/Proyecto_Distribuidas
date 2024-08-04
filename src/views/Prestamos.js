import React from 'react';
import { Container } from '@mui/material';
import PrestamoTable from '../components/PrestamoTable';

const Prestamos = () => {
  return (
    <Container>
      <h1>Gestión de Préstamos</h1>
      <PrestamoTable />
    </Container>
  );
};

export default Prestamos;
