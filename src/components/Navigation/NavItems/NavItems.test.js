import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavItems from './NavItems';
import NavItem from './NavItem/NavItem';

configure({adapter : new Adapter()});

describe('<NavItems/>', () => {

    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<NavItems/>);
    });

    it('should have two <NavItem/> if user is not authenticated', () => {
        expect(wrapper.find(NavItem)).toHaveLength(2);
    });

    it('should have three <NavItem /> if user is authenticated', () => {
        wrapper.setProps({showLogin: true});
        expect(wrapper.find(NavItem)).toHaveLength(3);
    });

    it('should have a <NavItem/> with link="/logout" if the user is authenticated', () => {
        wrapper.setProps({showLogin: true});
        expect(wrapper.contains(<NavItem link="/logout">Log Out</NavItem>)).toEqual(true);
    });
});
