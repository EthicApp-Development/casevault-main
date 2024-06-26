import instance from "../instance";


export function createCase(data) {
	return instance.post("api/v1/cases", data);
}

export function createCaseAudio(caseId, data) {
	return instance.post(`api/v1/cases/${caseId}/audios`, data);
}

export function createCaseVideo(caseId, data){
	return instance.post(`api/v1/cases/${caseId}/videos`, data)
}

export function getCases() {
	return instance.get("api/v1/cases");
}

export function getCase(caseId, userId) {
	return instance.get(`api/v1/cases/${caseId}`, {
		params: {
			user_id: userId
		}
	});
}

export function searchCases(searchTerm,userId) {
	return instance.get(`api/v1/cases/search`,{
		params: {
			search: searchTerm,
			user_id: userId
		}
	} );
}

export function getCaseAudios(caseId) {
	return instance.get(`api/v1/cases/${caseId}/audios`);
}

export function getCaseVideos(caseId){
	return instance.get(`api/v1/cases/${caseId}/videos`)
}

export function updateCase(caseId, data) {
	return instance.patch(`api/v1/cases/${caseId}`, data);
}

export function deleteCaseAudio(caseId, audioId) {
	return instance.delete(`api/v1/cases/${caseId}/audios/${audioId}`);
}

export function addDocumentToCase(caseId, documentData) {
	return instance.post(`api/v1/cases/${caseId}/documents`, documentData);
}

export function getDocuments(caseId) {
	return instance.get(`/api/v1/cases/${caseId}/documents`);
}

export function deleteDocuments(caseId,id) {
	return instance.delete(`/api/v1/cases/${caseId}/documents/${id}`);
}

export function deleteCaseVideo(caseId, videoId) {
	return instance.delete(`api/v1/cases/${caseId}/videos/${videoId}`)
}

export function addTagToCase(caseId, tagId) {
	return instance.post(`/api/v1/cases/${caseId}/tags/add_tag`, { tag_id: tagId });
}

export function deleteTagFromCase(caseId, tagId) {
return instance.delete(`/api/v1/cases/${caseId}/tags/${tagId}`);
}  

export function createTag(tagName) {
	return instance.post(`/api/v1/tags`, { name: tagName });
}

export function getAllTags() {
	return instance.get(`/api/v1/tags/all_tags`);
}
