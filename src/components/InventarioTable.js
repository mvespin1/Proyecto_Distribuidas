import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { getInventarios, deleteInventario, getInventarioById, getLibroById } from '../services/inventarioService';
import CreateInventarioForm from './CreateInventarioForm';
import InventarioDetails from './InventarioDetails';

const InventarioTable = () => {
  const [inventarios, setInventarios] = useState([]);
  const [selectedInventario, setSelectedInventario] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [detailsInventario, setDetailsInventario] = useState(null);

  const fetchInventarios = async () => {
    const data = await getInventarios();
    const inventariosWithLibro = await Promise.all(data.map(async (inventario) => {
      const libro = await getLibroById(inventario.libro);
      return { ...inventario, libro };
    }));
    setInventarios(inventariosWithLibro);
  };

  useEffect(() => {
    fetchInventarios();
  }, []);

  const handleDelete = async (id) => {
    await deleteInventario(id);
    fetchInventarios();
  };

  const handleEdit = (inventario) => {
    setSelectedInventario(inventario);
    setOpenForm(true);
  };

  const handleCreate = () => {
    setSelectedInventario(null);
    setOpenForm(true);
  };

  const handleDetails = async (id) => {
    const inventario = await getInventarioById(id);
    const libro = await getLibroById(inventario.libro);
    setDetailsInventario({ ...inventario, libro });
    setOpenDetails(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    fetchInventarios();
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setDetailsInventario(null);
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
          Crear Inventario
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Libro</TableCell>
                <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Cantidad</TableCell>
                <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Ubicación</TableCell>
                <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Última Actualización</TableCell>
                <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventarios.map((inventario) => (
                  <TableRow key={inventario.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#ffff' }, '&:nth-of-type(odd)': { backgroundColor: '#ffff' } }}>
                    <TableCell>{inventario.libro ? inventario.libro.titulo : 'No disponible'}</TableCell>
                    <TableCell>{inventario.cantidad}</TableCell>
                    <TableCell>{inventario.ubicacion}</TableCell>
                    <TableCell>{new Date(inventario.ultimaActualizacion).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton
                          sx={{ color: '#BDE038', '&:hover': { backgroundColor: '#ffff' } }}
                          onClick={() => handleEdit(inventario)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                          sx={{ color: '#BDE038', '&:hover': { backgroundColor: '#ffff' } }}
                          onClick={() => handleDelete(inventario.id)}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                          sx={{ color: '#BDE038', '&:hover': { backgroundColor: '#ffff' } }}
                          onClick={() => handleDetails(inventario.id)}
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
            <CreateInventarioForm
                onClose={handleCloseForm}
                onCreate={fetchInventarios}
                inventario={selectedInventario}
            />
        )}
        {openDetails && detailsInventario && (
            <InventarioDetails
                inventario={detailsInventario}
                onClose={handleCloseDetails}
            />
        )}
      </div>
  );
};

export default InventarioTable;
