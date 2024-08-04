import React from 'react';
import { Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material';

const InventarioDetails = ({ inventario, onClose }) => {
  return (
      <Dialog open onClose={onClose}>
        <DialogTitle>Detalles del Inventario</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Libro</TableCell>
                  <TableCell>{inventario.libro ? inventario.libro.titulo : 'No disponible'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>{inventario.cantidad}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ubicación</TableCell>
                  <TableCell>{inventario.ubicacion}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Última Actualización</TableCell>
                  <TableCell>{new Date(inventario.ultimaActualizacion).toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </Dialog>
  );
};

export default InventarioDetails;
