import { SET_USER_INFORMATION } from '../actionTypes';

const initialState = {
  userInfo: {},
};

const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFORMATION:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export default userInfoReducer;
