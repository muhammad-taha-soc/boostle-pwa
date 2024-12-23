export const fetchUserData = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_USER_DATA_REQUEST' });
    try {
      const response = true;
      // const response = await fetchAuthenticatedUserData();
      // Your API call function
      dispatch({ type: 'FETCH_USER_DATA_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_USER_DATA_FAILURE', error });
    }
  };
};
