import { SET_GRANTS_LIST } from '../actionTypes';

const initialState = {
  grantsList: [],
};

const grantsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GRANTS_LIST:
      return {
        ...state,
        grantsList: action.payload,
      };
    default:
      return state;
  }
};

export default grantsListReducer;
