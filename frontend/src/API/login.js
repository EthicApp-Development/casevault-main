import instance from "../instance";


export function authRegister(data) {
	return instance.post("signup", data);
}
export function authLogin(data) {
    return instance.post("login", data);
}

export function authLogout() {
    return instance.delete("logout");
}
