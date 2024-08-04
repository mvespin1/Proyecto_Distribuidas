import axios from 'axios';

const API_BASE_URL = 'http://localhost:8004/api/notificaciones'; // Reemplazar con la URL real de la API

export const getNotificaciones = async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
};

export const createNotificacion = async (notificacion) => {
    const response = await axios.post(`${API_BASE_URL}`, notificacion);
    return response.data;
};

export const updateNotificacion = async (id, notificacion) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, notificacion);
    return response.data;
};

export const deleteNotificacion = async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

export const getNotificacionById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

export const getUsuarioById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8001/api/usuarios/${id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(`Usuario con ID ${id} no encontrado`);
        } else {
            console.error('Error al obtener usuario:', error);
        }
        return null;
    }
};
