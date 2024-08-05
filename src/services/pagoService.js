import axios from 'axios';

const API_URL = 'http://18.216.157.114:8003/api/pagos';
const USUARIO_API_URL = 'http://18.216.157.114:8001/api/usuarios';

// Obtener todos los pagos
export const getPagos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching pagos:', error);
    throw error;
  }
};

// Obtener un pago por ID
export const getPagoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pago by ID:', error);
    throw error;
  }
};

// Crear un nuevo pago
export const createPago = async (pago) => {
  try {
    const response = await axios.post(API_URL, pago);
    return response.data;
  } catch (error) {
    console.error('Error creating pago:', error);
    throw error;
  }
};

// Actualizar un pago existente
export const updatePago = async (id, pago) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, pago);
    return response.data;
  } catch (error) {
    console.error('Error updating pago:', error);
    throw error;
  }
};

// Eliminar un pago
export const deletePago = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting pago:', error);
    throw error;
  }
};

// Obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await axios.get(USUARIO_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching usuarios:', error);
    throw error;
  }
};

// Obtener un usuario por ID
export const getUsuarioById = async (id) => {
  try {
    const response = await axios.get(`${USUARIO_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching usuario by ID:', error);
    throw error;
  }
};
