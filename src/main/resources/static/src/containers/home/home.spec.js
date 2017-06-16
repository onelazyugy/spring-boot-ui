import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'store/configureStore';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Home } from './home';
import Header from 'components/header/header';

describe('<Home />', () => {
    let actions, history, mountedWrapper, store, wrapper;

    beforeAll(() => {
        actions = { logoutUser: () => { } };
        history = createBrowserHistory();
        store = configureStore({
            login: {
                userProfile: {}
            }
        });
        mountedWrapper = mount(<ConnectedRouter history={history}><Home actions={actions} /></ConnectedRouter>, { context: { store } });
        wrapper = shallow(<Home actions={actions} />, { context: { store: store } });
    });

    it('should match its empty snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render <Header/> component', () => {
        expect(wrapper.find(Header)).toHaveLength(1);
    });

    it('should pass store.userProfile to Header userProfile prop', () => {
        let userProfileProp = mountedWrapper.find(Header).prop('userProfile');
        expect(userProfileProp).toEqual({});
    });

    it('should pass logoutUser action to Header logout prop', () => {
        let logoutProp = mountedWrapper.find(Header).prop('logout');
        expect(logoutProp).toEqual(actions.logoutUser);
    });

});
