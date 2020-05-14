import React from 'react';

import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';


const navItems = props => (
    <ul className = {classes.NavItems}>
        <NavItem link="/">Main Menu</NavItem>
        <NavItem link="/orders">Order History</NavItem>
    </ul>
)

export default navItems;
