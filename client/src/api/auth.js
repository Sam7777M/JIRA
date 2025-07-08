import api from './axios';

export const login = (data) => api.post('/user/login', data);
export const signup = (data) => api.post('/user/signup', data);
export const onboard = (data) => api.post('/user/onboard', data);
export const getProfile = () => api.get('/user/profile');
