

export interface CurrentUserType {
  displayName?: string;
  avatar?: string;
  token?: string;
}

let currentUser:(CurrentUserType | undefined) = undefined;

export function getCurrentUser(): CurrentUserType {
  if (currentUser) {
    return currentUser;
  }
  if (localStorage) {
    const savedUserString = localStorage.getItem('python-adminui-currentUser');
    try {
      if (savedUserString) {
        currentUser = JSON.parse(savedUserString) as CurrentUserType;
        return currentUser;
      }
    } catch (e) {}  // if not exist in local storage, fall to default return
  }
  return {
    displayName: '',
    token: undefined
  };
}

export function setCurrentUser(user:CurrentUserType, remember=false): void {
  currentUser = user;
  if (remember) {
    localStorage.setItem('python-adminui-currentUser', JSON.stringify(user));
  }
}

export function clearCurrentUser(): void {
  localStorage.removeItem('python-adminui-currentUser');
  currentUser = undefined
}
