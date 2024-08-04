import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { createNotificacion, updateNotificacion } from '../services/notificacionService';
import { getUsuarios } from '../services/userService';

const ESTADOS_NOTIFICACION = ['ENVIADO', 'PENDIENTE', 'FALLIDO'];

const CreateNotificacionForm = ({ onClose, onCreate, notificacion }) => {
    const [formValues, setFormValues] = useState({ mensaje: '', fechaNotificacion: '', estado: '', usuario: '' });
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        if (notificacion) {
            setFormValues({
                mensaje: notificacion.mensaje,
                fechaNotificacion: notificacion.fechaNotificacion.substring(0, 10),
                estado: notificacion.estado,
                usuario: notificacion.usuario.id
            });
        } else {
            setFormValues({ mensaje: '', fechaNotificacion: '', estado: '', usuario: '' });
        }
        fetchUsuarios();
    }, [notificacion]);

    const fetchUsuarios = async () => {
        try {
            const data = await getUsuarios();
            setUsuarios(data);
        } catch (error) {
            console.error('Error fetching usuarios:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const { usuario, ...restFormValues } = formValues;
        const usuarioData = usuarios.find((u) => u.id === usuario);
        const payload = { ...restFormValues, usuario: usuarioData.id, fechaNotificacion: new Date().toISOString() };

        try {
            if (notificacion) {
                await updateNotificacion(notificacion.id, payload);
            } else {
                await createNotificacion(payload);
            }
            onCreate();
            onClose();
        } catch (error) {
            alert(`Error al crear/editar la notificación: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
            console.error(error);
        }
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>{notificacion ? 'Editar Notificación' : 'Crear Notificación'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="mensaje"
                    label="Mensaje"
                    fullWidth
                    value={formValues.mensaje}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="fechaNotificacion"
                    label="Fecha de Notificación"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formValues.fechaNotificacion}
                    onChange={handleInputChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Estado</InputLabel>
                    <Select
                        name="estado"
                        value={formValues.estado}
                        onChange={handleInputChange}
                    >
                        {ESTADOS_NOTIFICACION.map((estado) => (
                            <MenuItem key={estado} value={estado}>
                                {estado}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Usuario</InputLabel>
                    <Select
                        name="usuario"
                        value={formValues.usuario}
                        onChange={handleInputChange}
                    >
                        {usuarios.map((usuario) => (
                            <MenuItem key={usuario.id} value={usuario.id}>
                                {usuario.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {notificacion ? 'Actualizar' : 'Crear'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateNotificacionForm;
