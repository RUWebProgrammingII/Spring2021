import { combineReducers } from 'redux';
import socket from './socketReducer';
import session from './sessionReducer';

export default combineReducers({
    socket,
    session
});