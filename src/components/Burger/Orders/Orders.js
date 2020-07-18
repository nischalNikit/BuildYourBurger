import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from '../../../axios-orders';

import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import classes from './Orders.css';

import Order from './Order/Order';
import Spinner from '../../UI/Spinner/Spinner';
import * as actionCreators from '../../../store/actions/action-index';

class Orders extends Component{

    componentDidMount(){
       this.props.onFetchingOrders();
    }

    render(){
        let Orders = <Spinner />
        
        if(!this.props.loading){
            Orders = this.props.orders.map((order) => {
            return (<Order 
                ingredients = {order.ingredients} 
                key         = {order.id}
                price       = {order.price}
            />
            )});
        }

        return(
            <div className = {classes.Orders}>
                <h1>Your previous orders:</h1>
                {Orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders  : state.orderReducer.orders,
        loading : state.orderReducer.loading,
        userId  : state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchingOrders: () => dispatch(actionCreators.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders,axios));