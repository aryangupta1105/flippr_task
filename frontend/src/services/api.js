import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const BACKEND_BASE_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';

export const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/450x350?text=Image';
  if (imagePath.startsWith('http')) return imagePath;
  // Ensure imagePath starts with /
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  const fullUrl = `${BACKEND_BASE_URL}${normalizedPath}`;
  console.log('Image URL:', { imagePath, BACKEND_BASE_URL, fullUrl });
  return fullUrl;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Projects
export const getProjects = () => api.get('/projects');
export const getProjectById = (id) => api.get(`/projects/${id}`);
export const createProject = (formData) => api.post('/projects', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateProject = (id, formData) => api.put(`/projects/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Clients
export const getClients = () => api.get('/clients');
export const getClientById = (id) => api.get(`/clients/${id}`);
export const createClient = (formData) => api.post('/clients', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateClient = (id, formData) => api.put(`/clients/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteClient = (id) => api.delete(`/clients/${id}`);

// Contact
export const submitContact = (data) => api.post('/contact', data);
export const getContacts = () => api.get('/contact');
export const deleteContact = (id) => api.delete(`/contact/${id}`);

// Subscribers
export const subscribe = (email) => api.post('/subscribe', { email });
export const getSubscribers = () => api.get('/subscribe');
export const deleteSubscriber = (id) => api.delete(`/subscribe/${id}`);

// Auth
export const adminLogin = (username, password) => api.post('/auth/login', { username, password });

export default api;
