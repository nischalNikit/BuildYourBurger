import React, { useEffect, Suspense } from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Error from './components/UI/Error404/Error404.js';
import Spinner from './components/UI/Spinner/Spinner';

import * as actionCreators from './store/actions/action-index';


const asyncAuth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const asyncCheckout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = React.lazy(() => {
  return import('./components/Burger/Orders/Orders');
});

const asyncLogout = React.lazy(() => {
  return import('./containers/Auth/Logout/Logout');
});

const asyncContactData = React.lazy(() => {
  return import('./containers/Checkout/ContactData/ContactData');
})

const app = React.memo((props) => {

  useEffect(() => {
    props.onCheckAuth();
  }, []);

  return (
    <div style = {{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Layout>
        <Suspense fallback = {<Spinner />}>
          <Switch>
            {props.isAuthenticated ? <Route path = "/checkout" component = {asyncCheckout}/> : null}
            {props.isAuthenticated ? <Route path = "/orders" component = {asyncOrders} /> : null}
            {props.isAuthenticated ? <Route path = "/logout" component = {asyncLogout} /> : null}
            {
              props.isAuthenticated 
              ? <Route path = "/contact-form" component = {asyncContactData} /> 
              : null
            }
            <Route path = "/auth" component = {asyncAuth} />
            <Route path = "/"     component = {BurgerBuilder} exact />
            <Route render = {() => <Error />} />
          </Switch>
        </Suspense>
      </Layout>
    </div>
    );
});

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
