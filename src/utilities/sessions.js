import { v4 as uuidv4 } from 'uuid';

export const setAccessToken = (newAccessToken) => {
  const currentSessionId = sessionStorage.setItem('access_token', newAccessToken);
  return currentSessionId;
};

export const getAccessToken = () => {
  const currentAccessToken = sessionStorage.getItem('access_token');
  return currentAccessToken;
};

export const getSessionId = () => {
  try {
    const currentSessionId = sessionStorage.getItem('session_id');
    if (!currentSessionId) {
      throw Error();
    }
    return currentSessionId;
  } catch (err) {
    const newSessionId = uuidv4();
    sessionStorage.setItem('session_id', newSessionId);
    return newSessionId;
  }
};
