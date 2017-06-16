import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { CONFIG } from 'globals';
import * as LoginActions from './loginActions';
import { LOGIN_ERROR } from 'constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Login Actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    describe('loginUser action', () => {

        it('should dispatch getUserProfile on success api response', () => {
            nock('https:' + CONFIG.authUrl)
                .post('/ssoLogin')
                .reply(200, {});
            const profileNock = nock('https:' + CONFIG.authUrl)
                .get('/getUserProfile?username=user')
                .reply(200, {});
            const store = mockStore();

            return store.dispatch(LoginActions.loginUser('1234', 'user', 'pass')).then(() => {
                expect(profileNock.isDone()).toBeTruthy();
            });
        });

        it('should dispatch LOGIN_ERROR on error api response', () => {
            nock('http:' + CONFIG.authUrl)
                .post('/ssoLogin')
                .reply(500, {});
            const store = mockStore();

            return store.dispatch(LoginActions.loginUser('1234', 'user', 'pass')).then(() => {
                expect(store.getActions()).toEqual([{ type: LOGIN_ERROR }]);
            });
        });
    });
});
