import React from 'react';
import classes from './Toolbar.css';

import NavItems from '../NavItems/NavItems';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import User from '../../UI/User/User';


const toolbar = (props) => (
    <header className = {classes.Toolbar}>
        <div>
            <DrawerToggle clicked = {props.sideDrawerChange}/>
        </div>
        <div className = {classes.Logo}>
            <Logo />
        </div>
        {
            props.user 
            ? <div className = {classes.User}>
                <User user = {props.user}/>
              </div>
            : null
        }
        <nav className = {classes.DesktopOnly}>
            <NavItems showLogin = {props.showLoginButton} userEmail = {props.userEmail}/>
        </nav>
    </header>
)


export default toolbar;