import axios from "axios";

const URL =
    process.env.NODE_ENV === "production"
        ? import.meta.env.VITE_BACKEND_URL
        : "http://localhost:8000";

const authApi = axios.create({
    baseURL: 'https://sad.essalud.gob.pe/api/user/',
    // baseURL: 'http://10.0.28.15:4000/user/',
});

// Interceptor para incluir el token en los encabezados de todas las solicitudes
authApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
    if (token) {
        config.headers['x-access-token'] = token;
    }
    // Agregar un parámetro de consulta único
    return config;
});

export const getUsers = () => authApi.get("");
export const getUser = (userId) => authApi.get(`/${userId}/`);
export const createUser = (user) => authApi.post("", user);
export const addGroup = (userId,groupId) => authApi.post(`/${userId}/group/${groupId}`);
export const removeGroup = (userId,groupId) => authApi.delete(`/${userId}/group/${groupId}`);
export const addReport = (userId,reportId) => authApi.post(`/${userId}/report/${reportId}`);
export const removeReport = (userId,reportId) => authApi.delete(`/${userId}/report/${reportId}`);
export const addAllPermissions = (userId) => authApi.post(`/${userId}/addAll`);