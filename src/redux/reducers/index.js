import { combineReducers } from 'redux';
import authReducer from './authReducer';
import businessReducer from './businessReducer.js';
import userInfoReducer from './userInfoReducer.js';
import autoApplyReducer from './autoApplyReducer.js';
import grantsListReducer from './grantsListReducer.js';
import applicationsListReducer from './applicationsListReducer.js';
import signupReducer from './signupReducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  business: businessReducer,
  autoApply: autoApplyReducer,
  grants: grantsListReducer,
  applications: applicationsListReducer,
  user: userInfoReducer,
  signup: signupReducer,
});

export default rootReducer;
