import axios from "axios"
import { removeFromLocalStorage, setInLocalStorage, getFromLocalStorage } from './storage-commons'

let baseUrl = import.meta.env.VITE_API_BASE_URL;

export const url = baseUrl

const axiosInstance = axios.create({
    baseURL: url,
    timeout: 120000,
})

axiosInstance.interceptors.request.use((config) => {
    const newConfig = { ...config }
    const token = getFromLocalStorage("token");
    if (token) {
        newConfig.headers["Authorization"] =  token;
    }
    const accountString = getFromLocalStorage("account");
    if (accountString) {
        const account = JSON.parse(accountString);
        const accessToken = account.jti;
        const userId = account.id;
        newConfig.headers["Token"] = accessToken;
        newConfig.headers["User-Id"] = userId;
        newConfig.headers["baseurl"] = window.location.origin;
    }
    return newConfig
})

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Manejo de errores globales (por ejemplo, redireccionar al login si la autenticación falla)
    if (error.response && error.response.status === 401) {
        removeFromLocalStorage('token')
        removeFromLocalStorage("token");
        removeFromLocalStorage("account");
        setInLocalStorage("authenticated", false);
        window.location.href = '/login'; // Redirigir a la página de login
    }
    return Promise.reject(error);
});

export default axiosInstance