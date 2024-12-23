import API from './api';
import { attachAuthToken } from './api';

export const verifyAuth = async (payload) => {
  attachAuthToken();
  try {
    const response = await API.post(`/auth/access/verify`, payload);
    return response.data;
  } catch (error) {
    console.error(error.response);
    return error.response;
  }
};

export const createUser = async (payload) => {
  attachAuthToken();
  try {
    const response = await API.post(`/user/create`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const updateUserFirstUse = async (payload) => {
  attachAuthToken();
  try {
    const response = await API.post(`/user/update`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const findBusiness = async (payload) => {
  try {
    const response = await API.post(`/business/search`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const updateBusiness = async (payload) => {
  attachAuthToken();
  try {
    const response = await API.post(`/business/update`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getBusinessInformation = async (payload) => {
  try {
    const response = await API.post(`/business/profile`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const addExternalGrant = async (payload) => {
  attachAuthToken();
  try {
    const response = await API.post(`/grant/link/add`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getGrantPreviewResults = async (payload) => {
  try {
    const response = await API.post(`/grant/preview`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllGrantResults = async (payload) => {
  attachAuthToken();
  try {
    const response = await API.post(`/grant/search`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const addNotInterestedGrants = async (payload) => {
  attachAuthToken();
  try {
    const response = await API.post(`/grant/reject`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getSubscriptionStatus = async () => {
  attachAuthToken();
  try {
    const response = await API.post(`/subscription/get`, {}); // Empty payload 
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getAllApplicationResults = async (payload) => {
  attachAuthToken();
  try {
    const response = await API.post(`/application/details`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAllApplications = async (payload) => {
  attachAuthToken();
  try {
    const response = await API.post(`/application/get`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const initializeApplication = async (payload) => {
  attachAuthToken();
  try {
    const response = await API.post(`/application/initiate`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getApplicationDetails = async (payload) => {
  attachAuthToken();
  try {
    const response = await API.post(`/application/details`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const applyForGrant = async (payload) => {
  attachAuthToken();
  try {
    const response = await API.post(`/application/apply`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const applicationUpdateResponses = async (payload) => {
  attachAuthToken();
  try {
    const response = await API.post(`/application/update/responses`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const submitApplication = async (payload) => {
  attachAuthToken();
  try {
    const response = await API.post(`/application/submit`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (payload) => {
  attachAuthToken();
  try {
    const response = await API.post(`/user/update`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAllNotifications = async (payload) => {
  attachAuthToken();
  try {
    const response = await API.post(`/notification/get`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const refreshBalance = async () => {
  const payload = {
    profile: {},
  };
  const response = await updateBusiness(payload);
  console.log('credit response', response);
  return response.result.balance;
};
