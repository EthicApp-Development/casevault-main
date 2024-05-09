import instance from "../instance";


export function createCase(data) {
	return instance.post("api/v1/cases", data);
}

export function createCaseAudio(caseId, data) {
	return instance.post(`api/v1/cases/${caseId}/audios`, data);
}

export function getCases() {
	return instance.get("api/v1/cases");
}

export function getCase(caseId) {
	return instance.get(`api/v1/cases/${caseId}`);
}

export function getCaseAudios(caseId) {
	return instance.get(`api/v1/cases/${caseId}/audios`);
}

export function updateCase(caseId, data) {
	return instance.patch(`api/v1/cases/${caseId}`, data);
}

export function deleteCaseAudio(caseId, audioId) {
	return instance.delete(`api/v1/cases/${caseId}/audios/${audioId}`);
}