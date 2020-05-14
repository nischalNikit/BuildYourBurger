import React from 'react';
import classes from './Toolbar.css';

import NavItems from '../NavItems/NavItems';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';


const toolbar = (props) => (
    <header className = {classes.Toolbar}>
        <div>
            <DrawerToggle clicked = {props.sideDrawerChange}/>
        </div>
        <div className = {classes.Logo}>
            <Logo />
        </div>
        <nav className = {classes.DesktopOnly}>
            <NavItems />
        </nav>
    </header>
)


export default toolbar;