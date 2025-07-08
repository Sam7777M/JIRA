import api from './axios';

export const getTicketsByProject = (projectId) => api.get(`/tickets/project/${projectId}`);
export const createTicket = (data) => api.post('/tickets', data);
export const getTicket = (id) => api.get(`/tickets/${id}`);
export const addComment = (id, data) => api.post(`/tickets/${id}/comment`, data);
