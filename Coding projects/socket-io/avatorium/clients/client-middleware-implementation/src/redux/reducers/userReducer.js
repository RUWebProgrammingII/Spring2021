import * as constants from '../../constants';

export default function userReducer(state = [], action) {
    switch (action.type) {
        case constants.USERS: return action.payload;
        case constants.CONNECTED_USER: return [...state, action.payload];
        case constants.DISCONNECTED_USER: return state.filter(u => u.userID !== action.payload);
        default: return state;
    }
}