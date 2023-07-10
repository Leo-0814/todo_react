import axios from 'axios';

const authUrl = 'https://todo-list.alphacamp.io/api/auth';

export async function login({ username, password }) {
  try {
    const res = await axios.post(`${authUrl}/login`, {
      username,
      password,
    });

    const authToken = res.data.authToken;

    if (authToken) {
      return { success: true, ...res.data };
    } else {
      return res.data;
    }
  } catch (error) {
    console.error('[Login Failed]:', error);
  }
}

export const register = async ({ username, email, password }) => {
  try {
    const { data } = await axios.post(`${authUrl}/register`, {
      username,
      email,
      password,
    });

    const { authToken } = data;

    if (authToken) {
      return { success: true, ...data };
    } else {
      return data;
    }
  } catch (error) {
    console.error('[Register Failed]:', error);
  }
};

export const checkPermission = async (authToken) => {
  try {
    const res = await axios.get(`${authUrl}/test-token`, {
      headers: {
        Authorization: 'bearer ' + authToken,
      },
    });
    return res.data.success;
  } catch (error) {
    console.error('[Check Permission Failed]:', error);
  }
};
