import React from 'react';
import { Container } from '@mui/material';
import UserTable from '../components/UserTable';

const Usuarios = () => {
  return (
    <Container>
      <h1>Usuarios</h1>
      <UserTable />
    </Container>
  );
};

export default Usuarios;
