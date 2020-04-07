import { combineReducers } from 'redux';
import session from './session';
import faces from './faces';
import profile from './profile';
import functions from './functions';
import requests from './requests';

const rootReducer = combineReducers({
  session, faces, profile, functions, requests,
});

export default rootReducer;
