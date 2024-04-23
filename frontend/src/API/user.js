import instance from "../instance";

export function getUser(id) {
    return instance.get(`api/v1/users/${id}`);
}