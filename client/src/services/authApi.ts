import API from './axios';

interface LoginCredentials {
  identifier: string;
  password: string;
}

export async function register(data: {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  password: string;
}) {
  return API.post('/auth/register', data).then(res => res.data);
}


export async function loginApi(credentials: LoginCredentials) {
  const response = await API.post("/auth/login", credentials);
  return response.data; 
}

export async function logout() {
  return API.post('/auth/logout').then(res => res.data);
}
