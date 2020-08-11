import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../axios-orders';

import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import classes from './Orders.css';

import Order from './Order/Order';
import Spinner from '../../UI/Spinner/Spinner';
import * as actionCreators from '../../../store/actions/action-index';

const orders = React.memo((props) => {

    const dispatch = useDispatch();
    const onFetchingOrders = () => {
        dispatch(actionCreators.fetchOrders());
    }

    const orders  = useSelector((state) => {
        return state.orderReducer.orders;
    });
    const loading = useSelector((state) => {
        return state.orderReducer.loading;
    });

    useEffect(() => {
        onFetchingOrders();
    }, []);
  
 
    let Orders = <Spinner />
    if(!loading){
        Orders = orders.map((order) => {
        return (
            <Order 
                ingredients = {order.ingredients} 
                key         = {order.id}
                price       = {order.price}
            />)
        });
    }

    return(
        <div className = {classes.Orders}>
            <h1>Your previous orders:</h1>
            {Orders}
        </div>
    )
});


export default WithErrorHandler(orders,axios);