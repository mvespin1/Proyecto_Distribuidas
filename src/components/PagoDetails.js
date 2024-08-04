import React from 'react';
import { Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material';

const PagoDetails = ({ pago, onClose }) => {
    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Detalles del Pago</DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Monto</TableCell>
                                <TableCell>{pago.monto}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Fecha de Pago</TableCell>
                                <TableCell>{pago.fechaPago}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Método de Pago</TableCell>
                                <TableCell>{pago.metodoPago}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Estado</TableCell>
                                <TableCell>{pago.estado}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Usuario</TableCell>
                                <TableCell>{pago.usuario ? pago.usuario.nombre : 'No disponible'}</TableCell>
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

export default PagoDetails;
