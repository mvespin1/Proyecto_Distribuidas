import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { getPagos, deletePago, getPagoById, getUsuarioById } from '../services/pagoService';
import CreatePagoForm from './CreatePagoForm';
import PagoDetails from './PagoDetails';

const PagoTable = () => {
  const [pagos, setPagos] = useState([]);
  const [selectedPago, setSelectedPago] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [detailsPago, setDetailsPago] = useState(null);

  const fetchPagos = async () => {
    try {
      const data = await getPagos();
      const pagosWithUsuario = await Promise.all(data.map(async (pago) => {
        const usuario = await getUsuarioById(pago.usuario);
        return { ...pago, usuario };
      }));
      setPagos(pagosWithUsuario);
    } catch (error) {
      console.error('Error fetching pagos:', error);
    }
  };

  useEffect(() => {
    fetchPagos();
  }, []);

  const handleDelete = async (id) => {
    await deletePago(id);
    fetchPagos();
  };

  const handleEdit = (pago) => {
    setSelectedPago(pago);
    setOpenForm(true);
  };

  const handleCreate = () => {
    setSelectedPago(null);
    setOpenForm(true);
  };

  const handleDetails = async (id) => {
    try {
      const pago = await getPagoById(id);
      const usuario = await getUsuarioById(pago.usuario);
      setDetailsPago({ ...pago, usuario });
      setOpenDetails(true);
    } catch (error) {
      console.error('Error fetching pago details:', error);
    }
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    fetchPagos();
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setDetailsPago(null);
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
          Crear Pago
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Monto</TableCell>
                <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Fecha de Pago</TableCell>
                <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Método de Pago</TableCell>
                <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Estado</TableCell>
                <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Usuario</TableCell>
                <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagos.map((pago) => (
                  <TableRow key={pago.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#ffff' }, '&:nth-of-type(odd)': { backgroundColor: '#ffff' } }}>
                    <TableCell>{pago.monto}</TableCell>
                    <TableCell>{new Date(pago.fechaPago).toLocaleDateString()}</TableCell>
                    <TableCell>{pago.metodoPago}</TableCell>
                    <TableCell>{pago.estado}</TableCell>
                    <TableCell>{pago.usuario ? pago.usuario.nombre : 'No disponible'}</TableCell>
                    <TableCell>
                      <IconButton
                          sx={{ color: '#BDE038', '&:hover': { backgroundColor: '#ffff' } }}
                          onClick={() => handleEdit(pago)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                          sx={{ color: '#BDE038', '&:hover': { backgroundColor: '#ffff' } }}
                          onClick={() => handleDelete(pago.id)}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                          sx={{ color: '#BDE038', '&:hover': { backgroundColor: '#ffff' } }}
                          onClick={() => handleDetails(pago.id)}
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
            <CreatePagoForm
                onClose={handleCloseForm}
                onCreate={fetchPagos}
                pago={selectedPago}
            />
        )}
        {openDetails && detailsPago && (
            <PagoDetails
                pago={detailsPago}
                onClose={handleCloseDetails}
            />
        )}
      </div>
  );
};

export default PagoTable;
