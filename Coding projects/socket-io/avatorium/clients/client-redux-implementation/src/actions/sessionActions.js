import * as constants from '../constants';

export const addSession = session => ({
    type: constants.ADD_SESSION,
    payload: session
});