import Cookies from 'universal-cookie';
import fetch from 'isomorphic-fetch';
import { CONFIG } from 'globals';

export default class Authentication {

    static isAuthenticated() {
        let cookies = new Cookies();
        let thdsso = cookies.get('THDSSO');

        if (thdsso) {
            return this.checkIsSessionValid()
                .then((response) => {
                    let isValid = response.Valid;
                    return isValid;
                });
        } else {
            this.clearSession();
            return Promise.resolve(false);
        }
    }

    static checkIsSessionValid() {

        return fetch(CONFIG.authUrl + '/isSessionValid', {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.log("isSessionValid error", error);
            });
    }

    static clearSession() {
        let cookies = new Cookies();
        cookies.remove('THDSSO', { 'domain': '.homedepot.com' });
        sessionStorage.removeItem('userProfile');
    }
}
