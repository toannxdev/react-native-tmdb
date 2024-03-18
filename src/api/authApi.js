import api from './request';

export const createRequestToken = async () => {
  return await api.get('/authentication/token/new');
};

export const validateWithLogin = async (requestToken, username, password) => {
  return await api.post('/authentication/token/validate_with_login', {
    request_token: requestToken,
    username: username,
    password: password,
  });
};

export const createSession = async (requestToken) => {
  return await api.get('/authentication/session/new', {
    params: { request_token: requestToken },
  });
};

export const createGuestSession = async () => {
  return await api.get('/authentication/guest_session/new');
};
