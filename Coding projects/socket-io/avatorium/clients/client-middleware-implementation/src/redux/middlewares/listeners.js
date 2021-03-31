import * as constants from '../../constants';

export const setupListeners = (store, socket) => {
    socket.on('session', session => store.dispatch(({
        type: constants.ADD_SESSION,
        payload: session
    })));

    socket.on('users', users => store.dispatch(({
        type: constants.USERS,
        payload: users
    })));

    socket.on('connected_user', user => store.dispatch(({
        type: constants.CONNECTED_USER,
        payload: user
    })));

    socket.on('disconnected_user', userID => store.dispatch(({
        type: constants.DISCONNECTED_USER,
        payload: userID
    })));
};