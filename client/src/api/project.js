import api from './axios';

export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data);
export const getProject = (id) => api.get(`/projects/${id}`);
export const addMember = (id, data) => api.post(`/projects/${id}/add-member`, data);
