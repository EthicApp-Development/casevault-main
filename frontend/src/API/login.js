import axiosInstance from "../axios.init";


export function authRegister(data) {
	return axiosInstance.post("signup", data);
}
export function authLogin(data) {
    return axiosInstance.post("login", data);
}

export function authLogout() {
    return axiosInstance.delete("logout");
}
