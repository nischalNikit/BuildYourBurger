import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import classes from './Checkout.css';

import Burger from '../../components/Burger/Burger';
import Button from '../../components/UI/Button/Button';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    }

    componentDidMount(){
        const ingredients = {};
        let price = 0;
        
        const query = new URLSearchParams(this.props.location.search);

        for(let param of query.entries()){
            if(param[0] !== "price"){
                ingredients[param[0]] =+ param[1];
            }
            else{
                price = param[1];
            }
        }

        this.setState({ingredients: ingredients, price: price});
    }

    cancelOrderHandler = () => {
        this.props.history.goBack();
    }

    continueOrderHandler = () => {
        this.props.history.replace(this.props.match.url + "/contact-form");
    }

    render()
    {  
        let burger = null;
        if(this.state.ingredients){
            burger = <Burger ingredients = {this.state.ingredients} />
        }

        return(
            <div className = {classes.Checkout}>
                <h1 className = {classes.CheckoutHeadline}>Here's your burger!</h1>
                {burger}
                <h3 className = {classes.BurgerPrice}>
                    This burger will cost you: <strong>${this.state.price} Only</strong>
                </h3>
                <div className = {classes.BtnGroup}>
                    <Button clicked = {this.cancelOrderHandler} btnType = "Danger">Cancel</Button>
                    <Button clicked = {this.continueOrderHandler} btnType = "Success">Continue</Button>
                </div>
                <Route 
                    path      = {this.props.match.path + "/contact-form"} 
                    render    = {(props) => 
                        <ContactData 
                            ingredients = {this.state.ingredients}
                            price       = {this.state.price}
                            {...props}
                        />
                    }
                />
            </div>
        )
    }
}

export default Checkout;