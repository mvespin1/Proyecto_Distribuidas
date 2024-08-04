import React from 'react';
import { Container } from '@mui/material';
import NotificationTable from '../components/NotificacionTable';

const Notificaciones = () => {
  return (
    <Container>
      <h1>Notificaciones</h1>
      <NotificationTable />
    </Container>
  );
};

export default Notificaciones;
