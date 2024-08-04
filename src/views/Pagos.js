// views/Pagos.jsx
import React from 'react';
import { Container } from '@mui/material';
import PagoTable from '../components/PagoTable';

const Pagos = () => {
  return (
    <Container>
      <h1>Pagos</h1>
      <PagoTable />
    </Container>
  );
};

export default Pagos;
