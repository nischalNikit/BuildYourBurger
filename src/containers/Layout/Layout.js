import React, {Component} from 'react';
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
                <Toolbar sideDrawerChange = {this.sideDrawerToggle}/>
                <SideDrawer
                    showState        = {this.state.showSideDrawer}
                    sideDrawerClosed = {this.sideDrawerToggle}
                />
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
    )};
}        

export default Layout;