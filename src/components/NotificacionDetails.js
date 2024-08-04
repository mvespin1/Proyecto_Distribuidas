import React from 'react';
import { Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material';

const NotificacionDetails = ({ notificacion, onClose }) => {
    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Detalles de la Notificación</DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Mensaje</TableCell>
                                <TableCell>{notificacion.mensaje}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Fecha de Notificación</TableCell>
                                <TableCell>{notificacion.fechaNotificacion}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Estado</TableCell>
                                <TableCell>{notificacion.estado}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Usuario</TableCell>
                                <TableCell>{notificacion.usuario.nombre}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button onClick={onClose} color="primary">Cerrar</Button>
            </DialogContent>
        </Dialog>
    );
};

export default NotificacionDetails;
