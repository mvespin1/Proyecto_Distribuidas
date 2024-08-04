import React from 'react';
import { Container } from '@mui/material';
import InventarioTable from '../components/InventarioTable';

const Inventarios = () => {
    return (
        <Container>
            <h1>Inventarios</h1>
            <InventarioTable />
        </Container>
    );
};

export default Inventarios;
