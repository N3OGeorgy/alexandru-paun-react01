import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://rotterdam-v1.herokuapp.com/api',
});

export const register = async (name, email, password) => {
  try {
    const response = await authApi.post('/register', {
      name,
      email,
      password,
      password_confirmation: password,
    });

    console.log(response);

    return response.data;
  } catch (response) {
    console.log(response);

    return response;
  }
};

export const login = async (email, password) => {
  try {
    const response = await authApi.post('/login', {
      email,
      password,
    });

    return response.data;
  } catch (response) {
    return response;
  }
};

export const logout = async () => {
  try {
    await authApi.post(
      '/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${document.cookie.split('=')[1]}`,
        },
      },
    );

    document.cookie = '';
  } catch (_) {}
};

export const getProfile = async (token) => {
  try {
    const response = await authApi.get('/user', {
      headers: {
        Authorization: `Bearer ${document.cookie.split('=')[1]}`,
      },
    });

    return response.data;
  } catch (_) {}
};

export default authApi;
