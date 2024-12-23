import { SET_BUSINESS_INFORMATION } from '../actionTypes';

export const setBusinessInformation = (info) => ({
  type: SET_BUSINESS_INFORMATION,
  payload: info,
});
