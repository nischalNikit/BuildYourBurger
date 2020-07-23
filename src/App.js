import React, { Component } from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Error from './components/UI/Error404/Error404.js';

import * as actionCreators from './store/actions/action-index';
import asyncComponent from './store/utilities/asyncComponent';

class App extends Component {

  componentDidMount(){
    this.props.onCheckAuth();
  }
  

  render(){

    const asyncAuth = asyncComponent(() => {
      return import('./containers/Auth/Auth');
    });

    const asyncCheckout = asyncComponent(() => {
      return import('./containers/Checkout/Checkout');
    });

    const asyncOrders = asyncComponent(() => {
      return import('./components/Burger/Orders/Orders');
    });

    const asyncLogout = asyncComponent(() => {
      return import('./containers/Auth/Logout/Logout');
    });

    return (
      <div>
        <Layout>
          <Switch>
            {this.props.isAuthenticated ? <Route path = "/checkout" component = {asyncCheckout} /> : null}
            {this.props.isAuthenticated ? <Route path = "/orders"   component = {asyncOrders} />   : null}
            {this.props.isAuthenticated ? <Route path = "/logout"   component = {asyncLogout} />   : null}
            <Route path = "/auth" component = {asyncAuth} />
            <Route path = "/"     component = {BurgerBuilder} exact />
            <Route render = {() => <Error />} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.authReducer.userId !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuth : () => dispatch(actionCreators.checkAuthState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
