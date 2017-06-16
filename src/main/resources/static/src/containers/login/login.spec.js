import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'store/configureStore';
import { Login } from './login';
import Header from 'components/header/header';

import mockLoaderBtn from 'utils/mockLoaderBtn';

describe('<Login />', () => {
    let actions, store, wrapper;

    beforeAll(() => {
        store = configureStore();
        actions = { loginUser: () => { } };
        wrapper = shallow(<Login actions={actions} />, { context: { store } });
        mockLoaderBtn();
    });

    it('should render <Header /> component', () => {
        expect(wrapper.find(Header)).toHaveLength(1);
    });

    it('calls componentDidMount() lifecycle method', () => {
        const spy = jest.spyOn(Login.prototype, 'componentDidMount');
        const mountedWrapper = mount(<Login actions={actions} />, { context: { store } });
        expect(mountedWrapper).toBeDefined();
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
        spy.mockRestore();
    });

    it('should execute loginUser action within login()', () => {
        const spy = jest.spyOn(actions, 'loginUser');
        const mountedWrapper = mount(<Login actions={actions} />, { context: { store } });
        mountedWrapper.instance().login();
        expect(mountedWrapper).toBeDefined();
        expect(actions.loginUser).toHaveBeenCalled();
        spy.mockReset();
        spy.mockRestore();
    });
});
