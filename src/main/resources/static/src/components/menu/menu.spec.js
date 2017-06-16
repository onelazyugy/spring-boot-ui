import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'store/configureStore';
import { Menu } from './menu';

describe('<Menu />', () => {
    let store, wrapper;

    beforeAll(() => {
        store = configureStore();
        wrapper = shallow(<Menu />, { context: { store: store } });
    });

    it('should match its empty snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

});
