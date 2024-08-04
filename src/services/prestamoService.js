// services/prestamoService.js
import axios from 'axios';

const API_URL = 'http://localhost:8002/api/prestamos';

export const getPrestamos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPrestamoDetails = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPrestamo = async (prestamo) => {
  const response = await axios.post(API_URL, prestamo);
  return response.data;
};

export const updatePrestamo = async (id, prestamo) => {
  const response = await axios.put(`${API_URL}/${id}`, prestamo);
  return response.data;
};

export const deletePrestamo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
