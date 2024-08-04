import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { getNotificaciones, deleteNotificacion, getNotificacionById, getUsuarioById } from '../services/notificacionService';
import NotificacionForm from './CreateNotificacionForm';
import NotificacionDetails from './NotificacionDetails';

const NotificacionTable = () => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [selectedNotificacion, setSelectedNotificacion] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [detailsNotificacion, setDetailsNotificacion] = useState(null);

    const fetchNotificaciones = async () => {
        try {
            const data = await getNotificaciones();
            const notificacionesWithUsuario = await Promise.all(data.map(async (notificacion) => {
                const usuario = await getUsuarioById(notificacion.usuario);
                return { ...notificacion, usuario: usuario || { nombre: 'No disponible' } };
            }));
            setNotificaciones(notificacionesWithUsuario);
        } catch (error) {
            console.error('Error fetching notificaciones:', error);
        }
    };

    useEffect(() => {
        fetchNotificaciones();
    }, []);

    const handleDelete = async (id) => {
        await deleteNotificacion(id);
        fetchNotificaciones();
    };

    const handleEdit = (notificacion) => {
        setSelectedNotificacion(notificacion);
        setOpenForm(true);
    };

    const handleCreate = () => {
        setSelectedNotificacion(null);
        setOpenForm(true);
    };

    const handleDetails = async (id) => {
        try {
            const notificacion = await getNotificacionById(id);
            const usuario = await getUsuarioById(notificacion.usuario);
            setDetailsNotificacion({ ...notificacion, usuario });
            setOpenDetails(true);
        } catch (error) {
            console.error('Error fetching notificacion details:', error);
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        fetchNotificaciones();
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
        setDetailsNotificacion(null);
    };

    return (
        <div>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#10454F',
                    color: '#ffff',
                    mb: 2,
                    '&:hover': {
                        backgroundColor: '#818274',
                    },
                }}
                onClick={handleCreate}
            >
                Crear Notificación
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Mensaje</TableCell>
                            <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Fecha de Notificación</TableCell>
                            <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Estado</TableCell>
                            <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Usuario</TableCell>
                            <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notificaciones.map((notificacion) => (
                            <TableRow key={notificacion.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#ffff' }, '&:nth-of-type(odd)': { backgroundColor: '#ffff' } }}>
                                <TableCell>{notificacion.mensaje}</TableCell>
                                <TableCell>{new Date(notificacion.fechaNotificacion).toLocaleDateString()}</TableCell>
                                <TableCell>{notificacion.estado}</TableCell>
                                <TableCell>{notificacion.usuario ? notificacion.usuario.nombre : 'No disponible'}</TableCell>
                                <TableCell>
                                    <IconButton
                                        sx={{ color: '#BDE038', '&:hover': { backgroundColor: '#ffff' } }}
                                        onClick={() => handleEdit(notificacion)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        sx={{ color: '#BDE038', '&:hover': { backgroundColor: '#ffff' } }}
                                        onClick={() => handleDelete(notificacion.id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                    <IconButton
                                        sx={{ color: '#BDE038', '&:hover': { backgroundColor: '#ffff' } }}
                                        onClick={() => handleDetails(notificacion.id)}
                                    >
                                        <Visibility />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openForm && (
                <NotificacionForm
                    onClose={handleCloseForm}
                    onCreate={fetchNotificaciones}
                    notificacion={selectedNotificacion}
                />
            )}
            {openDetails && detailsNotificacion && (
                <NotificacionDetails
                    notificacion={detailsNotificacion}
                    onClose={handleCloseDetails}
                />
            )}
        </div>
    );
};

export default NotificacionTable;
