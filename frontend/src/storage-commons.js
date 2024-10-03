const caseVaultToken = "CaseVault/";

export function setInLocalStorage(storageKey , data) {
  let Key = caseVaultToken + storageKey;
  localStorage.setItem(Key, data);
}

export function removeFromLocalStorage(storageKey){
  let Key = caseVaultToken + storageKey;
  localStorage.removeItem(Key);
}

export function getFromLocalStorage(storageKey) {
  let Key = caseVaultToken + storageKey;
  return localStorage.getItem(Key);
}