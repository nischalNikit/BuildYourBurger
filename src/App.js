import React, { Component } from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './components/Burger/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Error from './components/UI/Error404/Error404.js';
import Logout from './containers/Auth/Logout/Logout';

import * as actionCreators from './store/actions/action-index';

class App extends Component {

  componentDidMount(){
    this.props.onCheckAuth();
  }


  render(){

    return (
      <div>
        <Layout>
          <Switch>
            {this.props.isAuthenticated ? <Route path = "/checkout" component = {Checkout} /> : null}
            {this.props.isAuthenticated ? <Route path = "/orders"   component = {Orders} />   : null}
            {this.props.isAuthenticated ? <Route path = "/logout"   component = {Logout} />   : null}
            <Route path = "/auth" component = {Auth} />
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
