import React, { Component } from 'react';
import axios from '../../../axios-orders';
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import classes from './Orders.css';

import Order from './Order/Order';
import Spinner from '../../UI/Spinner/Spinner';

class Orders extends Component{

    state = {
        orders : [],
        loading: true
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then(response => {
            let fetchedOrders = [];

            for(let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id: key 
                });
            }
            this.setState({orders: fetchedOrders, loading: false});

        })
    }

    render(){
        let Orders = <Spinner />
        
        if(!this.state.loading){
            Orders = this.state.orders.map((order) => {
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

export default WithErrorHandler(Orders,axios);