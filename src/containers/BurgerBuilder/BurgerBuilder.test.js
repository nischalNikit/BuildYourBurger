import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';

configure({adapter: new Adapter()});

describe('<BurgerBuilder/>',() => {

    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder 
            setUpIngredients = {() => {}}  
            fetchIngredients = {() => {}}
        />);
    });

    it('should have <BuildControls/> if ingredients as a prop are provided', () => {
        wrapper.setProps({
            ingredients : {
                salad: 0,
                cheese: 0,
                meat: 0,
                bacon: 0
            }
        });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

    it('should have <Burger/> if the ingredients as a prop are provided', () => {
        wrapper.setProps({
            ingredients: {
                salad: 0,
                cheese: 0,
                meat: 0,
                bacon: 0
            }
        });
        expect(wrapper.find(Burger)).toHaveLength(1);
    })
});