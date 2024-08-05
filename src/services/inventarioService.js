import axios from 'axios';

const API_URL = 'http://18.216.157.114:8006/api/inventario';
const LIBRO_API_URL = 'http://18.216.157.114:8005/api/libros';

// Obtener todos los inventarios
export const getInventarios = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching inventarios:', error);
    throw error;
  }
};

// Obtener un inventario por ID
export const getInventarioById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching inventario by ID:', error);
    throw error;
  }
};

// Crear un nuevo inventario
export const createInventario = async (inventario) => {
  try {
    const response = await axios.post(API_URL, inventario);
    return response.data;
  } catch (error) {
    console.error('Error creating inventario:', error);
    throw error;
  }
};

// Actualizar un inventario existente
export const updateInventario = async (id, inventario) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, inventario);
    return response.data;
  } catch (error) {
    console.error('Error updating inventario:', error);
    throw error;
  }
};

// Eliminar un inventario
export const deleteInventario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting inventario:', error);
    throw error;
  }
};

// Obtener todos los libros
export const getLibros = async () => {
  try {
    const response = await axios.get(LIBRO_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching libros:', error);
    throw error;
  }
};

// Obtener un libro por ID
export const getLibroById = async (id) => {
  try {
    const response = await axios.get(`${LIBRO_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching libro by ID:', error);
    throw error;
  }
};
