import axiosInstance from "../axios.init";

export function getUser(id) {
    return axiosInstance.get(`api/v1/users/${id}`);
}

export function getAllUsers(){
    return axiosInstance.get('api/v1/users')
}

export function patchUser(userId, data){
    return axiosInstance.patch(`/api/v1/users/${userId}`,{ user: data });
}