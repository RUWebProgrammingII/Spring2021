import * as constants from '../../constants';

export const connectSocket = info => ({
    type: constants.CONNECT_SOCKET,
    payload: info
});

export const emitToSocket = (evt, body) => ({
    type: constants.SOCKET_EMISSION,
    payload: { evt, body }
});