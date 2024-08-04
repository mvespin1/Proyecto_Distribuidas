import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Edit, Delete, Info } from '@mui/icons-material';
import CreateLibroForm from './CreateLibroForm';
import LibroDetails from './LibroDetails';
import { getLibros, deleteLibro, updateLibro, getLibroById } from '../services/libroService';

const LibroTable = () => {
  const [libros, setLibros] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedLibro, setSelectedLibro] = useState(null);

  useEffect(() => {
    fetchLibros();
  }, []);

  const fetchLibros = async () => {
    try {
      const data = await getLibros();
      setLibros(data);
    } catch (error) {
      console.error('Error fetching libros:', error);
    }
  };

  const handleEdit = (libro) => {
    setSelectedLibro(libro);
    setShowCreateForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteLibro(id);
      fetchLibros();
    } catch (error) {
      console.error('Error deleting libro:', error);
    }
  };

  const handleDetails = async (libro) => {
    try {
      const details = await getLibroById(libro.id);
      setSelectedLibro(details);
      setShowDetails(true);
    } catch (error) {
      console.error('Error fetching libro details:', error);
    }
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
          Crear Libro
        </Button>
        {showCreateForm && (
            <CreateLibroForm
                onClose={() => setShowCreateForm(false)}
                onCreate={fetchLibros}
                libro={selectedLibro}
            />
        )}
        {showDetails && (
            <LibroDetails libro={selectedLibro} onClose={() => setShowDetails(false)} />
        )}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Título</TableCell>
                <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Autor</TableCell>
                <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>ISBN</TableCell>
                <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Fecha de Publicación</TableCell>
                <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Estado</TableCell>
                <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {libros.map((libro) => (
                  <TableRow key={libro.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#ffff' }, '&:nth-of-type(odd)': { backgroundColor: '#ffff' } }}>
                    <TableCell>{libro.titulo}</TableCell>
                    <TableCell>{libro.autor}</TableCell>
                    <TableCell>{libro.isbn}</TableCell>
                    <TableCell>{libro.fechaPublicacion}</TableCell>
                    <TableCell>{libro.estado}</TableCell>
                    <TableCell>
                      <Button
                          sx={{ color: '#BDE038', '&:hover': { backgroundColor: '#ffff' } }}
                          onClick={() => handleEdit(libro)}
                      >
                        <Edit />
                      </Button>
                      <Button
                          sx={{ color: '#BDE038', '&:hover': { backgroundColor: '#ffff' } }}
                          onClick={() => handleDelete(libro.id)}
                      >
                        <Delete />
                      </Button>
                      <Button
                          sx={{ color: '#BDE038', '&:hover': { backgroundColor: '#ffff' } }}
                          onClick={() => handleDetails(libro)}
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

export default LibroTable;
