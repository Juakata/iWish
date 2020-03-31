import { combineReducers } from 'redux';
import session from './session';
import faces from './faces';
import profile from './profile';
import functions from './functions';

const rootReducer = combineReducers({
  session, faces, profile, functions,
});

export default rootReducer;
