import instance from "../instance";


export function createCase(data) {
	return instance.post("api/v1/cases", data);
}

export function createCaseVideo(caseId, data){
	return instance.post(`api/v1/cases/${caseId}/videos`, data)
}

export function getCases() {
	return instance.get("api/v1/cases");
}

export function getCase(caseId) {
	return instance.get(`api/v1/cases/${caseId}`);
}

export function getCaseVideos(caseId){
	return instance.get(`api/v1/cases/${caseId}/videos`)
}

export function updateCase(caseId, data) {
	return instance.patch(`api/v1/cases/${caseId}`, data);
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