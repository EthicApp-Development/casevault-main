import axiosInstance from "../axios.init";

export function getPublicChannels(){
	return axiosInstance.get('api/v1/channels/public')
}

export function createChannel(params) {
	return axiosInstance.post(`api/v1/channels/`,
		params);
}

export function addUsersToChannel(channelId, params){
    return axiosInstance.post(`api/v1/channels/${channelId}/add_members`, params)
}

export function getMyChannels(params){
	return axiosInstance.get('api/v1/channels/my_channels', {params} )
}

export function getChannel(params){
	return axiosInstance.get('api/v1/channels/',{params})
}

export function addCaseToChannel(params){
    return axiosInstance.post(`api/v1/channels/add_case`,params)
}

export function deleteCaseFromChannel(channelId, caseId, params) {
	return axiosInstance.delete(`/api/v1/channels/${channelId}/remove_case/${caseId}`, {params});
  }

export function removeMember(channelId, userId) {
	return axiosInstance.delete('/api/v1/channels/remove_member',{params: {id: channelId, user_id: userId}})
}