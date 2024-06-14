import axios from "axios"

let baseUrl = 'http://localhost:3000'
export const url = baseUrl

const instance = axios.create({
    baseURL: url,
    timeout: 120000,
})

instance.interceptors.request.use((config) => {
    const newConfig = { ...config }
    const token = localStorage.getItem("token");
    if (token) {
        newConfig.headers["Authorization"] = `Bearer ${token}`;
    }
    const accountString = localStorage.getItem("account");
    if (accountString) {
        const account = JSON.parse(accountString);
        const accessToken = account.jti;
        const userId = account.id;
        newConfig.headers["Token"] = accessToken;
        newConfig.headers["User-Id"] = userId;
        newConfig.headers["baseurl"] = window.location.origin;
    }
    console.log("NRE CONFIGGG",newConfig.headers)
    return newConfig
})

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Manejo de errores globales (por ejemplo, redireccionar al login si la autenticación falla)
    if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("account");
        localStorage.setItem("authenticated", false);
        window.location.href = '/login'; // Redirigir a la página de login
    }
    return Promise.reject(error);
});

export default instance