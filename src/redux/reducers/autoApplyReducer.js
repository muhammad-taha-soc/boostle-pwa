import { SET_AUTO_APPLY_GRANTS } from '../actionTypes';

const initialState = {
  autoApplyGrants: false,
};

const autoApplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTO_APPLY_GRANTS:
      return {
        ...state,
        autoApplyGrants: action.payload,
      };
    default:
      return state;
  }
};

export default autoApplyReducer;
