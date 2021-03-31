import * as constants from '../../constants';
import { setupListeners } from './listeners';
import io from 'socket.io-client';
const socket = io('http://localhost:8080', {
    autoConnect: false
});

const socketMiddleware =
    store => {
        setupListeners(store, socket);
        return next => action => {
            if (action.type === constants.CONNECT_SOCKET) {
                const { sessionID, avatar } = action.payload;
                socket.auth = { sessionID, avatar };
                socket.connect();
            }

            if (action.type === constants.SOCKET_EMISSION) {
                const { evt, body } = action.payload;
                socket.emit(evt, body);
            }

            // Give control to next middleware / reducer
            return next(action);
        }
    }

export default socketMiddleware;