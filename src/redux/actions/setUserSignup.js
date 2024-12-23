import { SET_USER_SIGNUP } from '../actionTypes';

export const setUserSignup = (info) => ({
  type: SET_USER_SIGNUP,
  payload: info,
});
