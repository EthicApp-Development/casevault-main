import instance from "../instance";


export function authLogin(data) {
	return instance.post("users", data);
}