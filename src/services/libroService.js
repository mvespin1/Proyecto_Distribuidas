import axios from 'axios';

const API_URL = 'http://localhost:8005/api/libros';

export const getLibros = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getLibroById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createLibro = async (libro) => {
  const response = await axios.post(API_URL, libro);
  return response.data;
};

export const updateLibro = async (id, libro) => {
  // Fetch existing libro
  const existingLibro = await getLibroById(id);
  
  // Check if ISBN is changing
  if (existingLibro.isbn !== libro.isbn) {
    alert('El ISBN del libro ha sido cambiado.');
  }
  
  // Update libro
  const response = await axios.put(`${API_URL}/${id}`, libro);
  return response.data;
};

export const deleteLibro = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
