import fetch from 'isomorphic-fetch';
import { CONFIG } from 'globals';

import { USER_LOGIN, USER_LOGOUT, LOGIN_ERROR } from 'constants/actionTypes';

export const loginUser = (storeNumber, username, password) => {

    return dispatch => {
        return fetch(CONFIG.authUrl + '/ssoLogin', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                callingProgram: CONFIG.projectInfo.appName,
                j_storenumber: storeNumber,
                j_username: username,
                j_password: password
            })
        })
            .then(response => {
                if (response.ok) {
                    dispatch(getUserProfile(username));
                } else {
                    return dispatch({
                        type: LOGIN_ERROR
                    });
                }
            })
            .catch((error) => {
                console.error("login error", error);
            });
    };
};

export const getUserProfile = (username) => {

    return dispatch => {
        return fetch(CONFIG.authUrl + '/getUserProfile?username=' + username, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((json) => {
                return dispatch({
                    type: USER_LOGIN,
                    user: json
                });
            })
            .catch((error) => {
                console.log("getUserProfile error", error);
            });
    };
};

export const logoutUser = () => {

    return dispatch => {
        dispatch({
            type: USER_LOGOUT
        });
    };
};
