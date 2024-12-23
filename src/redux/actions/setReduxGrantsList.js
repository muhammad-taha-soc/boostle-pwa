import { SET_GRANTS_LIST } from '../actionTypes';

export const setReduxGrantsList = (info) => ({
  type: SET_GRANTS_LIST,
  payload: info,
});
