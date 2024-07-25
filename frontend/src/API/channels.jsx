import instance from "../instance";

export function getPublicChannels(){
	return instance.get('api/v1/channels/public')
}

export function createChannel(params) {
	return instance.post(`api/v1/channels/`,
		params);
}

export function addUsersToChannel(channelId, params){
    return instance.post(`api/v1/channels/${channelId}/add_members`, params)
}

export function getMyChannels(params){
	return instance.get('api/v1/channels/my_channels', {params} )
}

export function getChannel(params){
	return instance.get('api/v1/channels/',{params})
}

export function addCaseToChannel(params){
    return instance.post(`api/v1/channels/add_case`,params)
}

export function deleteCaseFromChannel(channelId, caseId, params) {
	return instance.delete(`/api/v1/channels/${channelId}/remove_case/${caseId}`, {params});
  }

export function removeMember(channelId, userId) {
	return instance.delete('/api/v1/channels/remove_member',{params: {id: channelId, user_id: userId}})
}