import { SET_AUTO_APPLY_GRANTS } from '../actionTypes';

export const setAutoApplyGrants = (info) => ({
  type: SET_AUTO_APPLY_GRANTS,
  payload: info,
});
