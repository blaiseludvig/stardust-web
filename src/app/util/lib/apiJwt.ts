const jwtKey = 'api-auth-jwt';

export function setJwt(newJwt: string) {
  localStorage.setItem(jwtKey, newJwt);
}

export function getJwt() {
  return localStorage.getItem(jwtKey);
}

export function clearJwt() {
  localStorage.removeItem(jwtKey);
}
