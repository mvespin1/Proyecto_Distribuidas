import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Edit, Delete, Info } from '@mui/icons-material';
import CreatePrestamoForm from './CreatePrestamoForm';
import PrestamoDetails from './PrestamoDetails';
import { getPrestamos, deletePrestamo, getPrestamoDetails } from '../services/prestamoService';
import { getUsuarios } from '../services/userService'; 
import { getLibros } from '../services/libroService'; 

const PrestamoTable = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [libros, setLibros] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPrestamo, setSelectedPrestamo] = useState(null);

  useEffect(() => {
    fetchPrestamos();
    fetchUsuarios();
    fetchLibros();
  }, []);

  const fetchPrestamos = async () => {
    try {
      const data = await getPrestamos();
      setPrestamos(data);
    } catch (error) {
      console.error('Error fetching prestamos:', error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    }
  };

  const fetchLibros = async () => {
    try {
      const data = await getLibros();
      setLibros(data);
    } catch (error) {
      console.error('Error fetching libros:', error);
    }
  };

  const handleEdit = (prestamo) => {
    setSelectedPrestamo(prestamo);
    setShowCreateForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deletePrestamo(id);
      fetchPrestamos();
    } catch (error) {
      console.error('Error deleting prestamo:', error);
    }
  };

  const handleDetails = async (prestamo) => {
    const details = await getPrestamoDetails(prestamo.id);
    setSelectedPrestamo(details);
    setShowDetails(true);
  };

  const getUsuarioNombre = (id) => {
    const usuario = usuarios.find((u) => u.id === id);
    return usuario ? usuario.nombre : 'Desconocido';
  };

  const getLibroTitulo = (id) => {
    const libro = libros.find((l) => l.id === id);
    return libro ? libro.titulo : 'Desconocido';
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
        onClick={() => setShowCreateForm(true)}
      >
        Crear Préstamo
      </Button>
      {showCreateForm && (
        <CreatePrestamoForm
          onClose={() => setShowCreateForm(false)}
          onCreate={fetchPrestamos}
          prestamo={selectedPrestamo}
        />
      )}
      {showDetails && (
        <PrestamoDetails prestamo={selectedPrestamo} onClose={() => setShowDetails(false)} />
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Usuario</TableCell>
              <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Libro</TableCell>
              <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Fecha de Préstamo</TableCell>
              <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Fecha de Devolución</TableCell>
              <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Estado</TableCell>
              <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prestamos.map((prestamo) => (
              <TableRow key={prestamo.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#ffff' }, '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                <TableCell>{getUsuarioNombre(prestamo.usuario)}</TableCell>
                <TableCell>{getLibroTitulo(prestamo.libro)}</TableCell>
                <TableCell>{new Date(prestamo.fechaPrestamo).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(prestamo.fechaDevolucion).toLocaleDateString()}</TableCell>
                <TableCell>{prestamo.estado}</TableCell>
                <TableCell>
                  <Button
                    sx={{ color: '#BDE038', '&:hover': { backgroundColor: '#f5f5f5' } }}
                    onClick={() => handleEdit(prestamo)}
                  >
                    <Edit />
                  </Button>
                  <Button
                    sx={{ color: '#BDE038', '&:hover': { backgroundColor: '#f5f5f5' } }}
                    onClick={() => handleDelete(prestamo.id)}
                  >
                    <Delete />
                  </Button>
                  <Button
                    sx={{ color: '#BDE038', '&:hover': { backgroundColor: '#f5f5f5' } }}
                    onClick={() => handleDetails(prestamo)}
                  >
                    <Info />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PrestamoTable;
