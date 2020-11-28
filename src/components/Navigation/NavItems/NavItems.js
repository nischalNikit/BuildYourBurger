import React from 'react';

import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';


const navItems = props => (
    <ul className = {classes.NavItems}>
        <NavItem link="/">
            Main Menu
        </NavItem>
        {
            props.showLogin 
            ? 
            <NavItem link="/orders">
                Order History
            </NavItem>
            : null
        }

        <NavItem link= {props.showLogin ? "/logout" : "/auth"} >
        {
            props.showLogin ? "Log Out" : "Login/Sign Up"
        }
        </NavItem>     
    </ul>
)

export default navItems;
