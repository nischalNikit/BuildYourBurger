import React, {Component} from 'react';
import {connect} from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    } 

    sideDrawerToggle = () => {
        let sideDrawerState = this.state.showSideDrawer;
        this.setState({showSideDrawer: !sideDrawerState});
    }

    render(){
        return (
            <Auxiliary>
                <Toolbar 
                    sideDrawerChange = {this.sideDrawerToggle}
                    showLoginButton  = {this.props.isAuthenticated}
                    onLogout         = {this.props.onLogout}
                    user             = {this.props.userEmail}
                />
                <SideDrawer
                    showState        = {this.state.showSideDrawer}
                    sideDrawerClosed = {this.sideDrawerToggle}
                    showLoginButton  = {this.props.isAuthenticated}
                />
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
    )};
} 

const mapStateToProps = state => {
    return {
        isAuthenticated : state.authReducer.userId !== null,
        userEmail       : state.authReducer.userEmail
    }
}

export default connect(mapStateToProps)(Layout);