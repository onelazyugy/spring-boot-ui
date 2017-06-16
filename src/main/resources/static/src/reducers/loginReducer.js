import { USER_LOGIN, USER_LOGOUT, LOGIN_ERROR } from 'constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';
import Authentication from 'utils/authHelper';

export default function loginReducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case USER_LOGIN:
            newState = objectAssign({}, state);
            newState.userProfile = action.user;
            newState.userProfile.full_name = action.user.first_name + " " + action.user.last_name;
            newState.error = false;
            sessionStorage.setItem('userProfile', btoa(JSON.stringify(newState.userProfile)));
            return newState;
        case USER_LOGOUT:
            newState = objectAssign({}, state);
            newState.userProfile = null;
            newState.error = false;
            Authentication.clearSession();
            return newState;
        case LOGIN_ERROR:
            console.log(action);
            newState = objectAssign({}, state);
            newState.error = true;
            return newState;
        default:
            return state;
    }
}
