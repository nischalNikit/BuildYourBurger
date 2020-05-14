import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './components/Burger/Orders/Orders';
import Error from './components/UI/Error404/Error404.js';

class App extends Component {
  render() {
    return (
    <div>
      <Layout>
        <Switch>
          <Route path = "/" exact component = {BurgerBuilder} />
          <Route path = "/checkout" component = {Checkout} />
          <Route path = "/orders" component = {Orders} />
          <Route render = {() => <Error />} />
        </Switch>
      </Layout>
    </div>
    );
  }
}

export default App;
