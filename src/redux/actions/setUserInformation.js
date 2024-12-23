import { SET_USER_INFORMATION } from '../actionTypes';

export const setUserInformation = (info) => ({
  type: SET_USER_INFORMATION,
  payload: info,
});
