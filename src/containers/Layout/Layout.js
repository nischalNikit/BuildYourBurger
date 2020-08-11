import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = React.memo((props) => {

    const isAuthenticated = useSelector((state) => {
        return state.authReducer.userId !== null;
    });
    const userEmail = useSelector((state) => {
        return state.authReducer.userEmail;
    })

    const [showSideDrawer, changeSideDrawerState] = useState(false);

    const sideDrawerToggle = () => {
        changeSideDrawerState((prevSideDrawerState) => !prevSideDrawerState);
    }

    return (
        <Auxiliary>
            <Toolbar 
                sideDrawerChange = {sideDrawerToggle}
                showLoginButton  = {isAuthenticated}
                onLogout         = {props.onLogout}
                user             = {userEmail}
            />
            <SideDrawer
                showState        = {showSideDrawer}
                sideDrawerClosed = {sideDrawerToggle}
                showLoginButton  = {isAuthenticated}
            />
            <main className = {classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
    );
}); 

export default layout;