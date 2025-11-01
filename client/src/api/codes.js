import api from './axios';

export const listCodes = (params) => api.get('/codes', { params });
export const createCode = (data) => api.post('/codes', data);
export const getCodeById = (id) => api.get(`/codes/${id}`); // Make sure this exists
export const updateCode = (id, data) => api.put(`/codes/${id}`, data);
export const deleteCode = (id) => api.delete(`/codes/${id}`);
