import { SET_USER_SIGNUP } from '../actionTypes';

const initialState = {
  userSignup: false,
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_SIGNUP:
      return {
        ...state,
        userSignup: action.payload,
      };
    default:
      return state;
  }
};

export default signupReducer;
