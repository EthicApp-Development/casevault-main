const caseVaultToken = "CaseVault/";

export function SetInLocalStorage(storageKey , data) {
  let Key = caseVaultToken + storageKey;
  localStorage.setItem(Key, data);
}

export function RemoveFromLocalStorage(storageKey){
  let Key = caseVaultToken + storageKey;
  localStorage.removeItem(Key);
}

export function GetFromLocalStorage(storageKey) {
  let Key = caseVaultToken + storageKey;
  return localStorage.getItem(Key);
}