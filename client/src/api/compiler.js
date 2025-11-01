import api from './axios';

export const executeCode = (payload) => api.post('/compile/execute', payload);
export const getSupportedLanguages = () => api.get('/compile/languages');
