import io from 'socket.io-client';
// socket.connect();
const socket = io('http://localhost:8080', {
    autoConnect: false
});

export default function socketReducer(state = socket, action) {
    return state;
}