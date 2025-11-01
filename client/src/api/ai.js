import api from './axios';

export const analyze   = payload => api.post('/ai/analyze',   payload);
export const explain   = payload => api.post('/ai/explain',   payload);
export const optimize  = payload => api.post('/ai/optimize',  payload);
export const document_ = payload => api.post('/ai/document',  payload);
export const convert   = payload => api.post('/ai/convert',   payload);
export const fixBugs   = payload => api.post('/ai/fix',       payload);
