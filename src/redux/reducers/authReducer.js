const initialState = {
  userData: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_DATA_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_USER_DATA_SUCCESS':
      return { ...state, loading: false, userData: action.payload };
    case 'FETCH_USER_DATA_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default authReducer;
