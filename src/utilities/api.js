import axios from 'axios';
import { getDeviceOS } from './helperFunctions';
import { getAccessToken, getSessionId } from './sessions';

const baseURL = process.env.REACT_APP_BASE_URL;

const API = axios.create({
  // baseURL: 'http://boostle-api-dev.eu-west-1.elasticbeanstalk.com/api',
  // baseURL: 'https://api-dev.boostle.io/api',
  baseURL,
});

API.defaults.headers.common.platform = 'WEB';
API.defaults.headers.common.os = getDeviceOS();
API.defaults.headers.common['api-access'] = '';

// API.interceptors.response.use(
//   (response) => {
//     console.log('Interceptor response', response);
//     if (response && response.code === 401) {
//       // const userLoggedin = getSession();
//       // if (isAuthenticated) {
//       // }
//     }
//     if (response && response.data && response.data instanceof Blob) {
//       if (response.code < 200 || response.code > 300) {
//         return {
//           code: response.result,
//           status: 'error',
//           message: response.statusText,
//         };
//       }
//       return response.data;
//     }
//     if (response && response.code === 500) {
//       return {
//         ...response.data,
//         code: response.result,
//       };
//     }
//     if (response && response.data) {
//       return response.data;
//     }
//   },
//   (error) => {
//     redirectOnUnauthorize(error);
//     Promise.reject(error);
//   },
// );

// const redirectOnUnauthorize = (error) => {
//   const userLoggedin = getSession();
//   if (error.response && error.response.status === 401) {
//     logout({ logoutParams: { returnTo: `${window.location.origin}` } });
//   }
// };

// const attachAuthToken = () => {
//   const session = getSession();
//   const sessionId = getSessionId();
//   const apiAccess = getApiAccessKey();
//   API.defaults.headers.common['Content-Type'] = 'application/json';
//   API.defaults.headers.common['Session-Id'] = sessionId;
//   API.defaults.headers.common['api-access'] = apiAccess;
//   API.defaults.headers.common.platform = 'WEB';
//   API.defaults.headers.common.os = getDeviceOS();
//   API.defaults.headers.common.Authorization = `${session && `BEARER ${session.token}`}`;
// };

export const attachAuthToken = () => {
  const apiAccess = '';
  const accessToken = getAccessToken();
  const sessionId = getSessionId();
  API.defaults.headers.common['Content-Type'] = 'application/json';
  API.defaults.headers.common.Authorization = `BEARER ${accessToken}`;
  API.defaults.headers.common['api-access'] = apiAccess;
  API.defaults.headers.common['session_id'] = sessionId;
  API.defaults.headers.common.platform = 'WEB';
  API.defaults.headers.common.os = getDeviceOS();
};

export default API;
