import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { createPago, updatePago } from '../services/pagoService';
import { getUsuarios } from '../services/userService';

const ESTADOS_PAGO = ['COMPLETADO', 'PENDIENTE', 'FALLIDO'];
const METODOS_PAGO = ['TARJETA_CREDITO', 'TARJETA_DEBITO', 'PAYPAL', 'EFECTIVO'];

const CreatePagoForm = ({ onClose, onCreate, pago }) => {
  const [formValues, setFormValues] = useState({ monto: '', fechaPago: '', metodoPago: '', estado: '', usuario: '' });
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    if (pago) {
      setFormValues({
        monto: pago.monto,
        fechaPago: pago.fechaPago.substring(0, 10), // Formatear fecha
        metodoPago: pago.metodoPago,
        estado: pago.estado,
        usuario: pago.usuario.id
      });
    } else {
      setFormValues({ monto: '', fechaPago: '', metodoPago: '', estado: '', usuario: '' });
    }
    fetchUsuarios();
  }, [pago]);

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
    const payload = { ...restFormValues, usuario: usuarioData.id, fechaCreacion: new Date().toISOString() };

    try {
      if (pago) {
        await updatePago(pago.id, payload);
      } else {
        await createPago(payload);
      }
      onCreate();
      onClose();
    } catch (error) {
      alert(`Error al crear/editar el pago: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
      console.error(error);
    }
  };

  return (
      <Dialog open onClose={onClose}>
        <DialogTitle>{pago ? 'Editar Pago' : 'Crear Pago'}</DialogTitle>
        <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              name="monto"
              label="Monto"
              type="number"
              fullWidth
              value={formValues.monto}
              onChange={handleInputChange}
          />
          <TextField
              margin="dense"
              name="fechaPago"
              label="Fecha de Pago"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formValues.fechaPago}
              onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Método de Pago</InputLabel>
            <Select
                name="metodoPago"
                value={formValues.metodoPago}
                onChange={handleInputChange}
            >
              {METODOS_PAGO.map((metodo) => (
                  <MenuItem key={metodo} value={metodo}>
                    {metodo}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Estado</InputLabel>
            <Select
                name="estado"
                value={formValues.estado}
                onChange={handleInputChange}
            >
              {ESTADOS_PAGO.map((estado) => (
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
            {pago ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default CreatePagoForm;
