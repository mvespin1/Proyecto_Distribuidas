import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Edit, Delete, Info } from '@mui/icons-material';
import CreateUserForm from './CreateUserForm';
import UserDetails from './UserDetails';
import { getUsuarios, deleteUsuario, getUsuarioDetails } from '../services/userService';

const UserTable = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    }
  };

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setShowCreateForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUsuario(id);
      fetchUsuarios();
    } catch (error) {
      console.error('Error deleting usuario:', error);
    }
  };

  const handleDetails = async (usuario) => {
    const details = await getUsuarioDetails(usuario.id);
    setSelectedUsuario(details);
    setShowDetails(true);
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
        Crear Usuario
      </Button>
      {showCreateForm && (
        <CreateUserForm
          onClose={() => setShowCreateForm(false)}
          onCreate={fetchUsuarios}
          usuario={selectedUsuario}
        />
      )}
      {showDetails && (
        <UserDetails usuario={selectedUsuario} onClose={() => setShowDetails(false)} />
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Nombre</TableCell>
              <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Apellido</TableCell>
              <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Email</TableCell>
              <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Username</TableCell>
              <TableCell sx={{ backgroundColor: '#10454F', color: '#BDE038' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#ffff' }, '&:nth-of-type(odd)': { backgroundColor: '#ffff' } }}>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.apellido}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.username}</TableCell>
                <TableCell>
                  <Button
                    sx={{ color: '#BDE038', '&:hover': { backgroundColor: '#ffff' } }}
                    onClick={() => handleEdit(usuario)}
                  >
                    <Edit />
                  </Button>
                  <Button
                    sx={{ color: '#BDE038', '&:hover': { backgroundColor: '#ffff' } }}
                    onClick={() => handleDelete(usuario.id)}
                  >
                    <Delete />
                  </Button>
                  <Button
                    sx={{ color: '#BDE038', '&:hover': { backgroundColor: '#ffff' } }}
                    onClick={() => handleDetails(usuario)}
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

export default UserTable;
