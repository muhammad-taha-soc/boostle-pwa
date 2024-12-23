import { SET_BUSINESS_INFORMATION } from '../actionTypes';

const initialState = {
  businessInfo: {},
};

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BUSINESS_INFORMATION:
      return {
        ...state,
        businessInfo: action.payload,
      };
    default:
      return state;
  }
};

export default businessReducer;
