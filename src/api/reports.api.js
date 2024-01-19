import axios from "axios";

const URL =
    process.env.NODE_ENV === "production"
        ? import.meta.env.VITE_BACKEND_URL
        : "https://sad.essalud.gob.pe/api";

const authApi = axios.create({
    baseURL: 'https://sad.essalud.gob.pe/api/reports/',
    // baseURL: 'http://10.0.28.15:4000/reports/',
});

// Interceptor para incluir el token en los encabezados de todas las solicitudes
authApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
    if (token) {
        config.headers['x-access-token'] = token;
    }
    // Agregar un parámetro de consulta único
    config.params = {
        timestamp: new Date().getMilliseconds(),
    };
    return config;
});

export const getReports = () => authApi.get("/");
export const createReports = () => authApi.post("/");