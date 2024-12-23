import { SET_APPLICATIONS_LIST } from '../actionTypes';

export const setReduxApplicationsList = (info) => ({
  type: SET_APPLICATIONS_LIST,
  payload: info,
});
