import api from './axios';

export const login  = creds => api.post('/auth/login', creds);
export const signup = data  => api.post('/auth/register', data);
export const getMe  = ()    => api.get('/auth/profile');
export const logout=()=>api.post('/auth/logout');
