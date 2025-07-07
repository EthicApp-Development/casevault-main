import axiosInstance from "../axios.init";

export function getSpotifyToken() {
	return axiosInstance.get("api/v1/spotify/token");
}