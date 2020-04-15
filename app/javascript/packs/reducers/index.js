import { combineReducers } from 'redux';
import session from './session';
import faces from './faces';
import profile from './profile';
import functions from './functions';
import requests from './requests';
import wishesgivers from './wishesgivers';
import events from './events';

const rootReducer = combineReducers({
  session, faces, profile, functions, requests, wishesgivers, events,
});

export default rootReducer;
