import { combineReducers } from 'redux';
import session from './sessionReducer';
import users from './userReducer';

export default combineReducers({
    session,
    users
});