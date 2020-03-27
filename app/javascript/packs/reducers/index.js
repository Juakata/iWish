import { combineReducers } from 'redux';
import session from './session';
import faces from './faces';
import profile from './profile';

const rootReducer = combineReducers({ session, faces, profile });

export default rootReducer;
