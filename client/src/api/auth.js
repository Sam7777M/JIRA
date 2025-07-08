import api from './axios';

export const login = (data) => api.post('/auth/login', data);
export const signup = (data) => api.post('/auth/signup', data);
export const onboard = (data) => api.post('/auth/onboard', data);
export const getProfile = () => api.get('/auth/profile');
